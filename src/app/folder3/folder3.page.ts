import { AlunoService } from './../services/aluno.service';
import { ModalComponent } from './../modal/profile-modal/modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from './../services/helper.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ListChamadaPage } from '../modal/list-chamada/list-chamada.page';
import { jsPDF } from 'jspdf'
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import { ChamadaService } from '../services/chamada.service';

interface jsPDFWithPlugin extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}






const { Filesystem } = Plugins;


//declare const require: any;
//const jsPDF = require('jspdf');
//require('jspdf-autotable');

@Component({
  selector: 'app-folder3',
  templateUrl: './folder3.page.html',
  styleUrls: ['./folder3.page.scss'],
})

export class Folder3Page implements OnInit {

  listChamadas: any = [];
  showChamadaList = false;
  showChamadaAlunoList = false;
  relatorio: FormGroup;
  orderList = [];
  TipoList;
  alunoModalData = [];
  alunosList = [];
  totalFaltas = [];
  totalPresencas = [];
  FiltroAlunoObject = {
    TotalDeFaltas:  null,
    totalDeChamadas: null,
    totalDePresencas: null

  };
  todasAsPresenças = [];
  public nomeAluno = '';


  constructor(
    private modalCtrl: ModalController,
    private helper: HelperService,
    private fb: FormBuilder,
    private modalController: ModalController,
    private ChamadaS: ChamadaService,
    private alunoS: AlunoService


  ) { }

  ngOnInit() {
    this.setListChamada();
    this.setRelatorioForm();
    this.setAlunosList();
  }

  listarChamada(chamadaSelecionada) {
    console.log(chamadaSelecionada);

  }





  setListChamada() {
    this.ChamadaS.getChamadas().subscribe((chamadas => {
      this.listChamadas = chamadas;
      console.log(chamadas);
    }))
    if (!this.listChamadas) {
      this.listChamadas = [];
    }

  }
  setAlunosList() {
  this.alunoS.getAlunos().subscribe((data => {{
    this.alunosList = data._embedded.alunoes
    if(!this.alunosList){
      this.alunosList = [];
    }
    localStorage.setItem('cadastroAluno', JSON.stringify(this.alunosList));
    
  }}))  

  }
  setFiltroAluno(aluno) {
    const orderListAluno = this.listChamadas.map(v => ({ alunos: v.listChamada, data: v.data }));

    const todasAsPresenças = [];
    let totalChamadasAtivas;
    const totalFaltas = [];
    const totalPresencas = [];
    for (const i of orderListAluno) {
      for (const j of i.alunos) {
        if (j.alunoNome === aluno) {
          j.data = i.data;
          todasAsPresenças.push(j);
        }
        if (j.alunoNome === aluno && j.alunoPresente === 'Sim') {

          totalPresencas.push(j);
        }
        if (j.alunoNome === aluno && j.alunoPresente === 'Não' || j.alunoNome === aluno && j.alunoPresente === false ||
          j.alunoNome === aluno && j.alunoPresente === null) {
          totalFaltas.push(j);

        }
      }
    }
    totalChamadasAtivas = todasAsPresenças.length;

    this.totalFaltas = totalFaltas;
    console.log(this.totalFaltas);
    this.todasAsPresenças = todasAsPresenças;
    console.log(this.todasAsPresenças);
    this.totalPresencas = totalPresencas;
    this.FiltroAlunoObject = {
      TotalDeFaltas:  totalFaltas.length,
      totalDeChamadas: totalChamadasAtivas,
      totalDePresencas: totalPresencas.length,


    };


  }



  async createListChamadaModal(listChamadas, tipoList) {
    const modal = await this.modalCtrl.create({
      component: ListChamadaPage,
      backdropDismiss: false,
      cssClass: 'chamadaModal',
      componentProps: {
        listChamadas,
        tipoList

      },
    });
    if (listChamadas) {
      this.getDadosModalChamada(modal, listChamadas);
    }
    return await modal.present();
  }

  async getDadosModalChamada(modal: HTMLIonModalElement, listChamadas) {
    const { data } = await modal.onWillDismiss();
   if (data.tipoLista === 'data') {
      console.log(data);
      this.relatorio.patchValue({
        aluno: data.ChamadaSelecionada.listChamada,
        data: data.ChamadaSelecionada.data,
        categoria: data.ChamadaSelecionada.categoria,
        obs: data.ChamadaSelecionada.obs,
        professor: data.ChamadaSelecionada.professor
      });
      console.log(this.relatorio.value)
      this.orderList = data.ChamadaSelecionada.listChamada;
      console.log(this.orderList);
      this.showChamadaList = true;
      this.showChamadaAlunoList = false;


    }

    if (data.tipoLista === 'aluno' || data.tipoLista === 'categoria' ) {


      this.setFiltroAluno(data.ChamadaSelecionada);
      this.nomeAluno = data.ChamadaSelecionada;
      this.showChamadaList = false;
      this.showChamadaAlunoList = true;
      for (const i of data.aluno){
        if (i.nome === data.ChamadaSelecionada ) {
             this.alunoModalData.push(i);
        }
      }

    }

  }
  async ShowModalAluno() {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'modalAluno',
      componentProps: {
        aluno: this.alunoModalData,
        paginaAtual: 'folder3'
      },
    });
    return await modal.present();
  }

  setRelatorioForm() {
    this.relatorio = this.fb.group({
      aluno: [''],
      data: ['', [Validators.required]],
      professor: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
      obs: ['', [Validators.required]],
    });
  }

  openChamadaList(tipo) {

    if (!tipo){
      this.helper.toast('Selecione um tipo de ordenação', 'warning');
    }
    if (tipo === 'aluno') {
      this.TipoList = 'aluno';
      if (this.listChamadas) {
        this.createListChamadaModal(this.alunosList, this.TipoList);
      } else {
        this.helper.toast('Você ainda não possuí um historico', 'warning');
      }
    }
    if (tipo === 'data') {
      this.TipoList = 'data';
      if (this.listChamadas) {
        console.log(this.listChamadas);
        this.createListChamadaModal(this.listChamadas, this.TipoList);
      } else {
        this.helper.toast('Você ainda não possuí um historico', 'warning');
      }
    }

    if (tipo === 'categoria') {
      this.TipoList = 'categoria';
      if (this.listChamadas) {
        this.createListChamadaModal(this.alunosList, this.TipoList);
      } else {
        this.helper.toast('Você ainda não possuí um historico', 'warning');
      }
    }

  

  }
  
  createPdf(){
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    if(this.TipoList = 'data'){

      var columns2 = [];
    var rows2 = ["ID:","Aluno:","Categoria:","Data:", "Presente:"];
    columns2.push(rows2);
    const all2 = this.orderList;
    console.log(all2)
       for(var item of all2){
         console.log(item);
        doc.autoTable({
          head: columns2,
          body: [
            [item.alunoId, item.alunoNome, item.alunoCategoria, item.timestamp, item.alunoPresente],
          ],
        })
         } 

   
    doc.setFontSize(14);

    doc.save('Test.pdf');
    
    }
    else{
      var columns = [];
      var rows = ["ID:","Aluno:","Categoria:","Data:", "Presente:"];
      columns.push(rows);
      const all = this.totalPresencas.concat(this.totalFaltas);
      console.log(all)
         for(var item of all){
           console.log(item);
          doc.autoTable({
            head: columns,
            body: [
              [item.alunoId, item.alunoNome, item.alunoCategoria, item.timestamp, item.alunoPresente],
            ],
          })
           } 
  
     
      doc.setFontSize(14);
  
      doc.save('Test.pdf');
    }




    }
    

}
