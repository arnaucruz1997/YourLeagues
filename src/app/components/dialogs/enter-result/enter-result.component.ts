import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Classificacio, ClassificacioPunts } from 'src/app/models/classificacio';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-enter-result',
  templateUrl: './enter-result.component.html',
  styleUrls: ['./enter-result.component.css']
})
export class EnterResultComponent implements OnInit {
  classificacio:ClassificacioPunts[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public compService:CompetitionService,
    public snackbar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.compService.getClassificacio(this.data.competicio.id).subscribe(
      data=>{
        this.classificacio = data;
      }
    )
  }
  saveResult(){

      let i=0;
      let puntsEquipLocal = 0;
      let puntsEquipVis = 0;
      let resPrevi = this.data.resultat;
      for(let part of this.data.resultat.parts){
        part['puntsEquipLocal'] = (document.getElementById("loc_"+i) as HTMLInputElement).value;
        part['puntsEquipVis'] = (document.getElementById("vis_"+i) as HTMLInputElement).value;
        if(this.data.competicio.tipusSport == 'Basquet'){
          puntsEquipLocal = puntsEquipLocal + Number((document.getElementById("loc_"+i) as HTMLInputElement).value);
          puntsEquipVis = puntsEquipVis + Number((document.getElementById("vis_"+i) as HTMLInputElement).value);
        }else{
          if(Number((document.getElementById("loc_"+i) as HTMLInputElement).value)>Number((document.getElementById("vis_"+i) as HTMLInputElement).value)){
            puntsEquipLocal = puntsEquipLocal + 1;
          }else if(Number((document.getElementById("loc_"+i) as HTMLInputElement).value)<Number((document.getElementById("vis_"+i) as HTMLInputElement).value)){
            puntsEquipVis = puntsEquipVis + 1;
          }
        }
        i++;
      }
      this.compService.updateResultBasquet(this.data.resultat.id, this.data.resultat.parts);
      this.compService.updateResultatGeneral(this.data.resultat.id, puntsEquipLocal, puntsEquipVis, this.data.partit.equipLocal,
        this.data.partit.equipVisitant , this.data.competicio.id, resPrevi, this.classificacio);

  }
}
