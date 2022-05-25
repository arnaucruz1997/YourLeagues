import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Equip } from 'src/app/models/equip';
import { Partit } from 'src/app/models/partit';
import { Jugador, Organitzador } from 'src/app/models/user';
import { Xat } from 'src/app/models/xat';
import { AuthService } from 'src/app/services/auth.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-partit',
  templateUrl: './partit.component.html',
  styleUrls: ['./partit.component.css']
})
export class PartitComponent implements OnInit {
  partit:Partit;
  xat:Xat;
  capiLocal:Jugador;
  capiVis:Jugador;
  org:Organitzador;
  uid:string;
  constructor(
    public route:ActivatedRoute,
    public compService:CompetitionService,
    public teamService:TeamService,
    public userService:UserService,
    public authService:AuthService,
    ) { }

  ngOnInit() {
    this.uid =this.authService.UserId;
    this.route.params.subscribe(
      data=> {
        this.compService.getPartit(data['idpartit']).subscribe(
          (data:any)=>{
            this.partit = data[0];
            this.teamService.getTeamById(this.partit.equipLocal).subscribe(
              (dataEquipLocal:Equip)=>{
                this.partit['infoLocal'] = dataEquipLocal[0];
              }
            );
            this.teamService.getTeamById(this.partit.equipVisitant).subscribe(
              (dataEquipVis:Equip)=>{
                this.partit['infoVis'] = dataEquipVis[0];
              }
            );
            this.compService.getXat(this.partit.id).subscribe(
              (dataXat:any)=>{
                this.xat = dataXat[0];
                console.log(this.xat);
                this.userService.getUserDataById(this.xat.capLocalId).subscribe(
                  dataCapiLocal=>{
                    this.capiLocal= dataCapiLocal[0];
                  }
                );
                this.userService.getUserDataById(this.xat.capVisId).subscribe(
                  dataCapiVis=>{
                    this.capiVis= dataCapiVis[0];
                  }
                );
                this.userService.getUserDataById(this.xat.organitzadorID).subscribe(
                  dataOrg=>{
                    this.org= dataOrg[0];
                  }
                );
              }
            )
          }
        )
      }
    )
  }

}
