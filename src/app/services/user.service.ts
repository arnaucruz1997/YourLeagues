import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/compat/firestore';
import { User } from '../models/user';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuari:User;
  uid:string;
  loaded:boolean = false;
  constructor(
    public afs: AngularFirestore, 
    private authService:AuthService
    ) {
  }

  async getUserData() {
    if(this.authService.isLoggedIn){
      this.uid = this.authService.UserId;
      console.log("UID: ",this.uid);
      await this.afs.collection('usuaris', ref => ref.where('id','==',this.uid)).valueChanges().subscribe(
        (data:any[]) =>{
          this.usuari = data[0];
          this.loaded=true;
          console.log(this.loaded);
        }
      );
    }
  }
}
