import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EnterResultComponent } from '../dialogs/enter-result/enter-result.component';
import { UpdateDatePartitComponent } from '../dialogs/update-date-partit/update-date-partit.component';

@Component({
  selector: 'resum-partit',
  templateUrl: './resum-partit.component.html',
  styleUrls: ['./resum-partit.component.css']
})
export class ResumPartitComponent implements OnInit {
  @Input()
  parent: any;
  constructor(
    public dialog:MatDialog,
  ) { }

  ngOnInit(){
  }
  openDialog(){
    const ref = this.dialog.open(EnterResultComponent, {
      width:'700px',
      height:'630px',
      data:{
        partit: this.parent.partit,
        resultat :this.parent.resultat,
        competicio: this.parent.competicio,
      }
    })
  }
  openDialogHour(){
    const ref = this.dialog.open(UpdateDatePartitComponent, {
      width:'700px',
      height:'300px',
      data:{
        partit: this.parent.partit,
      }
    })
  }
}
