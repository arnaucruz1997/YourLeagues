import { Component, OnInit } from '@angular/core';
import { UploadService } from 'src/app/services/upload.service';


@Component({
  selector: 'upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {
  constructor(public uploadService:UploadService) { }

  ngOnInit(): void {
  }

}
