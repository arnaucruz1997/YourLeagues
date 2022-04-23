import { Injectable } from '@angular/core';
import { Jugador, Organitzador, User, UserData } from '../models/user';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {Router} from '@angular/router';
import {AngularFirestore, AngularFirestoreCollection,} from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';

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
    return this.afAuth .createUserWithEmailAndPassword(user.get('email').value, user.get('password').value).then((success) => {
      this.insertUser(success.user?.uid,user,jugador,organitzador);
      this.setUserData(success.user);
      this.userData = success.user;
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user')!);
      this.router.navigate(['']);
    })
    .catch((error) => {
      window.alert(error.message);
    });
  }

  get isLoggedIn(){
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user==null){
      return false;
    }else{
      return true;
    }
  }
   get UserId() {
    if(this.isLoggedIn){
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      return user['uid'];
    }else{
      return null;
    }

  }
  setUserData(user: any){
    const userData: UserData = {
      uid: user.uid,
      email: user.email,
    };
  }

  insertUser(id: any, user: FormGroup, jugador:FormGroup, organitzador:FormGroup){
    if (user.get('rol').value == 'Jugador'){
      const userInfo:Jugador = {
        id: id,
        email: user.get('email').value,
        nom: user.get('nom').value,
        cognoms: user.get('cognoms').value,
        dni: user.get('dni').value,
        date: user.get('date').value,
        sexe: user.get('sexe').value,
        localitat: user.get('localitat').value,
        rol: user.get('rol').value,
        altura: jugador.get('altura').value,
        pes: jugador.get('pes').value,
      }
      this.userCollectionJugador.add(userInfo).catch((error) => {
        window.alert(error.message);
      });
    }else{
      const userInfo:Organitzador = {
        id: id,
        email: user.get('email').value,
        nom: user.get('nom').value,
        cognoms: user.get('cognoms').value,
        dni: user.get('dni').value,
        date: user.get('date').value,
        sexe: user.get('sexe').value,
        localitat: user.get('localitat').value,
        rol: user.get('rol').value,
        orgName: organitzador.get('orgName').value,
        orgEmail: organitzador.get('orgEmail').value,
        orgTelefon: organitzador.get('orgTelefon').value,
        orgDesc: organitzador.get('orgDesc').value,
      }
      this.userCollectionOrganitzador.add(userInfo).catch((error) => {
        window.alert(error.message);
      });
    }
  }
}
