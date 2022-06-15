import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { Competicio } from 'src/app/models/competicio';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  competicions:Competicio[];
  compsFiltrades:Competicio[];
  filtreEsport:string = '';
  filtreEstat:string = '';
  filtrat:boolean = false;
  constructor(
    public route:ActivatedRoute,
    public compService:CompetitionService
  ) { }

  async ngOnInit() {
    this.compService.getAllCompetitions().subscribe(
      data=>{
        this.competicions = data;
      }
    )
  }
  changeFiltreEsport(esport:string){
    this.filtreEsport = esport;
  }
  changeFiltreEstat(estat:string){
    console.log(estat)
    this.filtreEstat = estat;
  }
  filtrar(){
    let compsFiltrades:Competicio[] = [];
    if(this.filtreEstat != '' && this.filtreEsport != ''){
      for(let competicio of this.competicions){
        if(competicio.estatCompeticio == this.filtreEstat){
          if(competicio.tipusSport == this.filtreEsport){
            compsFiltrades.push(competicio);
          }
        }
      }
      this.filtrat=true;
    }else if(this.filtreEstat !='' && this.filtreEsport == ''){
      for(let competicio of this.competicions){
        if(competicio.estatCompeticio == this.filtreEstat){
          compsFiltrades.push(competicio);
        }
      }
      this.filtrat=true;
    }else if(this.filtreEstat =='' && this.filtreEsport != ''){
      for(let competicio of this.competicions){
        if(competicio.tipusSport == this.filtreEsport){
          compsFiltrades.push(competicio);
        }
      }
      this.filtrat=true;
    }
    this.compsFiltrades = compsFiltrades;
  }
}
