import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl} from '@angular/forms';
import { Jugador } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user!: FormGroup;
  jugador!: FormGroup;
  org!: FormGroup;
 
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      nom: new FormControl(''),
      cognoms: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
      dni: new FormControl(''),
      date: new FormControl(''),
      sexe: new FormControl(''),
      localitat: new FormControl(''),
      rol: new FormControl(''),
    });

    this.jugador = new FormGroup({
      altura: new FormControl(''),
      pes: new FormControl(''),
    });

    this.org = new FormGroup({
      orgName: new FormControl(''),
      orgEmail: new FormControl(''),
      orgTelefon: new FormControl(''),
      orgDesc: new FormControl(''),
    });
  }

}
