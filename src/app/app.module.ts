import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatToolbarModule, } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatStepperModule} from '@angular/material/stepper';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StepperPositionDirective } from './utils/stepper-position.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from  '@angular/material/select';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs'
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule} from '@angular/material/dialog';
import { UploadImageComponent } from './components/upload-image/upload-image.component'
import { DatePipe } from '@angular/common';
import { UserResolver } from './resolvers/user.resolver';
import { MyTeamsComponent } from './components/my-teams/my-teams.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TeamComponent } from './components/team/team.component';
import { InvitePlayerComponent } from './components/invite-player/invite-player.component';
import { ListPlayersComponent } from './components/list-players/list-players.component';
import { AcceptTeamComponent } from './components/dialogs/accept-team/accept-team.component';
import { ImageCropperModule } from 'ngx-image-cropper';






@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomePageComponent,
    LoginComponent,
    RegisterComponent,
    StepperPositionDirective,
    UploadImageComponent,
    MyTeamsComponent,
    CreateTeamComponent,
    TeamComponent,
    InvitePlayerComponent,
    ListPlayersComponent,
    AcceptTeamComponent,

  ],
  entryComponents:[AcceptTeamComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    MatSnackBarModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,
    ImageCropperModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
  ],
  providers: [AuthService, DatePipe, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
