import { Component, OnInit } from '@angular/core';
import { orderBy } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { Equip } from 'src/app/models/equip';
import { Partit } from 'src/app/models/partit';
import { Resultat } from 'src/app/models/resultat';
import { CompetitionService } from 'src/app/services/competition.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})
export class MyGamesComponent implements OnInit {
  partits: Partit[] = [];
  equips: string[] = [];
  constructor(
    public compService:CompetitionService,
    public route:ActivatedRoute,
    public teamService:TeamService,
  ) { }

  ngOnInit(){
    this.route.data.subscribe(
      data => {
        this.equips = data['user'][0].equips;
        this.compService.getPartitsDependingOnTeamsLocal(this.equips).subscribe(
          (dataPartits:any) => {
            this.partits = dataPartits[0].concat(dataPartits[1]);
            console.log(this.partits);
            for(let partit of this.partits){
              this.teamService.getTeamById(partit.equipLocal).subscribe(
                (dataEquipLocal:Equip)=>{
                  partit['infoLocal'] = dataEquipLocal[0];
                }
              );
              this.teamService.getTeamById(partit.equipVisitant).subscribe(
                (dataEquipVis:Equip)=>{
                  partit['infoVis'] = dataEquipVis[0];
                }
              );
              this.compService.getResultat(partit.id).subscribe(
                (dataResultats:Resultat) =>{
                  partit['resultat'] = dataResultats[0];
    
                }
              )
            }
          }
        )
      }
    );
  }

}
