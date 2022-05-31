import { Component, Input, OnInit } from '@angular/core';
import { ClassificacioPunts, ClassificacioSets } from 'src/app/models/classificacio';

@Component({
  selector: 'classificacio',
  templateUrl: './classificacio.component.html',
  styleUrls: ['./classificacio.component.css']
})
export class ClassificacioComponent implements OnInit {
  @Input()
  parent: any;
  classificacioPunts:ClassificacioPunts[];
  classificacioSets:ClassificacioSets[];
  esPunts:boolean;
  esport:string;
  constructor() { }

  ngOnInit(): void {

    this.parent.compService.getClassificacio(this.parent.competition.id).subscribe(
      (data:any)=>{
        let esport = this.parent.competition.tipusSport;
        this.esport = this.parent.competition.tipusSport;
        this.classificacioPunts = data;
        this.esPunts=true;
        this.classificacioPunts.sort((a,b) => b.puntuacio - a.puntuacio);

      }
    );
  }

}
