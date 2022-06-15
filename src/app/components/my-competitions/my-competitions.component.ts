import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competicio } from 'src/app/models/competicio';
import { Jugador } from 'src/app/models/user';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-my-competitions',
  templateUrl: './my-competitions.component.html',
  styleUrls: ['./my-competitions.component.css']
})
export class MyCompetitionsComponent implements OnInit {
  competicions:Competicio[];
  usuari:Jugador;
  equips:string[];
  constructor(
    public compService:CompetitionService,
    public route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.equips = data['user'][0].equips;
        this.compService.getCompDependingOnTeams(this.equips).subscribe(
          data=>{
            this.competicions = data;
            console.log(data);
          }
        )
      }
    );
  }

}
