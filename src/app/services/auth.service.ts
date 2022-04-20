import { Injectable } from '@angular/core';
import { Jugador, Organitzador, User, UserData } from '../models/user';
import * as firebase from '@firebase/app';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,} from '@angular/fire/compat/firestore';
import { registerLocaleData } from '@angular/common';
import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData: any;
  userCollectionJugador!: AngularFirestoreCollection<Jugador>;
  userCollectionOrganitzador!: AngularFirestoreCollection<Organitzador>;
  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    ) { 
      this.afAuth.authState.subscribe((user)=>{
        if (user){
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        }else{
          localStorage.setItem('user','null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
      this.userCollectionJugador = this.afs.collection<Jugador>('usuaris');
      this.userCollectionOrganitzador = this.afs.collection<Organitzador>('usuaris');
    
    }

  login(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email,password).then(value =>{
      this.setUserData(value.user);
      this.router.navigate(['']);
    }).catch(err =>{
      alert('L\'usuari introduït no es correcte');
    });

  }
  logout(){
    return this.afAuth.signOut().then(()=>{
      this.router.navigate([''])
    });
  }
  register(user: any, jugador:any, organitzador:any){
    console.log(user);
    console.log(jugador);
    console.log(organitzador);
    return this.afAuth .createUserWithEmailAndPassword(user.email, user.password).then((success) => {
      this.insertUser(success.user?.uid,user,jugador,organitzador);
      this.router.navigate(['']);
    })
    .catch((error) => {
      window.alert(error.message);
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
    const userData: UserData = {
      id: user.id,
      email: user.email,
    };
  }
  insertUser(id: any, user: any, jugador:any, organitzador:any){
    console.log(jugador.altura);
    if (user.rol == 'Jugador'){
      const userInfo:Jugador = {
        id: id,
        email: user.email,
        nom: user.nom,
        cognoms: user.cognoms,
        dni: user.dni,
        date: user.date,
        sexe: user.sexe,
        localitat: user.localitat,
        rol: user.rol,
        altura: jugador.altura,
        pes: jugador.pes,
      }
      this.userCollectionJugador.add(userInfo).catch((error) => {
        window.alert(error.message);
      });
    }else{
      const userInfo:Organitzador = {
        id: id,
        email: user.email,
        nom: user.nom,
        cognoms: user.cognoms,
        dni: user.dni,
        date: user.date,
        sexe: user.sexe,
        localitat: user.localitat,
        rol: user.rol,
        orgName: organitzador.orgName,
        orgEmail: organitzador.orgEmail,
        orgTelefon: organitzador.orgTelefon,
        orgDesc: organitzador.orgDesc,
      }
      this.userCollectionOrganitzador.add(userInfo).catch((error) => {
        window.alert(error.message);
      });
    }
  }
  findUserData(user: any){
    user.id
  }
}
