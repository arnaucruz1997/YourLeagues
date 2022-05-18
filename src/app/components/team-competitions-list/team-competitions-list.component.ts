import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'team-competitions-list',
  templateUrl: './team-competitions-list.component.html',
  styleUrls: ['./team-competitions-list.component.css']
})
export class TeamCompetitionsListComponent implements OnInit {
  @Input()
  parent: any;
  constructor() { }

  ngOnInit(){
    console.log("holaa,",this.parent.competicions)
  }

}
