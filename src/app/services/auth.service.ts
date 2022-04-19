import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import * as firebase from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    ) { 
      this.afAuth.authState.subscribe((user)=>{
        console.log(user);
        if (user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        }else{
          localStorage.setItem('user','null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email,password).then(value =>{
      console.log('Nice, it worked!');
      this.setUserData(value.user);
      this.router.navigate(['']);
    }).catch(err =>{
      console.log('Something went wrong:',err.message);
      alert('L\'usuari introduït no es correcte');
    });

  }
  logout(){
    return this.afAuth.signOut().then(()=>{
      this.router.navigate([''])
    });
  }
  get isLoggedIn(): boolean{
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user==null){
      return false;
    }else{
      return true;
    }
  }
  setUserData(user: any){
    console.log("user:")
    console.log(user.email);
    const userData: User = {
      id: user.id,
      email: user.email,
    };
  }
}
