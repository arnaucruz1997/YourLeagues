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

const routes: Routes = [
  { path: '', component:HomePageComponent, resolve: {user : UserResolver}},
  { path: 'login', component:LoginComponent, canActivate:[AuthGuard], },
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuard], },
  { path: 'my-teams', component:MyTeamsComponent, resolve: {user : UserResolver}},
  { path: 'create-team', component:CreateTeamComponent, resolve: {user : UserResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
