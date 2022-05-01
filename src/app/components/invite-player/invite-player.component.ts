import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'invite-player',
  templateUrl: './invite-player.component.html',
  styleUrls: ['./invite-player.component.css']
})
export class InvitePlayerComponent implements OnInit {
  invitePlayer:FormGroup;
  @Input()
  parent: any;
  constructor( 
    public userService:UserService,
    public teamService:TeamService,
    public route:ActivatedRoute,
    public snackbar:MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.invitePlayer = new FormGroup({
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    });
  }
  getErrors (formName:string):string{
    const errors = [];
    if(formName =='email'){
      if(this.invitePlayer.get(formName).hasError('required')){
        errors.push("El camp "+ formName + " està buit.");
      }
      else if(this.invitePlayer.get(formName).hasError('email')){
        errors.push("El camp "+ formName + " ha de tenir un format de l'estil email@algo.com");
      }
    }
    return errors[0];
  }
  invite(invitePlayer:FormGroup) {
    this.userService.findUserByEmail(invitePlayer.get('email').value).subscribe(
      (data) =>{
        let trobat2
        for(let i =0; i<data[0]['equips'].length; i++){
          if(data[0]['equips'][i]==this.parent.teamId){
            trobat2 = true;
          }
        }
        if(trobat2){
          this.snackbar.open('Aquest usuari ja està dins l\' equip','x');
        }else{
          if(data.length==0){
            this.snackbar.open('Aquest usuari no existeix','x');
          }else{
            let trobat = false;
            for(let i =0; i<data[0]['invitacions'].length; i++){
              if(data[0]['invitacions'][i]==this.parent.teamId){
                trobat = true;
              }
            }
            if(!trobat){
              this.teamService.updateTeamInvitacions(this.parent.teamId,data[0]['id']);
              this.teamService.updateUserInvitacions(data[0]['id'],this.parent.teamId);
              this.parent.getInvitations();
              this.snackbar.open('Invitació enviada','x');
            }else{
              this.snackbar.open('Aquest usuari ja esta a la llista d\' invitacions','x');
            }
          }
        }
      },
      (error) => console.log ('error', error)
    );
  }
  deleteInvitation(id:string){
    this.teamService.deleteTeamInvitacio(this.parent.teamId,id).then(
      data =>{console.log("he entrado aqui");
      this.parent.getInvitations();
    }
    );
    this.teamService.deleteUserInvitacio(id,this.parent.teamId).then(
      data =>{console.log("he entrado aqui2");
      this.parent.getInvitations();
    }
    );
  }
}
