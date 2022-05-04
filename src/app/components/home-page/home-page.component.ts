import { Component, OnInit } from '@angular/core';
import { Jugador, Organitzador, User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { TeamService } from 'src/app/services/team.service';
import { Equip } from 'src/app/models/equip';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  usuari:User;
  jugador:Jugador;
  organitzador:Organitzador;
  equips:Equip[];
  constructor(
    public authService:AuthService, 
    public userService:UserService,
    public route:ActivatedRoute,
    public teamService:TeamService,
    ) { 

  }
  async ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.usuari = data['user'][0];
        if(this.usuari.rol == "Jugador"){
          this.jugador = data['user'][0];
          if(this.jugador.equips.length>0){
            this.teamService.getUserTeams(this.jugador.equips).subscribe(
              data=>{
                console.log("data: ",data);
                this.equips = data;
              }
            );
          }else{
            this.equips=[];
          }
        }else{
          this.organitzador = data['user'][0];
        }

      }
    )
  }

}
