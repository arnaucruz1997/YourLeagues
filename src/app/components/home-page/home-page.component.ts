import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  constructor(public authService:AuthService, public userService:UserService) { 

  }
  async ngOnInit() {
    console.log("inicio home");
    this.userService.getUserData();
  }

}
