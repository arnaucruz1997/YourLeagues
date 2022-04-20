import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Jugador } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {
  jugadorCollection!: AngularFirestoreCollection<Jugador>;
  constructor() { }
}
