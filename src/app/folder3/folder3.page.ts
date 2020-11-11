import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HelperService } from './../services/helper.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController, ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { ListChamadaPage } from '../modal/list-chamada/list-chamada.page';


const { Filesystem } = Plugins;



@Component({
  selector: 'app-folder3',
  templateUrl: './folder3.page.html',
  styleUrls: ['./folder3.page.scss'],
})

export class Folder3Page implements OnInit {

  listChamadas: any = [];
  showChamadaList = false;
  relatorio: FormGroup;
  orderList = [];
  TipoList;
  alunosList = [];



  constructor(
    private http: HttpClient,
    private menuController: MenuController,
    private inAppBrowser: InAppBrowser,
    private modalCtrl: ModalController,
    private helper: HelperService,
    private fb: FormBuilder

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
    var orderListAluno = this.listChamadas.map(v => ({ alunos: v.aluno, data: v.data }));
    var todasAsPresenças = [];
    for (let i of orderListAluno) {
      for (let j of i.alunos) {
        if (j.Aluno === aluno) {
          j.data = i.data
          todasAsPresenças.push(j);
        }


      }

    }
    console.log(todasAsPresenças);

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
    if (data.tipoLista === "data") {
      this.showChamadaList = true;
      this.relatorio.patchValue({
        aluno: data.ChamadaSelecionada.aluno,
        data: data.ChamadaSelecionada.data,
        categoria: data.ChamadaSelecionada.categoria,
        obs: data.ChamadaSelecionada.obs,
        professor: data.ChamadaSelecionada.professor
      });
      this.orderList = data.ChamadaSelecionada.aluno;
      console.log(this.orderList);


    }

    if (data.tipoLista="aluno"){
      this.setFiltroAluno(data.ChamadaSelecionada);
    }

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
    if (tipo === "aluno") {
      this.TipoList = "aluno";
      if (this.listChamadas) {
        this.createListChamadaModal(this.alunosList, this.TipoList);
      } else {
        this.helper.toast('Você ainda não possuí um historico', 'warning');
      }
    }
    if (tipo === "data") {
      this.TipoList = "data";
      if (this.listChamadas) {
        this.createListChamadaModal(this.listChamadas, this.TipoList);
      } else {
        this.helper.toast('Você ainda não possuí um historico', 'warning');
      }



    }

    // console.log(this.historicos);

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
