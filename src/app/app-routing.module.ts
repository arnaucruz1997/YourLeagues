import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './components/register/register.component';
import { UserResolver } from './resolvers/user.resolver';

const routes: Routes = [
  { path: '', component:HomePageComponent, resolve: {user : UserResolver}},
  { path: 'login', component:LoginComponent, canActivate:[AuthGuard], },
  { path: 'register', component:RegisterComponent, canActivate:[AuthGuard], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
