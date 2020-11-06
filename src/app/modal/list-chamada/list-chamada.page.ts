import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-list-chamada',
  templateUrl: './list-chamada.page.html',
  styleUrls: ['./list-chamada.page.scss'],
})
export class ListChamadaPage implements OnInit {
  @Input() listChamadas: any[];
  ChamadaSelecionada;
  constructor(
    private modalCtrl: ModalController,
    private helperS: HelperService) { }

  selectChamada(chamada) {
    this.ChamadaSelecionada = chamada;
    console.log(this.ChamadaSelecionada);
  
  }
  dismiss() {
    if (!this.ChamadaSelecionada) {
      this.helperS.toast('Selecione uma Chamada.', 'danger');
      return;
    }

   // console.log(this.instalacaoSelecionada);
    this.modalCtrl.dismiss({
      dismissed: true,
      ChamadaSelecionada: this.ChamadaSelecionada,
    });
  }
  cancel(){
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }

  ngOnInit() {
    console.log(this.listChamadas);
  }

}
