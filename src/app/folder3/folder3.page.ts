import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';

const { Filesystem } = Plugins;


const b64toBlob = (base64, contentType, sliceSize = 512) => {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};



@Component({ 
selector: 'app-folder3',
templateUrl: './folder3.page.html',
styleUrls: ['./folder3.page.scss'], 
})

export class Folder3Page implements OnInit {

  blobPdf;
  holerites: any = [];
  

  constructor(
    private http: HttpClient,
    private menuController: MenuController,
    private inAppBrowser: InAppBrowser,
    
  ) { }

  ngOnInit() {
  }

  setUserHolerite() {
    
    // const url = 'https://api.github.com/repos/Suporte-esal/teste/contents/'+ this.user + '?ref=main';
    const url = 'https://api.github.com/repos/Suporte-esal/teste/contents/09591821956?ref=main';
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token 057b3dadf8e6e7b259e811604a58d10f6b60df67'
    });
    this.http.get(url, { headers }).subscribe((res: any) => {
      console.log(res);
      this.holerites = res;
    });
  }

  testeGit(index) {
    
    const url = 'https://api.github.com/repos/Suporte-esal/teste/contents/09591821956/' + index + '/' + index + '.pdf?ref=main';
    const headers = new HttpHeaders({
      Accept: 'application/vnd.github.v3+json',
      Authorization: 'token 057b3dadf8e6e7b259e811604a58d10f6b60df67'
    });


    this.http.get(url, { headers }).subscribe((res: any) => {
      console.log(res);
      // this.downLoadUrl = 'data:application/pdf;base64,' + res.content;
      // this.inAppBrowser.create(this.downLoadUrl, '_blank');
      // const contentType = 'data:application/pdf';
      //const base64Pdf = res.content;
      //const blob = b64toBlob(pdf);
      //const blobUrl = URL.createObjectURL(blob);
      // this.blobPdf = blobUrl;
      // this.inAppBrowser.create(blobUrl);
      // window.open(blobUrl);
      const pdf = 'data:application/pdf;base64,' + res.content;
      this.fileWrite(pdf, index);




      //     const url = 'https://api.github.com/repos/Suporte-esal/teste/contents/09591821956/outubro/outubro.pdf?ref=main'
      // this.pdf = res;
      // const linkSource = 'data:application/pdf;base64,' + this.pdf.content;
      // const downloadLink = document.createElement("a");
      // const fileName = "sample.pdf";
      // downloadLink.href = linkSource;
      // downloadLink.download = fileName;
      // downloadLink.click();
      // https://forum.ionicframework.com/t/capacitor-writefile-saving-pdf-file-is-in-invalid-format/158633/5

    });

  }

  ionViewWillEnter() {
    this.menuController.enable(true);
    this.setUserHolerite();
  }


  
  async fileWrite(pdf , index) {
    try {
      const result = await Filesystem.writeFile({
        path: index,
        data: pdf,
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('Wrote file', result);
    } catch(e) {
      console.error('Unable to write file', e);
    }
  }
  
  async readFilePath(blob) {
    // Here's an example of reading a file with a full file path. Use this to
    // read binary data (base64 encoded) from plugins that return File URIs, such as
    // the Camera.
    try {
      const path = 'Documento.docx';
      let data = await Filesystem.readFile({
        path,
        directory: FilesystemDirectory.Documents
      });
      console.log(data);
    }
    finally {
      console.log("teste");
    }
  }

}