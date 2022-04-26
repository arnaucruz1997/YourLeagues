import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/compat/firestore';
import { Observable, take } from 'rxjs';
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
}
