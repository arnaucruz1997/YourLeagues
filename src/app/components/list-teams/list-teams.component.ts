import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-teams',
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.css']
})
export class ListTeamsComponent implements OnInit {
  @Input()
  parent: any;
  constructor() { }

  ngOnInit(): void {
  }
  accept(idTeam:string){
    this.parent.compService.addTeamToCompetition(idTeam,this.parent.competition.id);
    this.parent.compService.addCompetitionToTeam(idTeam,this.parent.competition.id);
    this.parent.compService.deleteSolicitud(idTeam,this.parent.competition.id);
  }
  decline(idTeam:string){
    this.parent.compService.deleteSolicitud(idTeam,this.parent.competition.id);
    for(let i=0; i<this.parent.equipsSolicitud.length; i++){
      if(this.parent.equipsSolicitud[i].id == idTeam){
        this.parent.equipsSolicitud.splice(i,1);
      }
    }
  }
}
