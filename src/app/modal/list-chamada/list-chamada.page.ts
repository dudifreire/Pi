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
  @Input() tipoList: string;
  
  setTipoList;

  ChamadaSelecionada;
  constructor(
    private modalCtrl: ModalController,
    private helperS: HelperService) { }

  selectChamada(chamada) {
    this.ChamadaSelecionada = chamada;
    console.log(this.ChamadaSelecionada);
  
  }
  dismiss(aluno?) {
    if (!this.ChamadaSelecionada) {
      this.helperS.toast('Selecione uma Chamada.', 'danger');
      return;
    }

   // console.log(this.instalacaoSelecionada);
    this.modalCtrl.dismiss({
      dismissed: true,
      tipoLista: this.setTipoList,
      ChamadaSelecionada: this.ChamadaSelecionada,
      aluno: this.listChamadas
    });
  }
  cancel(){
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
  setTipoLista(){
    if(this.tipoList === "aluno"){
      this.setTipoList = "aluno"
    }
    if(this.tipoList === "data"){
      this.setTipoList = "data"
    }
    if(this.tipoList === "colaborador"){
      this.setTipoList = "colaborador"
    }

  }

  ngOnInit() {
    console.log(this.listChamadas);
    console.log(this.tipoList);
    this. setTipoLista();
  }

}
