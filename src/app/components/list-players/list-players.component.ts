import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'list-players',
  templateUrl: './list-players.component.html',
  styleUrls: ['./list-players.component.css']
})
export class ListPlayersComponent implements OnInit {
  @Input()
  parent: any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
