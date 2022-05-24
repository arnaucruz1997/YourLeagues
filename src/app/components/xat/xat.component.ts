import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.css']
})
export class XatComponent implements OnInit {
  @Input()
  parent: any;
  constructor() { }

  ngOnInit(): void {
  }

}
