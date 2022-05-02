import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Equip } from 'src/app/models/equip';
import { AuthService } from 'src/app/services/auth.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teamId:string;
  equip:any;
  invitacions:Observable<any[]>;
  jugadors:Observable<any[]>;
  uid:string;
  constructor(
    public route: ActivatedRoute,
    public teamService: TeamService,
    public userService: UserService,
    public authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.getInvitations();
    this.uid = this.authService.UserId;
  }
  getInvitations(){
    this.route.params.subscribe(
      (data)=>{
        this.teamId=data['id'];
        this.teamService.getTeamById(this.teamId).subscribe(
          data=>{
            this.equip = data[0];
            this.userService.findUserById(this.equip.invitacions).subscribe(
              data => {
                this.invitacions = data;
                console.log("INVITACIONES: ", this.invitacions);
              }
            )
            let listIds = this.equip.jugadors.map((a:any) => a.id);
            this.userService.findUserById(listIds).subscribe(
              data => {
                this.jugadors = data;
                console.log(this.jugadors);
              }
            )
          }
        );
      }
    );
  }
  getDorsal(idUser:string){
    for(let jugador of this.equip.jugadors){
      if (jugador.id == idUser) {
        return jugador.dorsal;
      }
    }
    return false;
  }
}
