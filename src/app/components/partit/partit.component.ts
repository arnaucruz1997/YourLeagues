import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equip } from 'src/app/models/equip';
import { Partit } from 'src/app/models/partit';
import { CompetitionService } from 'src/app/services/competition.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-partit',
  templateUrl: './partit.component.html',
  styleUrls: ['./partit.component.css']
})
export class PartitComponent implements OnInit {
  partit:Partit;
  constructor(
    public route:ActivatedRoute,
    public compService:CompetitionService,
    public teamService:TeamService,
    ) { }

  ngOnInit() {
    this.route.params.subscribe(
      data=> {
        this.compService.getPartit(data['idpartit']).subscribe(
          (data:any)=>{
            this.partit = data[0];
            this.teamService.getTeamById(this.partit.equipLocal).subscribe(
              (dataEquipLocal:Equip)=>{
                this.partit['infoLocal'] = dataEquipLocal[0];
              }
            );
            this.teamService.getTeamById(this.partit.equipVisitant).subscribe(
              (dataEquipVis:Equip)=>{
                this.partit['infoVis'] = dataEquipVis[0];
              }
            );
          }
        )
      }
    )
  }

}
