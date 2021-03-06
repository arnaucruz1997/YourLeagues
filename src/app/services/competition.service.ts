import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { observeOutsideAngular } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { documentId, DocumentReference, FieldValue} from '@angular/fire/firestore';
import { FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import firebase from 'firebase/compat/app';
import { combineLatest, Observable, of, take } from 'rxjs';
import { generateSchedule } from 'sports-schedule-generator';
import { Classificacio, ClassificacioPunts, ClassificacioSets } from '../models/classificacio';
import { Competicio } from '../models/competicio';
import { Equip } from '../models/equip';
import { EstadisticaBasquet, EstadisticaGoal } from '../models/estadistica';
import { Evento } from '../models/event';
import { Part } from '../models/part';
import { Partit } from '../models/partit';
import { Resultat } from '../models/resultat';
import { Xat } from '../models/xat';
import { AuthService } from './auth.service';
import { TeamService } from './team.service';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  userCollectionCompeticio!: AngularFirestoreCollection<Competicio>;
  userCollectionClassificacioPunts!: AngularFirestoreCollection<ClassificacioPunts>;
  userCollectionClassificacioSets!: AngularFirestoreCollection<ClassificacioSets>;
  userCollectionEstadisticaGoals!: AngularFirestoreCollection<EstadisticaGoal>;
  userCollectionEstadisticaBasquet!: AngularFirestoreCollection<EstadisticaBasquet>;
  partitsCollectionPartits!: AngularFirestoreCollection<Partit>;
  xatsCollection!: AngularFirestoreCollection<Xat>;
  resultatCollection!: AngularFirestoreCollection<Resultat>;

  constructor(
    public authService:AuthService,
    public afs: AngularFirestore,
    public router: Router,
    public uploadService: UploadService,
    public storage: AngularFireStorage,
    public datepipe: DatePipe,
    public teamService:TeamService,
  ) {
    this.userCollectionCompeticio = this.afs.collection<Competicio>('competicions');
    this.userCollectionClassificacioPunts = this.afs.collection<ClassificacioPunts>('classificacions');
    this.userCollectionClassificacioSets = this.afs.collection<ClassificacioSets>('classificacions');
    this.userCollectionEstadisticaGoals = this.afs.collection<EstadisticaGoal>('estadistica');
    this.userCollectionEstadisticaBasquet = this.afs.collection<EstadisticaBasquet>('estadistica');
    this.partitsCollectionPartits = this.afs.collection<Partit>('partits');
    this.xatsCollection = this.afs.collection<Xat>('xats');
    this.resultatCollection = this.afs.collection<Resultat>('resultats');
   }

  createCompetition(usuari:any, file:any, competition:any, nomOrg:string){
    let downloadURL = "https://firebasestorage.googleapis.com/v0/b/yourleagues-46263.appspot.com/o/SeekPng.com_espn-logo-png_289657.png?alt=media&token=54e4712a-ff32-4007-a4c1-1472b5e16754"
    const id = this.afs.createId();
    if(file!=null){
      let currentDateTime = this.datepipe.transform((new Date), 'MM_dd_yyyy_h_mm_ss');
      let uploadurl = (currentDateTime+"_"+id);

      this.storage.upload(uploadurl,file).then(rst => {
        rst.ref.getDownloadURL().then(url => {
          downloadURL = url;
          const compInfo:Competicio = {
            id: id,
            organitzador: this.authService.UserId,
            nom: competition.get('nom').value,
            privacitat: competition.get('privacitat').value,
            email: usuari.orgEmail,
            numEquips: competition.get('numEquips').value,
            tipusSport: competition.get('esport').value,
            tipusCompeticio: competition.get('competicio').value,
            img: downloadURL,
            solicituds:[],
            equips:[],
            nomOrganitzacio: nomOrg,
            estatCompeticio:"oberta",
            numVoltes: competition.get('numVoltes').value,
          }
          this.userCollectionCompeticio.doc(id).set(compInfo).catch((error) => {
            window.alert(error.message);
          });
          this.updateOrgCompetitions(this.authService.UserId, id);
          this.router.navigate([''])
        });
      });
    }
  }
  updateOrgCompetitions(id: string, value: string) {
    let user = this.afs.collection('usuaris').doc(id);
    user.update({
      'competicions': firebase.firestore.FieldValue.arrayUnion(value)
    })
  }
  getOrgCompetitions(competitionId:any[]): Observable<any>{
    if( competitionId.length == 0){
      return of();
    }else{
      return this.afs.collection('competicions', ref => ref.where(documentId(), "in", competitionId)).valueChanges();
    }
  }
  getAllCompetitions(): Observable<any>{
    return this.afs.collection('competicions').valueChanges();
  }
  getAllTeamsFromCompetition(listIds:string[]):Observable<any>{
    if(listIds.length == 0){
      return of();
    }else{
      return this.afs.collection('equips', ref => ref.where(documentId(), "in", listIds)).valueChanges();
    }

  }
  getCompetitionById(id: string):Observable<any>{
    return this.afs.collection('competicions', ref => ref.where(documentId(), "==", id)).valueChanges();
  }
  getCompDependingOnTeams(ids:string[]):Observable<any>{
    if(ids.length == 0){
      return of();
    }else{
      console.log(ids);
      return this.afs.collection('competicions', ref => ref.where('equips', 'array-contains-any', ids)).valueChanges();
    }
  }
  getPartitsDependingOnTeamsLocal(ids:string[]):Observable<any>{
    if(ids.length == 0){
      return of();
    }else{
      const q1 = this.afs.collection('partits', ref => ref.where('equipLocal', 'in', ids)).valueChanges();
      const q2 = this.afs.collection('partits', ref => ref.where('equipVisitant', 'in', ids)).valueChanges()
      const qfinal = combineLatest(q1,q2);
      return qfinal;
    }
   
  }
  getPartitsDependingOnTeamsVis(ids:string[]):Observable<any>{
    if(ids.length == 0){
      return of();
    }else{
      return this.afs.collection('partits', ref => ref.where('equipLocal', 'in', ids)).valueChanges();
    }
   
  }
  enviarSolicitud(idEquip: string, idComp: string) {
    let user = this.afs.collection('competicions').doc(idComp);
    user.update({
      'solicituds': firebase.firestore.FieldValue.arrayUnion(idEquip)
    })
  }
  addTeamToCompetition(idEquip:string,idComp:string){
    let user = this.afs.collection('competicions').doc(idComp);
    user.update({
      'equips': firebase.firestore.FieldValue.arrayUnion(idEquip)
    })
  }
  addCompetitionToTeam(idEquip:string,idComp:string){
    let user = this.afs.collection('equips').doc(idEquip);
    user.update({
      'competicions': firebase.firestore.FieldValue.arrayUnion(idComp)
    })
  }
  deleteSolicitud(idEquip:string,idComp:string){
    let user = this.afs.collection('competicions').doc(idComp);
    user.update({
      'solicituds': firebase.firestore.FieldValue.arrayRemove(idEquip)
    })
  }

  createClassificacio(idEquip:string, idComp:string, esport:string , imgEquip:string, nomEquip:string){
    let id = this.afs.createId();
    const classificacioInfo:ClassificacioPunts = {
      id: id,
      competicioID: idComp,
      equipId: idEquip,
      equipImg: imgEquip,
      equipNom: nomEquip,
      partitsJugats: 0,
      partitsGuanyats: 0,
      partitsPerduts: 0,
      puntuacio: 0,
      partitsEmpatats: 0,
      golsAFavor: 0,
      golsEnContra:0,
    }
    this.userCollectionClassificacioPunts.doc(id).set(classificacioInfo).catch((error) => {
      window.alert(error.message);
    });
  }

  getClassificacio(id: string):Observable<any>{
    return this.afs.collection('classificacions', ref => ref.where('competicioID', "==", id)).valueChanges();
  }

  createEstadistiques(equipId:string, equipNom:string, jugadorId:string, compId:string, esport:string){
    let id = this.afs.createId();
    if(esport == "Futbol 11" || esport == "Futbol 7" || esport == "Futbol Sala"||  esport == "Handbol"){
      const estadisticaInfo:EstadisticaGoal= {
        id: id,
        competicioID: compId,
        equipId: equipId,
        equipNom: equipNom,
        jugadorId: jugadorId,
        gols: 0,
        partitsJugats: 0,
        targetesGrogues: 0,
        targetesVermelles: 0,
      }
      this.userCollectionEstadisticaGoals.doc(id).set(estadisticaInfo).catch((error) => {
        window.alert(error.message);
      });
    }
  }
  getEstadistiques(id: string):Observable<any>{
    return this.afs.collection('estadistica', ref => ref.where('competicioID', "==", id)).valueChanges();
  }

  createPartits(equips:any[],compId:string, orgId:string, tipusSport:string, tipusVolta:number){
    let schedule:any = [];
    if(tipusVolta == 1){
      schedule = generateSchedule(equips);
    }else{
      schedule = generateSchedule(equips,true);
    }

    let i = 0;
    for(let jornada of schedule){
      i++;
      console.log("jornada: ",i);
      for(let partit of jornada){
        //Creaci?? partits
        let id = this.afs.createId();
        const partitInfo:Partit= {
          id: id,
          competicioID: compId,
          jornada: i,
          equipLocal: partit['home'],
          equipVisitant: partit['away'],
          lloc: '',
          horari: null,
          infoLocal:null,
          infoVis:null,
          resultat:null,
        }
        this.partitsCollectionPartits.doc(id).set(partitInfo).catch((error) => {
          window.alert(error.message);
        });

        //Creaci?? Xats
        let id2 = this.afs.createId();
        this.teamService.getTeamById(partit['home']).subscribe(
          data=>{
            let capitaLoc = data[0].capita;
            this.teamService.getTeamById(partit['away']).subscribe(
              data2=>{
                let capitaVis = data2[0].capita;
                const xatInfo:Xat={
                  id: id2,
                  organitzadorID: orgId,
                  partitID: id,
                  capLocalId: capitaLoc,
                  capVisId: capitaVis,
                  missatges: [],
                }
                this.xatsCollection.doc(id2).set(xatInfo).catch((error) => {
                  window.alert(error.message);
                });
              }
            )
          }
        );

        //Creaci?? Resultat
        let id3 = this.afs.createId();
        const part:Part = {
          puntsEquipLocal: 0,
          puntsEquipVis: 0,
        }
        let partList:any = []
        if(tipusSport == 'Tennis' || tipusSport == 'Padel' ){
          partList=[part,part,part];
        }else if(tipusSport == 'Volley'){
          partList=[part,part,part,part,part];
        }else{
          partList=[part,part,part,part];
        }

        
        const resultatInfo:Resultat = {
          id: id3,
          partitID: id,
          jugat:false,
          guanyador: '',
          puntsEquipLocal: 0,
          puntsEquipVis: 0,
          events: [],
          parts: partList,
        }
        this.resultatCollection.doc(id3).set(resultatInfo).catch((error) => {
          window.alert(error.message);
        });

      }
    }
    this.userCollectionCompeticio.doc(compId).update({estatCompeticio:'tancada'}).catch((error)=>{
      window.alert(error.message);
    });
  }

  getPartits(id: string):Observable<any>{
    return this.afs.collection('partits', ref => ref.where('competicioID', "==", id)).valueChanges();
  }

  getPartit(id:string):Observable<any>{
    return this.afs.collection('partits', ref => ref.where('id', "==", id)).valueChanges();
  }

  getXat(id:string):Observable<any>{
    return this.afs.collection('xats', ref => ref.where('partitID', "==", id)).valueChanges();
  }
  getResultat(id:string):Observable<any>{
    return this.afs.collection('resultats', ref => ref.where('partitID', "==", id)).valueChanges();
  }

  updateResultBasquet(id:string, parts:Part[]){
    let user = this.afs.collection('resultats').doc(id);
    user.update({
      'parts': parts
    })
  }
  updateResultatGeneral(id:string, puntsEquipLocal:number, puntsEquipVis:number, equipLocalId:string, equipVisId:string, compId:string, previ:Resultat, classificacio:ClassificacioPunts[]){
    let result = this.afs.collection('resultats').doc(id);
    let guanyador = '';

    if(puntsEquipLocal == puntsEquipVis){
      guanyador = 'empat';
    }else if(puntsEquipLocal > puntsEquipVis){
      guanyador = equipLocalId;
    }else if(puntsEquipLocal < puntsEquipVis){
      guanyador = equipVisId;
    }

    result.update({
      'puntsEquipLocal': puntsEquipLocal,
      'puntsEquipVis': puntsEquipVis,
      'guanyador': guanyador,
    });
    for(let classi of classificacio){
      let classiDoc = this.afs.collection('classificacions').doc(classi.id);
      if(equipLocalId == classi.equipId){
        if(previ.guanyador == ''){
          classi.golsAFavor = classi.golsAFavor + puntsEquipLocal;
          classi.golsEnContra = classi.golsEnContra + puntsEquipVis;
          classi.partitsJugats = classi.partitsJugats + 1;

        }else{
          classi.golsAFavor = classi.golsAFavor - previ.puntsEquipLocal;
          classi.golsEnContra = classi.golsEnContra - previ.puntsEquipVis;
          classi.golsAFavor = classi.golsAFavor + puntsEquipLocal;
          classi.golsEnContra = classi.golsEnContra + puntsEquipVis;

          if(previ.guanyador == 'empat'){
            classi.puntuacio = classi.puntuacio - 1;
            classi.partitsEmpatats = classi.partitsEmpatats - 1;

          }else if(previ.guanyador == equipLocalId){  
            console.log('aqui');              
            classi.puntuacio = classi.puntuacio - 3;
            classi.partitsGuanyats = classi.partitsGuanyats - 1;
            
          }else if(previ.guanyador == equipVisId){                
            classi.partitsPerduts = classi.partitsPerduts - 1;
          }
        }
        if(guanyador == 'empat'){
          classi.partitsEmpatats = classi.partitsEmpatats + 1;
          classi.puntuacio = classi.puntuacio +1;

        }else if(guanyador == equipLocalId){
          classi.partitsGuanyats = classi.partitsGuanyats + 1;
          classi.puntuacio = classi.puntuacio +3;

        }else if(guanyador == equipVisId){
          classi.partitsPerduts = classi.partitsPerduts + 1;
        }

      }else if(equipVisId == classi.equipId){
        if(previ.guanyador == ''){
          classi.golsAFavor = classi.golsAFavor + puntsEquipVis;
          classi.golsEnContra = classi.golsEnContra + puntsEquipLocal;
          classi.partitsJugats = classi.partitsJugats + 1;

        }else{
          classi.golsAFavor = classi.golsAFavor - previ.puntsEquipVis;
          classi.golsEnContra = classi.golsEnContra - previ.puntsEquipLocal;
          classi.golsAFavor = classi.golsAFavor + puntsEquipVis;
          classi.golsEnContra = classi.golsEnContra + puntsEquipLocal;

          if(previ.guanyador == 'empat'){
            classi.puntuacio = classi.puntuacio - 1;
            classi.partitsEmpatats = classi.partitsEmpatats - 1;

          }else if(previ.guanyador == equipLocalId){                
            classi.partitsPerduts = classi.partitsPerduts - 1;
            
          }else if(previ.guanyador == equipVisId){                
            classi.puntuacio = classi.puntuacio - 3;
            classi.partitsGuanyats = classi.partitsGuanyats - 1;
          }
        }
        if(guanyador == 'empat'){
          classi.partitsEmpatats = classi.partitsEmpatats + 1;
          classi.puntuacio = classi.puntuacio +1;

        }else if(guanyador == equipLocalId){
          classi.partitsPerduts = classi.partitsPerduts + 1;

        }else if(guanyador == equipVisId){
          classi.partitsGuanyats = classi.partitsGuanyats + 1;
          classi.puntuacio = classi.puntuacio +3;
        }
      }
      classiDoc.update(classi);
    }
  }
  addEvent(form:FormGroup, idComp:string, partit:Partit, resultatId:string, nomJugador:string, idEquip:string, idEvent:string,  classificacio:ClassificacioPunts[]){
    let eventInfo:Evento = {
      tipusEvent: form.get('tipus').value,
      minut: form.get('minut').value,
      jugadorId: form.get('nom').value.id,
      jugadorNom: nomJugador,
      jugadorEquip: form.get('nom').value.teamId,
      id:idEvent
    };
    let result = this.afs.collection('resultats').doc(resultatId);
    result.update({
      'events': firebase.firestore.FieldValue.arrayUnion(eventInfo)
    });
    if(eventInfo.tipusEvent == 'Gol'){
      this.addGoalResultFutbol(partit, idEquip, resultatId, classificacio);
    }
    this.addEstadistica(idComp, idEquip, form.get('nom').value.id, eventInfo.tipusEvent);
  }
  addGoalResultFutbol(partit:Partit, idEquip:string, resultatId:string, classificacio:ClassificacioPunts[]){
    let result = this.afs.collection('resultats').doc(resultatId);
    if(partit.equipLocal == idEquip){
      result.update({
        'puntsEquipLocal': firebase.firestore.FieldValue.increment(1)
      });
    }else if(partit.equipVisitant == idEquip){
      result.update({
        'puntsEquipVis': firebase.firestore.FieldValue.increment(1)
      });
    }
    this.recalcularGuanyador(partit.id, partit.equipLocal, partit.equipVisitant, classificacio);
    if(partit.equipLocal == idEquip){
      this.addGoalClassi(idEquip, partit.equipVisitant, partit);
    }else{
      this.addGoalClassi(idEquip, partit.equipLocal, partit);
    }

  }
  addGoalClassi(equipGol:string, equipRep:string,partit:Partit){
    this.getClassiByCompAndTeam(equipGol,partit.competicioID).pipe(take(1)).subscribe(
      data => {
        console.log(data);
        let classi = this.afs.collection('classificacions').doc(data[0].id);
        classi.update({
          'golsAFavor': firebase.firestore.FieldValue.increment(+1)
        });
      }
    );
    this.getClassiByCompAndTeam(equipRep,partit.competicioID).pipe(take(1)).subscribe(
      data => {
        let classi2 = this.afs.collection('classificacions').doc(data[0].id);
        classi2.update({
          'golsEnContra': firebase.firestore.FieldValue.increment(+1)
        });
      }
    )
  }
  deleteGoalClassi(equipGol:string, equipRep:string,partit:Partit){
    this.getClassiByCompAndTeam(equipGol,partit.competicioID).pipe(take(1)).subscribe(
      data => {
        let classi = this.afs.collection('classificacions').doc(data[0].id);
        classi.update({
          'golsAFavor': firebase.firestore.FieldValue.increment(-1)
        });
      }
    );
    this.getClassiByCompAndTeam(equipRep,partit.competicioID).pipe(take(1)).subscribe(
      data => {
        let classi2 = this.afs.collection('classificacions').doc(data[0].id);
        classi2.update({
          'golsEnContra': firebase.firestore.FieldValue.increment(-1)
        });
      }
    )
  }
  getClassiByCompAndTeam(idEquip:string, idComp: string ):Observable<any>{
    return this.afs.collection('classificacions', ref => ref.where('competicioID', "==", idComp).where('equipId', "==", idEquip)).valueChanges();
  }
  recalcularGuanyador(partitId:string, localId:string, visId:string,  classificacio:ClassificacioPunts[]){
    this.getResultat(partitId).pipe(take(1)).subscribe(
      (data) => {
        let result = this.afs.collection('resultats').doc(data[0].id);
        let resPrevi = data[0].guanyador;
        let resPost = ''
        if (data[0].puntsEquipLocal > data[0].puntsEquipVis){
          result.update({
            'guanyador': localId
          });
          resPost = localId

        }else if(data[0].puntsEquipLocal < data[0].puntsEquipVis){
          result.update({
            'guanyador': visId
          });
          resPost = visId
        }else if(data[0].puntsEquipLocal == data[0].puntsEquipVis){
          result.update({
            'guanyador': 'empat'
          });
          resPost = 'empat'
        }
        for(let classi of classificacio){
          let classiDoc = this.afs.collection('classificacions').doc(classi.id);
          if(localId == classi.equipId){
            if(resPrevi == ''){
              if(resPost == localId){
                classi.puntuacio = classi.puntuacio + 3;
                classi.partitsGuanyats = classi.partitsGuanyats + 1;
              }else if(resPost == 'empat'){
                classi.puntuacio = classi.puntuacio + 1;
                classi.partitsEmpatats = classi.partitsEmpatats + 1;
              }else{
                classi.partitsPerduts = classi.partitsPerduts + 1;
              }
              classi.partitsJugats = classi.partitsJugats + 1;
            }else{
              if(resPrevi != resPost){
                if(resPrevi == localId){
                  classi.puntuacio = classi.puntuacio - 3;
                  classi.partitsGuanyats = classi.partitsGuanyats - 1;
                }else if(resPrevi == 'empat'){
                  classi.puntuacio = classi.puntuacio - 1;
                  classi.partitsEmpatats = classi.partitsEmpatats - 1;
                }else{
                  classi.partitsPerduts = classi.partitsPerduts - 1;
                }
                if(resPost == localId){
                  classi.puntuacio = classi.puntuacio + 3;
                  classi.partitsGuanyats = classi.partitsGuanyats + 1;
                }else if(resPost == 'empat'){
                  classi.puntuacio = classi.puntuacio + 1;
                  classi.partitsEmpatats = classi.partitsEmpatats + 1;
                }else{
                  classi.partitsPerduts = classi.partitsPerduts + 1;
                }
              }
            } 
          }else if(visId == classi.equipId){
            if(resPrevi == ''){
              if(resPost == visId){
                classi.puntuacio = classi.puntuacio + 3;
                classi.partitsGuanyats = classi.partitsGuanyats + 1;
              }else if(resPost == 'empat'){
                classi.puntuacio = classi.puntuacio + 1;
                classi.partitsEmpatats = classi.partitsEmpatats + 1;
              }else{
                classi.partitsPerduts = classi.partitsPerduts + 1;
              }
              classi.partitsJugats = classi.partitsJugats + 1;
            }else{
              if(resPrevi != resPost){
                if(resPrevi == visId){
                  classi.puntuacio = classi.puntuacio - 3;
                  classi.partitsGuanyats = classi.partitsGuanyats - 1;
                }else if(resPrevi == 'empat'){
                  classi.puntuacio = classi.puntuacio - 1;
                  classi.partitsEmpatats = classi.partitsEmpatats - 1;
                }else{
                  classi.partitsPerduts = classi.partitsPerduts - 1;
                }
                if(resPost == visId){
                  classi.puntuacio = classi.puntuacio + 3;
                  classi.partitsGuanyats = classi.partitsGuanyats + 1;
                }else if(resPost == 'empat'){
                  classi.puntuacio = classi.puntuacio + 1;
                  classi.partitsEmpatats = classi.partitsEmpatats + 1;
                }else{
                  classi.partitsPerduts = classi.partitsPerduts + 1;
                }
              }
            } 
          }
          classiDoc.update(classi);
        }
      }
    )

  }
  deleteEvent(resultatId:string, idEvent:string, tipusEvent:string, partit:Partit, idEquip:string, event:Evento, classificacio:ClassificacioPunts[]){
    console.log(resultatId);
    let result = this.afs.collection('resultats').doc(resultatId);
    console.log(idEvent);
    result.update({
      'events': firebase.firestore.FieldValue.arrayRemove(event)
    });
    if(tipusEvent == 'Gol'){
      this.deleteGoalResultFutbol(partit,idEquip,resultatId, classificacio);
    }
    this.deleteEstadistica(partit.competicioID, idEquip, event.jugadorId, event.tipusEvent);
    
  }

  deleteGoalResultFutbol(partit:Partit, idEquip:string, resultatId:string,  classificacio:ClassificacioPunts[]){
    let result = this.afs.collection('resultats').doc(resultatId);
    if(partit.equipLocal == idEquip){
      result.update({
        'puntsEquipLocal': firebase.firestore.FieldValue.increment(-1)
      });
    }else if(partit.equipVisitant == idEquip){
      result.update({
        'puntsEquipVis': firebase.firestore.FieldValue.increment(-1)
      });
    }
    this.recalcularGuanyador(partit.id, partit.equipLocal, partit.equipVisitant,  classificacio);
    if(partit.equipLocal == idEquip){
      this.deleteGoalClassi(idEquip, partit.equipVisitant, partit);
    }else{
      this.deleteGoalClassi(idEquip, partit.equipLocal, partit);
    }

  }

  getEstadistica(idComp: string, idEquip:string, idJugador:string):Observable<any>{
    return this.afs.collection('estadistica', ref => ref.where('competicioID', "==", idComp).where('equipId', "==", idEquip).where('jugadorId.id', "==", idJugador)).valueChanges();
  }

  deleteEstadistica(idComp:string, idEquip:string, idJugador:string, tipusEvent:string){
    this.getEstadistica(idComp, idEquip, idJugador).pipe(take(1)).subscribe(
      data => {
        let estadistica = this.afs.collection('estadistica').doc(data[0].id);
        if(tipusEvent == 'Gol'){
          estadistica.update({
            'gols': firebase.firestore.FieldValue.increment(-1)
          });
        }else if(tipusEvent == 'Targeta Groga'){
          estadistica.update({
            'targetesGrogues': firebase.firestore.FieldValue.increment(-1)
          });
        }else if(tipusEvent == 'Targeta Vermella'){
          estadistica.update({
            'targetesVermelles': firebase.firestore.FieldValue.increment(-1)
          });
        }
      }
    )
  }
  setDate(newDate:Date,partitId:string){
    let partit = this.afs.collection('partits').doc(partitId);
    partit.update({
      'horari': newDate
    });
  }
  addEstadistica(idComp:string, idEquip:string, idJugador:string, tipusEvent:string){
    this.getEstadistica(idComp, idEquip, idJugador).pipe(take(1)).subscribe(
      data => {
        let estadistica = this.afs.collection('estadistica').doc(data[0].id);
        if(tipusEvent == 'Gol'){
          estadistica.update({
            'gols': firebase.firestore.FieldValue.increment(1)
          });
        }else if(tipusEvent == 'Targeta Groga'){
          estadistica.update({
            'targetesGrogues': firebase.firestore.FieldValue.increment(1)
          });
        }else if(tipusEvent == 'Targeta Vermella'){
          estadistica.update({
            'targetesVermelles': firebase.firestore.FieldValue.increment(1)
          });
        }
      }
    )
  }
}
