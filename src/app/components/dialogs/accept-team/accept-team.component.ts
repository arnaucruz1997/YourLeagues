import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-accept-team',
  templateUrl: './accept-team.component.html',
  styleUrls: ['./accept-team.component.css']
})
export class AcceptTeamComponent implements OnInit {
  dorsalesLibres:number[];
  dorsal:FormGroup;
  title:string;
  idteam:string;
  idusuari:string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public teamService:TeamService,
    public snackBar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.dorsalesLibres=[];
    this.title = this.data.nomEquip;
    this.idteam = this.data.idteam;
    this.idusuari = this.data.idusuari;
    for(let i=1;i<100;i++){
      if(!(this.data.listadorsales.includes(i))){
        this.dorsalesLibres.push(i);
      }
    }
    this.dorsal = new FormGroup({
      dorsal: new FormControl('',Validators.compose([Validators.required])),
    });

  }
  getErrors (formName:string):string{
    const errors = [];
    if(formName =='dorsal'){
      if(this.dorsal.get(formName).hasError('required')){
        errors.push("Has de seleccionar un dorsal");
      }
    }
    return errors[0];
  }

  accept(dorsal:any){
    if(this.dorsal.valid){
      this.teamService.deleteTeamInvitacio(this.idteam, this.idusuari);
      this.teamService.deleteUserInvitacio(this.idusuari, this.idteam);
      this.teamService.addTeamToUser(this.idusuari, this.idteam);
      this.teamService.addUserToTeam(this.idusuari, this.idteam, dorsal.get('dorsal').value);
    }else{
      this.snackBar.open('Les dades no són correctes','x');
    }

  }
}
