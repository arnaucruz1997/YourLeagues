import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable,MatTableDataSource } from '@angular/material/table';
import { EstadisticaBasquet, EstadisticaGoal } from 'src/app/models/estadistica';
import { UserService } from 'src/app/services/user.service';
import { generateSchedule } from "sports-schedule-generator";

@Component({
  selector: 'estadistiques',
  templateUrl: './estadistiques.component.html',
  styleUrls: ['./estadistiques.component.css']
})
export class EstadistiquesComponent implements OnInit {
  dataSource: any = [];

  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  @Input()
  parent: any;
  estadistiquesGoals:EstadisticaGoal[];
  estadistiquesPunts:EstadisticaBasquet[];
  esGols:boolean;
  columnas: string[] = ['pos','img','nom', 'equip', 'targetesGrogues', 'targetesVermelles','gols', 'partits']
  constructor( private cdr: ChangeDetectorRef, public userService:UserService) { }

  ngOnInit(){
    this.parent.compService.getEstadistiques(this.parent.competition.id).subscribe(
      (data:any)=>{
        let esport = this.parent.competition.tipusSport;
        if(esport == "Futbol 11" || esport == "Futbol 7" || esport == "Futbol Sala" || esport == "Handbol"){
            this.estadistiquesGoals = data;
            this.esGols=true;
            this.estadistiquesGoals.sort((a,b) => b.gols - a.gols);

            //get noms
            for(let estadistica of this.estadistiquesGoals){
              this.userService.getUserDataById(estadistica.jugadorId['id']).subscribe(
                data=>{
                  estadistica['nomJugador'] = data[0].nom;
                  estadistica['cognomJugador'] = data[0].cognoms;
                  estadistica['imgJugador'] = data[0].img;
                }
              )
            }

            this.dataSource = new MatTableDataSource(this.estadistiquesGoals);
            this.dataSource.paginator = this.paginator;
            this.dataSource.paginator.length = this.estadistiquesGoals.length;
            this.dataSource.paginator._intl.itemsPerPageLabel = 'Pàgina';

        }else if(esport == "Basquet"){
          this.estadistiquesPunts = data;
          this.esGols=false;
        }
      }
    );
    this.cdr.detectChanges();
  }

}
