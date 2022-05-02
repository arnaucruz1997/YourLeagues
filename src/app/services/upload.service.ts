import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Equip } from '../models/equip';
import { IgxExcelStyleColumnOperationsTemplateDirective } from 'igniteui-angular';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  selectedImage:File = null;
  imgurl:string = "../../assets/imgs/maleuser.jpg";
  uploadurl:string="maleuser.jpg";
  downloadURL:string="https://firebasestorage.googleapis.com/v0/b/yourleagues-46263.appspot.com/o/maleuser.jpg?alt=media&token=7c38589a-3de9-41c6-9b87-af70ef5c9d1b";
  imgsEquips:{ id: string, downloadURL: string }[];

  croppedImage: any = '../../assets/imgs/maleuser.jpg';
  croppedFile: any;
  imageChangedEvent: any = '';
  constructor(
    public storage: AngularFireStorage,
    public datepipe: DatePipe,
  ) {
    this.imgsEquips = [];
   }
  uploadImage(uid:string, croppedFile:any){
    if(this.imageChangedEvent != ""){
      let currentDateTime = this.datepipe.transform((new Date), 'MM_dd_yyyy_h_mm_ss');
      this.uploadurl = (currentDateTime+"_" + uid);
      this.storage.upload(this.uploadurl,this.croppedFile).then(rst => {
        rst.ref.getDownloadURL().then(url => {
          this.downloadURL = url;
          console.log("downloadURL: ",this.downloadURL);
        })
      })
    }
  }
  getImage(url:string){
    this.storage.ref(url).getDownloadURL().subscribe(
      (data) =>{
        this.downloadURL = data;
      }
    );
  }

  getEquipsImg(equips:Equip[]){
    for(let i = 0; equips.length; i++){
      let imgURL:string;
      console.log("TEAAAMS: ",equips[i]['id']);
      this.storage.ref(equips[i]['img']).getDownloadURL().subscribe(
        (data) =>{
          imgURL = data;          
          this.imgsEquips.push({id:equips[i]['id'] , downloadURL:imgURL});
        }
      );
    }
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
 }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.croppedFile = base64ToFile(this.croppedImage);
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

}
