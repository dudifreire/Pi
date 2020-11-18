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
    this.listChamadas = JSON.parse(localStorage.getItem('chamadaList'));
    if (!this.listChamadas) {
      this.listChamadas = [];
    }
    console.log(this.listChamadas);

  }
  setAlunosList() {
    this.alunosList = JSON.parse(localStorage.getItem('cadastroAluno'));
    if (!this.alunosList) {
      this.alunosList = [];
    }

  }
  setFiltroAluno(aluno) {

    const orderListAluno = this.listChamadas.map(v => ({ alunos: v.aluno, data: v.data }));
    const todasAsPresenças = [];
    let totalChamadasAtivas;
    const totalFaltas = [];
    const totalPresencas = [];
    for (const i of orderListAluno) {
      for (const j of i.alunos) {
        if (j.Aluno === aluno) {
          j.data = i.data;
          todasAsPresenças.push(j);
        }
        if (j.Aluno === aluno && j.presente === 'Sim') {

          totalPresencas.push(j);
        }
        if (j.Aluno === aluno && j.presente === 'Não' || j.Aluno === aluno && j.presente === false ||
          j.Aluno === aluno && j.presente === null) {
          totalFaltas.push(j);

        }
      }
    }
    totalChamadasAtivas = todasAsPresenças.length;

    this.totalFaltas = totalFaltas;
    this.todasAsPresenças = todasAsPresenças;
    this.totalPresencas = totalPresencas;
    this.FiltroAlunoObject = {
      TotalDeFaltas:  totalFaltas.length,
      totalDeChamadas: totalChamadasAtivas,
      totalDePresencas: totalPresencas.length,


    };
    console.log( this.totalFaltas);
    console.log(this.todasAsPresenças);
    console.log(this.totalPresencas);
    console.log(this.FiltroAlunoObject);


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
    console.log(data);
    console.log(data.tipoLista);
    console.log(data.aluno);

    if (data.tipoLista === 'data') {
      this.relatorio.patchValue({
        aluno: data.ChamadaSelecionada.aluno,
        data: data.ChamadaSelecionada.data,
        categoria: data.ChamadaSelecionada.categoria,
        obs: data.ChamadaSelecionada.obs,
        professor: data.ChamadaSelecionada.professor
      });

      this.orderList = data.ChamadaSelecionada.aluno;
      console.log(this.orderList);
      this.showChamadaList = true;
      this.showChamadaAlunoList = false;


    }

    if (data.tipoLista === 'aluno') {


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
    this.listChamadas = JSON.parse(localStorage.getItem('chamadaList'));
    console.log(tipo);
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
        this.createListChamadaModal(this.listChamadas, this.TipoList);
      } else {
        this.helper.toast('Você ainda não possuí um historico', 'warning');
      }



    }

    // console.log(this.historicos);

  }
  
  createPdf(){
    const doc = new jsPDF('portrait', 'px', 'a4') as jsPDFWithPlugin;
    const test = document.getElementById("totalPresencasHTML");

    console.log(item);
    var columns = [];
    var rows = ["Aluno", "Presente","Data"];
    columns.push(rows);
    const all = this.totalPresencas.concat(this.totalFaltas);
    console.log(all)
       for(var item of all){
        doc.autoTable({
          head: columns,
          body: [
            [item.Aluno, item.presente, item.data],
          ],
        })
         } 

   
    doc.setFontSize(14);

    doc.save('Test.pdf');
  }










  //     const url = 'https://api.github.com/repos/Suporte-esal/teste/contents/09591821956/outubro/outubro.pdf?ref=main'
  // this.pdf = res;
  // const linkSource = 'data:application/pdf;base64,' + this.pdf.content;
  // const downloadLink = document.createElement("a");
  // const fileName = "sample.pdf";
  // downloadLink.href = linkSource;
  // downloadLink.download = fileName;
  // downloadLink.click();
  // https://forum.ionicframework.com/t/capacitor-writefile-saving-pdf-file-is-in-invalid-format/158633/5






  async fileWrite(pdf, index) {
    try {
      const result = await Filesystem.writeFile({
        path: index,
        data: pdf,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      });
      console.log('Wrote file', result);
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

  async readFilePath(blob) {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    try {
      const path = 'Documento.docx';
      const data = await Filesystem.readFile({
        path,
        directory: FilesystemDirectory.Documents
      });
      console.log(data);
    }
    finally {
      console.log('teste');
    }
  }

}
