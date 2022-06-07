import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Classificacio, ClassificacioPunts } from 'src/app/models/classificacio';
import { Evento } from 'src/app/models/event';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-enter-result',
  templateUrl: './enter-result.component.html',
  styleUrls: ['./enter-result.component.css']
})
export class EnterResultComponent implements OnInit {
  classificacio:ClassificacioPunts[];
  event:FormGroup;
  events:Evento[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public compService:CompetitionService,
    public snackbar:MatSnackBar,
  ) { }

  ngOnInit(): void {
    console.log("resultat",this.data.resultat);
    this.event = new FormGroup({
      nom: new FormControl('',Validators.required),
      minut: new FormControl('',Validators.required),
      tipus: new FormControl('',Validators.required),
    });
    this.compService.getClassificacio(this.data.competicio.id).subscribe(
      data=>{
        this.classificacio = data;
      }
    )
    this.events = this.data.resultat.events;
  }
  getErrors(formName:string):string{
    return('xd');
  }
  submitFormEvent(){
    if (this.event.valid){
      let nomJugador = '';
      let idEquip = '';
      for (let jugador of this.data.partit.infoLocal.jugadors){
        if(jugador.id == this.event.get('nom').value){
          nomJugador = jugador.nom;
          idEquip = this.data.partit.infoLocal.id;
        }
      }
      for (let jugador of this.data.partit.infoVis.jugadors){
        if(jugador.id == this.event.get('nom').value){
          nomJugador = jugador.nom;
          idEquip = this.data.partit.infoVis.id;
        }
      }
      let eventInfo:Evento = {
        tipusEvent: this.event.get('tipus').value,
        minut: this.event.get('minut').value,
        jugadorId: this.event.get('nom').value,
        jugadorNom:  nomJugador,
        jugadorEquip: idEquip,
      };

      this.compService.addEvent(this.event, this.data.competicio.id, this.data.partit, this.data.resultat.id, nomJugador, idEquip);
      this.events.push(eventInfo);
      this.snackbar.open('Event afegit','x');
    }else{
      this.snackbar.open('Omple tots els camps','x');
    }

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
