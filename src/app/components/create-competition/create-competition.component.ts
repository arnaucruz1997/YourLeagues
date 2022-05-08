import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Competicio } from 'src/app/models/competicio';
import { Organitzador } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';


@Component({
  selector: 'app-create-competition',
  templateUrl: './create-competition.component.html',
  styleUrls: ['./create-competition.component.css']
})
export class CreateCompetitionComponent implements OnInit {
  @ViewChild(UploadImageComponent) uploadComponent!: UploadImageComponent;
  competition:FormGroup;
  esEquipo:string = "equipo";
  usuari:Organitzador;
  constructor(
    public snackbar:MatSnackBar,
    public competitionService:CompetitionService,
    public route:ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.route.data.subscribe(
      data => {
        this.usuari = data['user'][0];
      }
    );
    this.competition = new FormGroup({
      nom: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z.]+$/),Validators.minLength(3),Validators.maxLength(30)])),
      esport: new FormControl('',Validators.required),
      competicio: new FormControl('',Validators.required),
      numEquips: new FormControl('',Validators.required),
      privacitat: new FormControl('',Validators.required),
    })
  }
  getErrors (formName:string):string{
    const errors = [];
    if(formName =='nom'){
      if(this.competition.get(formName).hasError('required')){
        errors.push("El camp "+formName + " està buit.");
      }
      else if(this.competition.get(formName).hasError('pattern')){
        errors.push("El camp "+ formName + " solament pot contenir caràcters alfabètics i \' . \' .");
      }
      else if(this.competition.get(formName).hasError('minlength')){
        errors.push("El camp "+ formName + " ha de tenir més de 3 caràcters.");
      }
      else if(this.competition.get(formName).hasError('maxlength')){
        errors.push("El camp "+ formName + " ha de tenir menys de 30 caràcters.");
      } 
    }
    else if(formName =='esport'){
      if(this.competition.get(formName).hasError('required')){
        errors.push("Selecciona un esport.");
      }
    }
    else if(formName =='competicio'){
      if(this.competition.get(formName).hasError('required')){
        errors.push("Selecciona una competició.");
      }
    }
    else if(formName =='numEquips'){
      if(this.competition.get(formName).hasError('required')){
        errors.push("Selecciona un número d'equips.");
      }
    }
    else if(formName =='privacitat'){
      if(this.competition.get(formName).hasError('required')){
        errors.push("Selecciona la privacitat de la competició.");
      }
    }

    return errors[0];
  }
  submitFormComp(){
    console.log(this.competition);
    this.competitionService.createCompetition(this.usuari, this.uploadComponent.uploadService.croppedFile, this.competition);
  }
}
