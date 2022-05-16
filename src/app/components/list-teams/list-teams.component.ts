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

}
