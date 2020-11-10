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


  constructor(
    private http: HttpClient,
    private menuController: MenuController,
    private inAppBrowser: InAppBrowser,
    private modalCtrl: ModalController,
    private helper: HelperService

  ) { }

  ngOnInit() {
    this.setListChamada();
  }
  listarChamada(chamadaSelecionada){
    console.log(chamadaSelecionada);

  }
  setListChamada() {
    this.listChamadas = JSON.parse(localStorage.getItem('chamadaList'));
    if (!this.listChamadas){
      this.listChamadas = [];
    }
  }
  async createListChamadaModal(listChamadas) {
    const modal = await this.modalCtrl.create({
      component: ListChamadaPage,
      backdropDismiss: false,
      cssClass: 'chamadaModal',
      componentProps: {
        listChamadas,

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
  }

  openChamadaList(tipo) {
    console.log(tipo);
    this.listChamadas = JSON.parse(localStorage.getItem('chamadaList'));
   // console.log(this.historicos);
    if (this.listChamadas) {
      this.createListChamadaModal(this.listChamadas);
    } else {
      this.helper.toast('Você ainda não possuí um historico', 'warning');
    }
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






  async fileWrite(pdf , index) {
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
