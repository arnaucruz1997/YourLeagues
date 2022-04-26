import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jugador, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { mdiAlphaCCircle } from '@mdi/js';
import { Equip } from 'src/app/models/equip';
import { TeamService } from 'src/app/services/team.service';
import { Observable } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { Console } from 'console';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  usuari:Jugador;
  equips:Equip[];

  constructor(
    public authService:AuthService, 
    public userService:UserService,
    public route:ActivatedRoute,
    public teamService:TeamService,
    public uploadService:UploadService,

  ) { }

  async ngOnInit() {

    this.route.data.subscribe(
      data => {
        this.usuari = data['user'][0];
        console.log(this.usuari);
      }
    );

    this.teamService.getUserTeams(this.usuari.equips).subscribe(
      data => {
        console.log("equipos: ",data);
        this.equips = data;
        this.uploadService.getEquipsImg(this.equips);
      }
    );
    

    console.log("equips:",this.uploadService.imgsEquips);
  }
  getImgById(id:string){
    let downloadURL = '../../../assets/imgs/maleuser.jpg';
    let longitud = this.uploadService.imgsEquips.length-2
    for(let i = 0; (longitud); i++){
      console.log("valor i ",i, this.uploadService.imgsEquips[i]);
      if (this.uploadService.imgsEquips[i].id == id ){
        downloadURL = this.uploadService.imgsEquips[i]['downloadURL'];
        console.log(i,": ",downloadURL);
      }

    }
    return downloadURL;
  }
}
