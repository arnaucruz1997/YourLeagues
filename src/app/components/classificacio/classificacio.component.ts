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
  constructor() { }

  ngOnInit(): void {

    this.parent.compService.getClassificacio(this.parent.competition.id).subscribe(
      (data:any)=>{
        let esport = this.parent.competition.tipusSport;
        if(esport == "Futbol 11" || esport == "Futbol 7" || esport == "Futbol Sala"|| esport == "Basquet"|| esport == "Handbol"){
            this.classificacioPunts = data;
            this.esPunts=true;
            this.classificacioPunts.sort((a,b) => b.puntuacio - a.puntuacio);
        }else{
          this.classificacioSets = data;
          this.esPunts=false;
        }
      }
    );
  }

}
