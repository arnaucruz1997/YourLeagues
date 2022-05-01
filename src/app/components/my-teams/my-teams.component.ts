import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Jugador, User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { mdiAlphaCCircle } from '@mdi/js';
import { Equip } from 'src/app/models/equip';
import { TeamService } from 'src/app/services/team.service';
import { Observable, of, take } from 'rxjs';
import { UploadService } from 'src/app/services/upload.service';
import { Console } from 'console';
import { MatDialog } from '@angular/material/dialog'
import { AcceptTeamComponent } from '../dialogs/accept-team/accept-team.component';

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.css']
})
export class MyTeamsComponent implements OnInit {
  usuari:Jugador;
  equips:Equip[];
  equipsInvitacions:Equip[];

  constructor(
    public authService:AuthService, 
    public userService:UserService,
    public route:ActivatedRoute,
    public teamService:TeamService,
    public uploadService:UploadService,
    public dialog:MatDialog,
  ) { }

  async ngOnInit() {

    this.route.data.subscribe(
      data => {
        this.usuari = data['user'][0];
        this.teamService.getUserTeams(this.usuari.equips).subscribe(
          data => {
            this.equips = data;
            this.uploadService.getEquipsImg(this.equips);
          }
        );
    
        this.userService.getUserInvitations(this.usuari.invitacions).subscribe(
          data => {
            this.equipsInvitacions = data;
            console.log(this.equipsInvitacions);
          }
        )
        
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

  openDialog(equipid:string){

    this.teamService.getTeamById(equipid).pipe(take(1)).subscribe(
      data => {
        const listaDorsales = this.getDorsales(data[0].jugadors);
        console.log(listaDorsales);
        this.dialog.open(AcceptTeamComponent, {
          width:'400px',
          height:'300px',
          data:{
            idteam: equipid,
            idusuari: this.usuari.id,
            nomEquip:data[0].nom,
            listadorsales:listaDorsales
          }
        });
      }
    )
  }
  getDorsales(jugadors:any): number[]{
    let lista =[]
    for (let jugador of jugadors){
        lista.push(jugador.dorsal);
    }
    return lista;
  }
}
