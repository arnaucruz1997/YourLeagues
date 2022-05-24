import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'resum-partit',
  templateUrl: './resum-partit.component.html',
  styleUrls: ['./resum-partit.component.css']
})
export class ResumPartitComponent implements OnInit {
  @Input()
  parent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
