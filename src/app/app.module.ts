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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatRadioModule} from '@angular/material/radio';
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
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CompetitionComponent } from './components/competition/competition.component';
import { ListTeamsComponent } from './components/list-teams/list-teams.component';
import { JoinCompetitionComponent } from './components/dialogs/join-competition/join-competition.component';
import { TeamCompetitionsListComponent } from './components/team-competitions-list/team-competitions-list.component';
import { ClassificacioComponent } from './components/classificacio/classificacio.component';
import { EstadistiquesComponent } from './components/estadistiques/estadistiques.component';
import { PartitsComponent } from './components/partits/partits.component';
import { PartitComponent } from './components/partit/partit.component';
import { XatComponent } from './components/xat/xat.component';
import { EstadistiquesPartitComponent } from './components/estadistiques-partit/estadistiques-partit.component';
import { ResumPartitComponent } from './components/resum-partit/resum-partit.component';
import { EnterResultComponent } from './components/dialogs/enter-result/enter-result.component';
import { UpdateDatePartitComponent } from './components/dialogs/update-date-partit/update-date-partit.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { QuiSomComponent } from './components/qui-som/qui-som.component';
import { ContacteComponent } from './components/contacte/contacte.component';







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
    CreateCompetitionComponent,
    CompetitionsComponent,
    CompetitionComponent,
    ListTeamsComponent,
    JoinCompetitionComponent,
    TeamCompetitionsListComponent,
    ClassificacioComponent,
    EstadistiquesComponent,
    PartitsComponent,
    PartitComponent,
    XatComponent,
    EstadistiquesPartitComponent,
    ResumPartitComponent,
    EnterResultComponent,
    UpdateDatePartitComponent,
    QuiSomComponent,
    ContacteComponent,

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
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
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
  providers: [AuthService, DatePipe, UserResolver,{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
