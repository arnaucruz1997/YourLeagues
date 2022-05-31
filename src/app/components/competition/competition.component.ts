import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Competicio } from 'src/app/models/competicio';
import { Equip } from 'src/app/models/equip';
import { Jugador, Organitzador } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { TeamService } from 'src/app/services/team.service';
import { JoinCompetitionComponent } from '../dialogs/join-competition/join-competition.component';
import {NgZone} from '@angular/core';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  equips:Equip[];
  equipsSolicitud:Observable<Equip[]>;
  equipsUsuari:Equip[];
  compId:string;
  competition:Competicio;
  uid:string;
  usuari:any;
  constructor(
    public compService:CompetitionService,
    public route:ActivatedRoute,
    public authService:AuthService,
    public teamService:TeamService,
    public dialog:MatDialog,
    public ngZone:NgZone,

  ) { }

  ngOnInit() {
    this.uid = this.authService.UserId;
    this.route.data.subscribe(
      (data)=>{
        this.usuari = data['user'][0];
        this.teamService.getUserTeams(this.usuari.equips).subscribe(
          data => {
            this.equipsUsuari = data;
          }
        )
      }
    )
    this.route.params.subscribe(
      (data)=>{
        this.compId = data['id'];
        this.compService.getCompetitionById(this.compId).subscribe(
          (data:any)=>{
            this.competition = data[0];
            this.compService.getAllTeamsFromCompetition(this.competition.equips).subscribe(
              data=>{
                this.equips = data;
              }
            )
            this.compService.getAllTeamsFromCompetition(this.competition.solicituds).subscribe(
              data=>{
                this.equipsSolicitud = data;
              }
            )
          }
        )
      }
    );
    
  }
  openDialog(){
    const ref = this.dialog.open(JoinCompetitionComponent, {
      width:'400px',
      height:'700px',
      data:{
        idusuari: this.usuari.id,
        equipsUsuari:this.equipsUsuari,
        equipsCompeticio:this.equips,
        competicio: this.competition,
      }
    })
  }
  iniciarCompeticio(){
    for(let i =0; i < this.equips.length; i++){
      this.compService.createClassificacio(this.equips[i].id, this.competition.id, this.competition.tipusSport, this.equips[i].img,this.equips[i].nom);
      for (let j=0; j<this.equips[i].jugadors.length;j++){
        this.compService.createEstadistiques(this.equips[i].id, this.equips[i].nom, this.equips[i].jugadors[j], this.competition.id, this.competition.tipusSport);
      }
    }
    this.compService.createPartits(this.competition.equips, this.competition.id, this.competition.organitzador, this.competition.tipusSport);
  }
}
