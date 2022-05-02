import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { documentId, DocumentReference, FieldValue} from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, of, take } from 'rxjs';
import { Equip } from '../models/equip';
import { AuthService } from './auth.service';
import { UploadService } from './upload.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  userCollectionEquip!: AngularFirestoreCollection<Equip>;
  arrayUnion: FieldValue;
  uid: String;
  constructor(
    public authService:AuthService,
    public afs: AngularFirestore,
    public router: Router,
    public uploadService: UploadService,
    public storage: AngularFireStorage,
    public datepipe: DatePipe,
  ) { 
    this.userCollectionEquip = this.afs.collection<Equip>('equips');
  }

  async createTeam(team:any,file:any){
    let downloadURL = "https://firebasestorage.googleapis.com/v0/b/yourleagues-46263.appspot.com/o/SeekPng.com_espn-logo-png_289657.png?alt=media&token=54e4712a-ff32-4007-a4c1-1472b5e16754"
    if(file!=null){
      let currentDateTime = this.datepipe.transform((new Date), 'MM_dd_yyyy_h_mm_ss');
      let uploadurl = (currentDateTime+"_"+team.get('nom').value);

      this.storage.upload(uploadurl,file).then(rst => {
        rst.ref.getDownloadURL().then(url => {
          downloadURL = url;
          const id = this.afs.createId();
          const jugador = {
            id: this.authService.UserId,
            dorsal: team.get('dorsal').value
          }
          const teamInfo:Equip = {
            id: id,
            nom: team.get('nom').value,
            abreviacio: team.get('abreviacio').value,
            img: downloadURL,
            capita: this.authService.UserId,
            jugadors:[jugador],
            competicions: [],
            invitacions: [],
          }
          this.uploadService.uploadImage(this.authService.UserId,file);
          this.updateUserEquips(this.authService.UserId,id);
          this.router.navigate(['my-teams']);
          this.userCollectionEquip.doc(id).set(teamInfo).catch((error) => {
            window.alert(error.message);
          });
        })
      })
    }else{
      const id = this.afs.createId();
      const jugador = {
        id: this.authService.UserId,
        dorsal: team.get('dorsal').value
      }
      const teamInfo:Equip = {
        id: id,
        nom: team.get('nom').value,
        abreviacio: team.get('abreviacio').value,
        img: downloadURL,
        capita: this.authService.UserId,
        jugadors:[jugador],
        competicions: [],
        invitacions: [],
      }
      this.uploadService.uploadImage(this.authService.UserId,file);
      this.updateUserEquips(this.authService.UserId,id);
      this.router.navigate(['my-teams']);
      this.userCollectionEquip.doc(id).set(teamInfo).catch((error) => {
        window.alert(error.message);
      });
    }
    
  }
  updateUserEquips(id: string, value: string) {
    let user = this.afs.collection('usuaris').doc(id);
    user.update({
      'equips': firebase.firestore.FieldValue.arrayUnion(value)
    })
  }
  updateUserInvitacions(id: string, value: string) {
    let user = this.afs.collection('usuaris').doc(id);
    user.update({
      'invitacions': firebase.firestore.FieldValue.arrayUnion(value)
    })
  }
  deleteUserInvitacio(id: string, value:string): Promise<any>{
    let user = this.afs.collection('usuaris').doc(id);
    return user.update({
      'invitacions': firebase.firestore.FieldValue.arrayRemove(value)
    })
  }
  updateTeamInvitacions(id: string, value: string) {
    let user = this.afs.collection('equips').doc(id);
    user.update({
      'invitacions': firebase.firestore.FieldValue.arrayUnion(value)
    })
  }
  deleteTeamInvitacio(id: string, value:string): Promise<any>{
    let user = this.afs.collection('equips').doc(id);
    return user.update({
      'invitacions': firebase.firestore.FieldValue.arrayRemove(value)
    })
  }

  getUserTeams(equipsId:any[]): Observable<any>{
    if( equipsId.length == 0){
      return of();
    }else{
      return this.afs.collection('equips', ref => ref.where(documentId(), "in", equipsId)).valueChanges();
    }
  }
  getTeamById(id:string): Observable<any>{
    return this.afs.collection('equips', ref => ref.where(documentId(), "==", id)).valueChanges();
  }

  addUserToTeam(id_usuari:string, id_team:string, dorsal:any){
    let dorsalxnumber = {
      dorsal:dorsal,
      id:id_usuari
    }
    let user = this.afs.collection('equips').doc(id_team);
    user.update({
      'jugadors': firebase.firestore.FieldValue.arrayUnion(dorsalxnumber)
    })
  }
  addTeamToUser(id_usuari:string, id_team:string){
    let user = this.afs.collection('usuaris').doc(id_usuari);
    user.update({
      'equips': firebase.firestore.FieldValue.arrayUnion(id_team)
    })
  }
}
