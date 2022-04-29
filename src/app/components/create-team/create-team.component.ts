import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TeamService } from 'src/app/services/team.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  @ViewChild(UploadImageComponent) uploadComponent!: UploadImageComponent;
  team:FormGroup;
  constructor(
    public snackbar:MatSnackBar,
    public teamService:TeamService,
  ) { }

  ngOnInit(): void {
    this.team = new FormGroup({
      nom: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z.]+$/),Validators.minLength(3),Validators.maxLength(30)])),
      abreviacio: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[A-Z]+$/),,Validators.minLength(3),Validators.maxLength(3)])),
      dorsal: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[0-9]+$/),,Validators.min(1),Validators.max(99)])),
    });
  }
  getErrors (formName:string):string{
    const errors = [];
    if(formName =='nom'){
      if(this.team.get(formName).hasError('required')){
        errors.push("El camp "+formName + " està buit.");
      }
      else if(this.team.get(formName).hasError('pattern')){
        errors.push("El camp "+ formName + " solament pot contenir caràcters alfabètics i \' . \' .");
      }
      else if(this.team.get(formName).hasError('minlength')){
        errors.push("El camp "+ formName + " ha de tenir més de 3 caràcters.");
      }
      else if(this.team.get(formName).hasError('maxlength')){
        errors.push("El camp "+ formName + " ha de tenir menys de 30 caràcters.");
      } 
    }
    else if(formName =='abreviacio'){
      if(this.team.get(formName).hasError('required')){
        errors.push("El camp abreaviació està buit.");
      }
      else if(this.team.get(formName).hasError('pattern')){
        errors.push("El camp abreviació solament pot contenir caràcters alfabètics i en majúscula.");
      }
      else if(this.team.get(formName).hasError('minlength')){
        errors.push("El camp abreviació ha de tenir 3 caràcters.");
      }
      else if(this.team.get(formName).hasError('maxlength')){
        errors.push("El camp abreviació ha de tenir 3 caràcters.");
      } 
    }
    else if(formName =='dorsal'){
      if(this.team.get(formName).hasError('required')){
        errors.push("El camp dorsal està buit.");
      }
      else if(this.team.get(formName).hasError('pattern')){
        errors.push("El camp dorsal solament pot contenir números.");
      }
      else if(this.team.get(formName).hasError('min')){
        errors.push("El número de dorsal mínim es el 1.");
      }
      else if(this.team.get(formName).hasError('max')){
        errors.push("El número de dorsal màxim es el 99");
      } 
    }
    console.log("errores:",errors);
    return errors[0];
  }

  submitFormTeam(){
    if(this.team.valid){
      this.teamService.createTeam(this.team,this.getImageUrl(),this.getFile());
    }else{
      this.snackbar.open('Les dades no són correctes','x');
    }
  }
  getImageUrl(){
    return this.uploadComponent.uploadService.uploadurl;
  }
  getFile(){
    return this.uploadComponent.uploadService.selectedImage;
  }
}
