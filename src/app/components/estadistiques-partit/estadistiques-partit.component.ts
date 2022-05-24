import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'estadistiques-partit',
  templateUrl: './estadistiques-partit.component.html',
  styleUrls: ['./estadistiques-partit.component.css']
})
export class EstadistiquesPartitComponent implements OnInit {
  @Input()
  parent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
