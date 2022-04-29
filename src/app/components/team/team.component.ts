import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Equip } from 'src/app/models/equip';
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
  
  constructor(
    public route: ActivatedRoute,
    public teamService: TeamService,
    public userService: UserService,
    ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (data)=>{
        this.teamId=data['id'];
        this.teamService.getTeamById(this.teamId).subscribe(
          data=>{
            this.equip = data[0];
            this.userService.findUserById(this.equip.invitacions).subscribe(
              data => {
                this.invitacions = data;
                console.log("INVITACIONES: ", this.invitacions)
              }
            )
          }
        );
      }
    );
  }
}
