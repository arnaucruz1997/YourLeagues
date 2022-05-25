import { Component, Input, OnInit } from '@angular/core';
import { Missatge } from 'src/app/models/missatge';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'xat',
  templateUrl: './xat.component.html',
  styleUrls: ['./xat.component.css']
})
export class XatComponent implements OnInit {
  @Input()
  parent: any;
  capitaLocal: string;
  capitaVis: string;
  organitzador: string;
  missatges: Missatge[];
  constructor(
    public xatService: ChatService,
  ) { 
    this.missatges = [
      {
        id:'string',
        xatId:'ZNiEh9xVawtu0jUBQy16',
        enviador:'VITxllIHSyZdtCUdcRithxojeyK2',
        nomEnviador:'Halaand',
        missatge:'Hola',
        hora: null,
      },
      {
        id:'string',
        xatId:'ZNiEh9xVawtu0jUBQy16',
        enviador:'VITxllIHSyZdtCUdcRithxojeyK2',
        nomEnviador:'Halaand',
        missatge:'Que talQue talQue talQue talQue talQue talQue talQue talQue talQue tal',
        hora: null,
      },
      {
        id:'string',
        xatId:'ZNiEh9xVawtu0jUBQy16',
        nomEnviador:'Halaand',
        enviador:'V0M2ls7QO9QCjES8KI2aBQtgdYJ3',
        missatge:'Jugamos mañana?',
        hora: null,
      },
      {
        id:'string',
        xatId:'ZNiEh9xVawtu0jUBQy16',
        enviador:'VITxllIHSyZdtCUdcRithxojeyK2',
        nomEnviador:'Halaand',
        missatge:'te va bien?',
        hora: null,
      }
    ]
  }

  
  ngOnInit() {
    console.log(this.parent.xat)
    let date = new Date();
    console.log(date);
  }
  sendMessage(msg:string){
    if(msg!=""){  
      if(this.parent.uid == this.parent.capiLocal.id){
        this.xatService.sendMissatge(this.parent.xat.id, this.parent.uid, this.parent.capiLocal.nom, msg)
      }else if(this.parent.uid == this.parent.capiVis.id){
        this.xatService.sendMissatge(this.parent.xat.id, this.parent.uid, this.parent.capiVis.nom, msg);
      }else if(this.parent.uid == this.parent.org.id){
        console.log(this.parent.xat.id, this.parent.uid, this.parent.org.orgName, msg);
        this.xatService.sendMissatge(this.parent.xat.id, this.parent.uid, this.parent.org.orgName, msg);
      }
      (document.getElementById("msg") as HTMLInputElement).value = "";
    }
  }
}
