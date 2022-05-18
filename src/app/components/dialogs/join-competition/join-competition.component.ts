import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Competicio } from 'src/app/models/competicio';
import { Equip } from 'src/app/models/equip';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-join-competition',
  templateUrl: './join-competition.component.html',
  styleUrls: ['./join-competition.component.css']
})
export class JoinCompetitionComponent implements OnInit {
  showEquips:Equip[] = []
  competition:Competicio;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public compService:CompetitionService,
    public snackbar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.competition = this.data.competicio;
    this.checkTeams(this.data.equipsUsuari, this.data.idusuari, this.data.equipsCompeticio);
  }
  checkTeams(equipsUsuari:Equip[],idUsuari:string, equipsCompeticio:Equip[]){
    for(let i =0; i < equipsUsuari.length; i++){
      if(equipsUsuari[i].capita == idUsuari){
        let trobat = false;
        for(let j = 0; j <equipsCompeticio.length; j++){
          if (equipsUsuari[i].id == equipsCompeticio[j].id){
            trobat=true;
          }
        }
        if(trobat==false){
          this.showEquips.push(equipsUsuari[i]);
        }
      }
    }
  }
  joinCompetition(equip:Equip, competicio:Competicio){
    console.log(competicio);
    let trobat=false;
    for(let i=0; i < competicio.solicituds.length; i++){
      if(competicio.solicituds[i] == equip.id){
        trobat=true;
      }
    }
    if(trobat == false){
      this.compService.enviarSolicitud(equip.id,competicio.id);
      this.snackbar.open('Sol.licitud enviada','x');
    }else{
      this.snackbar.open('Aquesta competició ja té la teva sol.licitud','x');
    }

  }
}
