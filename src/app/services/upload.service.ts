import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/compat/storage'
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Equip } from '../models/equip';
import { IgxExcelStyleColumnOperationsTemplateDirective } from 'igniteui-angular';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  selectedImage:File = null;
  imgurl:string = "../../assets/imgs/maleuser.jpg";
  uploadurl:string="maleuser.jpg";
  downloadURL:string;
  imgsEquips:{ id: string, downloadURL: string }[];

  constructor(
    public storage: AngularFireStorage,
    public datepipe: DatePipe,
  ) {
    this.imgsEquips = [];
   }

  onFileSelected(event:any){
    let currentDateTime =this.datepipe.transform((new Date), 'MM_dd_yyyy_h_mm_ss');

    this.uploadurl =(currentDateTime+"_"+event.target.files[0].name)
    this.imgurl = event.target.files[0];

    console.log(this.uploadurl);
    const file = (event.target as HTMLInputElement).files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.imgurl = reader.result as string;
    }
    reader.readAsDataURL(file)
    this.selectedImage = file;
    console.log("updateonselected:","uploadurl: ",this.uploadurl," file:",file);
  }
  uploadImage(imgurl:string, file:File){
    if(file != null){
      console.log("uploading:","imgurl: ",imgurl," file:",file);
      this.storage.upload(imgurl,file)
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

}
