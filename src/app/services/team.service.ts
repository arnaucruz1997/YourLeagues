import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { documentId, DocumentReference, FieldValue} from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import firebase from 'firebase/compat/app';
import { Observable, take } from 'rxjs';
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
  ) { 
    this.userCollectionEquip = this.afs.collection<Equip>('equips');
  }

  async createTeam(team:any,imgurl:string,file:File){
    const id = this.afs.createId();
    const jugador = {
      id: this.authService.UserId,
      dorsal: team.get('dorsal').value
    }
    const teamInfo:Equip = {
      id: id,
      nom: team.get('nom').value,
      abreviacio: team.get('abreviacio').value,
      img: imgurl,
      capita: this.authService.UserId,
      jugadors:[jugador],
      competicions: [],
      invitacions: [],
    }
    await this.uploadService.uploadImage(imgurl,file);
    await this.updateUserEquips(this.authService.UserId,id);
    this.router.navigate(['my-teams']);
    this.userCollectionEquip.doc(id).set(teamInfo).catch((error) => {
      window.alert(error.message);
    });
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
  deleteUserInvitacio(id: string, value:string){
    let user = this.afs.collection('usuaris').doc(id);
    user.update({
      'invitacions': firebase.firestore.FieldValue.arrayRemove(value)
    })
  }
  updateTeamInvitacions(id: string, value: string) {
    let user = this.afs.collection('equips').doc(id);
    user.update({
      'invitacions': firebase.firestore.FieldValue.arrayUnion(value)
    })
  }
  deleteTeamInvitacio(id: string, value:string){
    let user = this.afs.collection('equips').doc(id);
    user.update({
      'invitacions': firebase.firestore.FieldValue.arrayRemove(value)
    })
  }

  getUserTeams(equipsId:any[]): Observable<any>{
    return this.afs.collection('equips', ref => ref.where(documentId(), "in", equipsId)).valueChanges();
  }
  getTeamById(id:string){
    return this.afs.collection('equips', ref => ref.where(documentId(), "==", id)).valueChanges();
  }
}
