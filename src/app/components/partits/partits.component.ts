import { Component, Input, OnInit } from '@angular/core';
import { Equip } from 'src/app/models/equip';
import { Partit } from 'src/app/models/partit';
import { Resultat } from 'src/app/models/resultat';

@Component({
  selector: 'partits',
  templateUrl: './partits.component.html',
  styleUrls: ['./partits.component.css']
})
export class PartitsComponent implements OnInit {
  @Input()
  parent: any;
  partits: Partit[] = [];
  resultats: Resultat[] = [];
  numJornada: number = 1;
  totalJornades: number = 0;
  constructor() { }

  ngOnInit() {
    this.parent.compService.getPartits(this.parent.competition.id).subscribe(
      (data:any) => {
        this.partits = data;
        for(let partit of this.partits){
          this.parent.teamService.getTeamById(partit.equipLocal).subscribe(
            (dataEquipLocal:Equip)=>{
              partit['infoLocal'] = dataEquipLocal[0];
            }
          );
          this.parent.teamService.getTeamById(partit.equipVisitant).subscribe(
            (dataEquipVis:Equip)=>{
              partit['infoVis'] = dataEquipVis[0];
            }
          );
          this.parent.compService.getResultat(partit.id).subscribe(
            (dataResultats:Resultat) =>{
              partit['resultat'] = dataResultats[0];

            }
          )
          if(this.totalJornades<partit.jornada){
            this.totalJornades=partit.jornada;
          }
        }
        console.log(this.partits);
      }
    )
  }
  getPartits(){
    let listaPartidos: Partit[] = [];
    for (let partit of this.partits){
      if (partit.jornada == this.numJornada){
        listaPartidos.push(partit);
      }
    }
    return listaPartidos;
  }
  setNumJornada(num:number){
    this.numJornada = num;
    this.getPartits();
  }
}
