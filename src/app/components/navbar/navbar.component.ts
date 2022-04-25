import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  usuari:User;
  constructor(
    public router: Router, 
    public authService: AuthService, 
    public userService:UserService,
    public uploadService:UploadService,
    public route:ActivatedRoute,
    ) { 
    }

    async ngOnInit() {
      this.route.data.subscribe(
        data => {
          this.usuari = data['user'][0];
        }
      );
      //await this.uploadService.getProfileImage(this.userService.usuari.img);
  }
}
