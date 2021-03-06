import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper, MatStepperNext } from '@angular/material/stepper';
import { Jugador } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { UploadImageComponent } from '../upload-image/upload-image.component';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(UploadImageComponent) uploadComponent!: UploadImageComponent;
  ficheroVacio: File = null;
  user: FormGroup;
  jugador: FormGroup;
  org: FormGroup;
 
  constructor(public authService:AuthService, private snackBar:MatSnackBar,) { }

  ngOnInit(): void {
    this.user = new FormGroup({
      nom: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z]+$/),Validators.minLength(3),Validators.maxLength(30)])),
      cognoms: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z]+$/),,Validators.minLength(3),Validators.maxLength(75)])),
      email: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(8)])),
      confirmPassword: new FormControl('',Validators.compose([Validators.required])),
      dni: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKEtrwagmyfpdxbnjzsqvhlcke]$/)])),
      date: new FormControl('',Validators.compose([Validators.required])),
      sexe: new FormControl('',Validators.required),
      localitat: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z]+$/),,Validators.minLength(3),Validators.maxLength(50)])),
      rol: new FormControl('',Validators.required),
    },{
      validators: this.controlValuesAreEqual('password','confirmPassword')
    }
    );

    this.jugador = new FormGroup({
      altura: new FormControl('',Validators.compose([Validators.required,Validators.max(250),Validators.min(50)])),
      pes: new FormControl('',Validators.compose([Validators.required,Validators.max(250),Validators.min(50)])),
    });

    this.org = new FormGroup({
      orgName: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^[a-z A-Z]+$/),Validators.minLength(3),Validators.maxLength(30)])),
      orgEmail: new FormControl('',Validators.compose([Validators.required,Validators.email])),
      orgTelefon: new FormControl('',Validators.compose([Validators.required,Validators.pattern(/^^[0-9]{9}/)])),
      orgDesc: new FormControl('',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-z A-Z0-9]+$/),
          Validators.maxLength(150)])),
    });
  }
  getImageUrl(){
    return this.uploadComponent.uploadService.uploadurl;
  }
  getFile(){
    return this.uploadComponent.uploadService.selectedImage;
  }
  private controlValuesAreEqual(password:string,confirmPassword:string): ValidatorFn{
    return (control:AbstractControl): ValidationErrors | null => {
      const formGroup = control as FormGroup
      const valuePassword = formGroup.get(password)?.value;
      const valueConfirmPassword = formGroup.get(confirmPassword)?.value;

      if (valuePassword==valueConfirmPassword){
        return null;
      }else{
        const err = {valuesDoNotMatch: true};
        this.user.get('confirmPassword').setErrors(err);
        return err;

      }
    }
  }
  goForwardStep(stepper:MatStepper,step:string) {
    if(step =='first'){
      if(this.firstStepValid()){
        stepper.next();
      }else{
        this.snackBar.open('Les dades no s??n correctes','x');
      }
    }else if(step =='second'){
      if(this.secondStepValid()){
        stepper.next();
      }else{
        this.snackBar.open('Les dades no s??n correctes','x');
      }
    }else if(step =='jugador'){
      if(this.firstStepValid() && this.secondStepValid() && this.jugador.valid){
        if(this.uploadComponent.uploadService.imageChangedEvent != ''){
          this.authService.register(this.user,this.jugador,this.org, this.uploadComponent.uploadService.croppedFile);
        }else{
          this.authService.register(this.user,this.jugador,this.org, null);
        }
      }else{
        this.snackBar.open('Les dades no s??n correctes','x');
      }
    }else if(step == 'organitzador'){
      if(this.firstStepValid() && this.secondStepValid() && this.org.valid){
        this.authService.register(this.user,this.jugador,this.org,null);
      }else{
        this.snackBar.open('Les dades no s??n correctes','x');
      }
    }
  }
  firstStepValid():boolean{
    if(this.user.get('nom').errors != null){
      return false;
    }
    else if(this.user.get('cognoms').errors != null){
      return false;
    }
    else if(this.user.get('email').errors != null){
      return false;
    }
    else if(this.user.get('password').errors != null){
      return false;
    }
    else if(this.user.get('confirmPassword').errors != null){
      return false;
    }
    return true;
  }
  secondStepValid():boolean{
    if(this.user.get('dni').errors != null){
      return false;
    }
    else if(this.user.get('date').errors != null){
      return false;
    }
    else if(this.user.get('sexe').errors != null){
      return false;
    }
    else if(this.user.get('localitat').errors != null){
      return false;
    }
    else if(this.user.get('rol').errors != null){
      return false;
    }
    return true;
  }
  getErrors (formName:string,formGroup:string):string{
    const errors = [];
    if(formGroup == 'user'){
      if(formName =='nom'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.user.get(formName).hasError('pattern')){
          errors.push("El camp "+ formName + " solament pot contenir car??cters alfab??tics.");
        }
        else if(this.user.get(formName).hasError('minlength')){
          errors.push("El camp "+ formName + " ha de tenir m??s de 3 car??cters.");
        }
        else if(this.user.get(formName).hasError('maxlength')){
          errors.push("El camp "+ formName + " ha de tenir menys de 30 car??cters.");
        } 
      }
      else if(formName =='cognoms'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.user.get(formName).hasError('pattern')){
          errors.push("El camp "+ formName + " solament pot contenir car??cters alfab??tics.");
        }
        else if(this.user.get(formName).hasError('minlength')){
          errors.push("El camp "+ formName + " ha de tenir m??s de 3 car??cters.");
        }
        else if(this.user.get(formName).hasError('maxlength')){
          errors.push("El camp "+ formName + " ha de tenir menys de 75 car??cters.");
        } 
      }
      else if(formName =='email'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.user.get(formName).hasError('email')){
          errors.push("El camp "+ formName + " no t?? un format d'email.");
        }
      }
      else if(formName =='password'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.user.get(formName).hasError('minlength')){
          errors.push("El camp "+ formName + " ha de tenir un minim de 8 car??cters.");
        }
      }
      else if(formName =='confirmPassword'){
        if(this.user.get(formName).hasError('valuesDoNotMatch')){
          errors.push("Les contrasenyes no coincideixen.");
        }
      }
      else if(formName =='dni'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp DNI est?? buit.");
        }
        else if(this.user.get(formName).hasError('pattern')){
          errors.push("El camp DNI ha de tenir el format: 12345678L.");
        }
      }
      else if(formName =='date'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp Data de naixament est?? buit.");
        }
        else if(this.user.get(formName).hasError('pattern')){
          errors.push("El camp DNI ha de tenir el format: 12345678L.");
        }
      }
      else if(formName =='sexe'){
        if(this.user.get(formName).hasError('required')){
          errors.push("Has de seleccionar una opci??");
        }
      }
      else if(formName =='localitat'){
        if(this.user.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.user.get(formName).hasError('pattern')){
          errors.push("El camp "+ formName + " solament pot contenir car??cters alfab??tics.");
        }
        else if(this.user.get(formName).hasError('minlength')){
          errors.push("El camp "+ formName + " ha de tenir m??s de 3 car??cters.");
        }
        else if(this.user.get(formName).hasError('maxlength')){
          errors.push("El camp "+ formName + " ha de tenir menys de 50 car??cters.");
        } 
      }
      else if(formName =='rol'){
        if(this.user.get(formName).hasError('required')){
          errors.push("Has de seleccionar una opci??");
        }
      }
      if(this.user.get(formName).hasError('required')){
        errors.push("El camp "+formName + " est?? buit.");
      }else if(this.user.get(formName).hasError('pattern')){
        errors.push("El camp "+ formName + " t?? un format incorrecte.");
      }
    }else if(formGroup =='jugador'){
      if(formName =='altura'){
        if(this.jugador.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.jugador.get(formName).hasError('max')){
          errors.push("El camp "+ formName + " ha de ser menor que 250.");
        }
        else if(this.jugador.get(formName).hasError('min')){
          errors.push("El camp "+ formName + " ha de ser major de 50.");
        }
      }else if(formName =='pes'){
        if(this.jugador.get(formName).hasError('required')){
          errors.push("El camp "+formName + " est?? buit.");
        }
        else if(this.jugador.get(formName).hasError('max')){
          errors.push("El camp "+ formName + " ha de ser menor de 250.");
        }
        else if(this.jugador.get(formName).hasError('min')){
          errors.push("El camp "+ formName + " ha de ser major de 50.");
        }
      }
    }else{
      if(formName =='orgName'){
        if(this.org.get(formName).hasError('required')){
          errors.push("El nom de la organitzaci?? est?? buit.");
        }
        else if(this.org.get(formName).hasError('maxlength')){
          errors.push("El nom de la organitzaci?? ha de tenir menys de 30 car??cters.");
        }
        else if(this.org.get(formName).hasError('minlength')){
          errors.push("El nom de la organitzaci?? ha de tenir com a m??nim 3 car??cters.");
        }
        else if(this.org.get(formName).hasError('pattern')){
          errors.push("El nom de la organitzaci?? solament pot contenir car??cters alfab??tics.");
        }
      }else if(formName =='orgEmail'){
        if(this.org.get(formName).hasError('required')){
          errors.push("El camp email de la organitzaci?? est?? buit.");
        }
        else if(this.org.get(formName).hasError('email')){
          errors.push("El camp email ha de tenir un format tipus email: nom@exemple.com");
        }
      }else if(formName =='orgTelefon'){
        if(this.org.get(formName).hasError('required')){
          errors.push("El camp telefon de la organitzaci?? est?? buit.");
        }
        else if(this.org.get(formName).hasError('pattern')){
          errors.push("El camp telefon ha de tenir un format tipus: 987654321");
        }
      }else if(formName =='orgDesc'){
        if(this.org.get(formName).hasError('required')){
          errors.push("El camp descripci?? de la organitzaci?? est?? buit.");
        }
        else if(this.org.get(formName).hasError('pattern')){
          errors.push("El camp descripci?? de la organitzaci?? solament accepta n??meros i lletres");
        }
        else if(this.org.get(formName).hasError('maxlength')){
          errors.push("El camp descripci?? de la organitzaci?? solament accepta un m??xim de 150 car??cters");
        }
      }
    }
    return errors[0];
  }
}
