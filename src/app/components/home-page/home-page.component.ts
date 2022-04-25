import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  usuari:User;
  constructor(
    public authService:AuthService, 
    public userService:UserService,
    public route:ActivatedRoute,
    ) { 

  }
  async ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.usuari = data['user'][0];
      }
    )
  }

}
