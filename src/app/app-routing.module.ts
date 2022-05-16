import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserResolver } from './resolvers/user.resolver';
import { MyTeamsComponent } from './components/my-teams/my-teams.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { TeamComponent } from './components/team/team.component';
import { CreateCompetitionComponent } from './components/create-competition/create-competition.component';
import { CompetitionsComponent } from './components/competitions/competitions.component';
import { CompetitionComponent } from './components/competition/competition.component';

const routes: Routes = [
  { path: '', component:HomePageComponent, resolve: {user : UserResolver}},
  { path: 'login', component:LoginComponent, canActivate:[AuthGuard], },
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuard], },
  { path: 'my-teams', component:MyTeamsComponent, resolve: {user : UserResolver}},
  { path: 'create-team', component:CreateTeamComponent, resolve: {user : UserResolver}},
  { path: 'my-teams/:id', component:TeamComponent, resolve:{user: UserResolver}},
  { path: 'create-competition', component:CreateCompetitionComponent, resolve:{user: UserResolver}},
  { path: 'competitions', component:CompetitionsComponent, resolve:{user: UserResolver}},
  { path: 'competition/:id', component:CompetitionComponent, resolve:{user: UserResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
