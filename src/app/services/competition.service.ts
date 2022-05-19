import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { observeOutsideAngular } from '@angular/fire';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { documentId, DocumentReference, FieldValue} from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of, take } from 'rxjs';
import { ClassificacioPunts, ClassificacioSets } from '../models/classificacio';
import { Competicio } from '../models/competicio';
import { Equip } from '../models/equip';
import { AuthService } from './auth.service';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  userCollectionCompeticio!: AngularFirestoreCollection<Competicio>;
  userCollectionClassificacioPunts!: AngularFirestoreCollection<ClassificacioPunts>;
  userCollectionClassificacioSets!: AngularFirestoreCollection<ClassificacioSets>;
  constructor(
    public authService:AuthService,
    public afs: AngularFirestore,
    public router: Router,
    public uploadService: UploadService,
    public storage: AngularFireStorage,
    public datepipe: DatePipe,
  ) {
    this.userCollectionCompeticio = this.afs.collection<Competicio>('competicions');
    this.userCollectionClassificacioPunts = this.afs.collection<ClassificacioPunts>('classificacions');
    this.userCollectionClassificacioSets = this.afs.collection<ClassificacioSets>('classificacions');
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
    if(esport == "Futbol 11" || esport == "Futbol 7" || esport == "Futbol Sala"|| esport == "Basquet"|| esport == "Handbol"){
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
    }else{ 
    } 
  }

  getClassificacio(id: string):Observable<any>{
    return this.afs.collection('classificacions', ref => ref.where('competicioID', "==", id)).valueChanges();
  }
}
