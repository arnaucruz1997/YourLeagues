import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  @Input()
  parent: string;
  uid:string;
  constructor(
    public uploadService:UploadService,
    public authService:AuthService,
    ) { }

  ngOnInit(): void {
    this.uid = this.authService.UserId;
    if(this.parent =="equipo"){
      this.uploadService.croppedImage="../../assets/imgs/team_default.png"
    }
  }

}
