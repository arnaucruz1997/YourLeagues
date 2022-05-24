import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/compat/firestore';
import { documentId } from '@angular/fire/firestore';
import { Observable, take, of } from 'rxjs';
import { User } from '../models/user';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuari:Observable<User>;
  uid:string;
  constructor(
    public afs: AngularFirestore, 
    private authService:AuthService
    ) {
  }

  getUserData(): Observable<any>{
      this.uid = this.authService.UserId;
      return this.afs.collection('usuaris', ref => ref.where('id','==',this.uid)).valueChanges().pipe(take(1));
  }
  findUserByEmail(email:string):  Observable<any>{
    return this.afs.collection('usuaris', ref => ref.where('email','==',email.toLowerCase())).valueChanges().pipe(take(1));
  }
  findUserById(listIds:any[]): Observable<any>{
    if( listIds.length == 0){
      return of();
    }else{
      return this.afs.collection('usuaris', ref => ref.where(documentId(),'in',listIds)).valueChanges();
    }
  }
  getUserDataById(id:string): Observable<any>{
    return this.afs.collection('usuaris', ref => ref.where(documentId(),'==',id)).valueChanges();
  }
  getUserInvitations(listIds:any[]): Observable<any>{
    if( listIds.length == 0){
      return of();
    }else{
      return this.afs.collection('equips', ref => ref.where(documentId(),'in',listIds)).valueChanges();
    }

  }
}
