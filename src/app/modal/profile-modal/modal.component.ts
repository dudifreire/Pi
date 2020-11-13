import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() aluno: any;
  @Input() paginaAtual: any;
  
  constructor(public modalController: ModalController, private http: HttpClient, private inAppBrowser: InAppBrowser) { }

  dismiss() {
      this.modalController.dismiss({
      dismissed: true
    });
  }

  setToObject(){
    var result = {}
    if(this.paginaAtual==="folder3"){
      this.aluno.forEach((prop,index)=>result[index] = prop);
    }
    console.log(result);
  }

  ngOnInit() {
  console.log(this.aluno);
  console.log(this.paginaAtual);
  this.setToObject();
  
}
}