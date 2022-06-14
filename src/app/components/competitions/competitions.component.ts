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
  competicions:Competicio[]
  constructor(
    public route:ActivatedRoute,
    public compService:CompetitionService
  ) { }

  async ngOnInit() {
    this.compService.getAllCompetitions().subscribe(
      data=>{
        console.log(data);
        this.competicions = data;
      }
    )
  }
  filtrar(){
    
  }
}
