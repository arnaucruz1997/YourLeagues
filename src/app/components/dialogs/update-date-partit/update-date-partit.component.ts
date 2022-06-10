import { DatePipe} from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { matDialogAnimations, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { thisMonth } from '@igniteui/material-icons-extended';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-update-date-partit',
  templateUrl: './update-date-partit.component.html',
  styleUrls: ['./update-date-partit.component.css']
})
export class UpdateDatePartitComponent implements OnInit {
  hora:FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public compService:CompetitionService,
  ) { }

  ngOnInit() {

    this.hora = new FormGroup({
      dia: new FormControl('',Validators.required),
      hora: new FormControl('',Validators.required),
    });
    const datepipe: DatePipe = new DatePipe('en-US')
    let formatedDate = datepipe.transform(this.data.partit.horari.toDate(), 'dd/MM/YYYY');
    let formatedTime = datepipe.transform(this.data.partit.horari.toDate(), 'HH:mm')
    this.hora.controls['dia'].setValue(this.data.partit.horari.toDate());
    this.hora.controls['hora'].setValue(formatedTime);
  }
  submitFormHora(){
    let newDate = new Date(this.hora.get('dia').value);
    const res= this.hora.get('hora').value.split(':');
    newDate.setHours(res[0]);
    newDate.setMinutes(res[1]);
    this.compService.setDate(newDate,this.data.partit.id);
    
  }
}
