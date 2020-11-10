import { HelperService } from './../services/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/profile-modal/modal.component';
import { AlertController } from '@ionic/angular';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-folder2',
  templateUrl: './folder2.page.html',
  styleUrls: ['./folder2.page.scss'],
})
export class Folder2Page implements OnInit {
  constructor(
    private menu: MenuController,
    public modalController: ModalController,
    public alertController: AlertController,
    public fb: FormBuilder,
    public helper: HelperService
  ) {}

  public searchTerm: '';
  public chamada: FormGroup;
  public chamadaAtiva = false;
  public alunos: any = [];
  public fullList = this.alunos;
  public colaboradorResponsavel: any = [];
  public chamadaList: any = [];
  public formAlunos;
  public uncheckAll = false;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  // setColaboradorResponsavel(categoria){
  // this.colaboradorResponsavel = JSON.parse(localStorage.getItem('colaborador'+'"'+ categoria + '"'))
  //  this.colaboradorResponsavel = JSON.parse(localStorage.getItem('cadastroVoluntario'))
  //  console.log(this.colaboradorResponsavel);
  //  }
  slices = 12;

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    //  this.loadData(event);Yes
    //  this.setFilteredItems();
    this.menu.enable(true, 'main-menu');
    this.alunos = JSON.parse(localStorage.getItem('cadastroAluno'));
    this.setChamada();
    console.log(this.alunos);
    this.setListChamada();
  }

  setChamadaForm() {
    this.chamada = this.fb.group({
      aluno: [null],
      data: [null, [Validators.required]],
      professor: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      obs: [null, [Validators.required]],
    });
  }
  setChamada() {
    this.setChamadaForm();
    this.chamadaAtiva = true;
    const professores = JSON.parse(localStorage.getItem('cadastroVoluntario'));
    if (professores) {
      this.colaboradorResponsavel.push(professores);
    }
  }
  setPresente(value, index: number) {
    this.alunos[index].presente = value;
    console.log(this.alunos[index].presente);

  }
  setListChamada() {
    this.chamadaList = JSON.parse(localStorage.getItem('chamadaList'));
    if (!this.chamadaList) {
      this.chamadaList = [];
    }
  }

  setBuscarAlunos() {
    this.alunos = this.BuscarAlunos(this.searchTerm);
    if (this.searchTerm === '') {
      this.alunos = this.fullList;
    }
  }
  fazerChamada(aluno) {
    console.log(this.chamadaList);
    const arrayAlunosChamada = [];
    // tslint:disable-next-line: forin
    for (const index in aluno) {
      const formAluno = {
        Aluno: aluno[index].nome,
        presente: aluno[index].presente,
      };
      arrayAlunosChamada.push(formAluno);
      console.log(formAluno);
    }
    console.log(arrayAlunosChamada);
    this.chamada.patchValue({
      aluno: arrayAlunosChamada,
    });
    console.log(this.chamada.value);
    console.log(this.chamadaList);
    this.chamadaList.push(this.chamada.value);
    localStorage.setItem('chamadaList', JSON.stringify(this.chamadaList));
    console.log(this.chamadaList);
  }

  submitChamada(aluno) {
    this.fazerChamada(aluno);
    this.chamada.reset();
    this.uncheckAll = false;
    this.helper.toast('Chamada realizada com sucesso!', 'success');
  }
  categoriaChange(categoria) {
    this.alunos = JSON.parse(localStorage.getItem('"' + categoria + '"'));
  }
  loadData(event) {
    setTimeout(() => {
      this.slices = 20;
      event.target.complete();
      this.slices = 50;
      if (event.target.complete) {
        event.target.disabled = true;
      }
    }, 1500);
  }

  async showModal(aluno) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'modalAluno',
      componentProps: {
        aluno,
      },
    });
    return await modal.present();
  }

  removeUser(item) {
    const index = this.alunos.indexOf(item);

    if (index > -1) {
      this.alunos.splice(index, 1);
    }
  }
  BuscarAlunos(searchTerm) {
    return this.alunos.filter((item) => {
      return item.nome.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  ionViewDidEnter() {
    // this.setListChamada();
  }

  async ConfirmarDelete(item) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: 'Do you realy want to delete this user?',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'secondary',
          handler: () => {
            this.removeUser(item);
            console.log('Confirm Cancel');
            this.modalController.dismiss({
              dismissed: true,
            });
          },
        },
        {
          text: 'No',
          handler: () => {
            console.log('Confirm Ok');
          },
        },
      ],
    });
    await alert.present();
  }
}
