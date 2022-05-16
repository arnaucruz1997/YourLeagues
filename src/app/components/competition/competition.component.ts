import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competicio } from 'src/app/models/competicio';
import { Equip } from 'src/app/models/equip';
import { AuthService } from 'src/app/services/auth.service';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  equips:Equip[];
  compId:string;
  competition:Competicio;
  uid:string;
  constructor(
    public compService:CompetitionService,
    public route:ActivatedRoute,
    public authService:AuthService,

  ) { }

  ngOnInit() {
    this.uid = this.authService.UserId;
    this.route.params.subscribe(
      (data)=>{
        this.compId=data['id'];
        this.compService.getCompetitionById(this.compId).subscribe(
          (data:any)=>{
            this.competition = data[0];
            this.compService.getAllTeamsFromCompetition(this.competition.equips).subscribe(
              data=>{
                this.equips = data;
              }
            )
          }
        )
      }
    );
  }
  iniciarCompeticio(){

  }
}
