import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Missatge } from '../models/missatge';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    public datepipe: DatePipe,
    public afs: AngularFirestore,
  ) { }

  sendMissatge(xatId:string, uid:string, nomEnviador:string, msg:string){
    console.log("xDDDs")
    let date = new Date();
    console.log(date,xatId, uid, nomEnviador, msg);
    const id = this.afs.createId();
    const missatge:Missatge = {
      id: id,
      xatId: xatId,
      enviador: uid,
      nomEnviador:nomEnviador,
      missatge: msg,
      hora: date,
    }
    let xat = this.afs.collection('xats').doc(xatId);
    xat.update({
      'missatges': firebase.firestore.FieldValue.arrayUnion(missatge)
    })
  }
}
