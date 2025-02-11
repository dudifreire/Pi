import { ColaboradorServiceService } from './../services/colaborador-service.service';
import { ChamadaService } from './../services/chamada.service';
import { AlunoService } from './../services/aluno.service';
import { HelperService } from './../services/helper.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/profile-modal/modal.component';
import { AlertController } from '@ionic/angular';
import { format } from 'date-fns'
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
    public helper: HelperService,
    private alunoService: AlunoService,
    private chamadaService: ChamadaService,
    private colaboradorS: ColaboradorServiceService
  ) {}

  public searchTerm: '';
  public chamada: FormGroup;
  public chamadaAtiva = false;
  public alunos: any = [];
  public fullList : any = [];
  public colaboradorResponsavel: any = [];
  public chamadaList: any = [];
  public formAlunos;
  public showAlunosList = false;
  public uncheckAll = false;
  public data = format(new Date(), 'dd/MM/yyyy hh:mm')
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
   slices = 12;

  ngOnInit() {

    this.menu.enable(true, 'main-menu');
    this.setChamada();
    this.setListChamada();
    this.setAlunos()
  }
  setAlunos(){
   // this.alunos = JSON.parse(localStorage.getItem('cadastroAluno'));
   
   this.alunoService.getAlunos().subscribe((data => {{
    this.alunos = data._embedded.alunoes
    if(!this.alunos){
      this.alunos = [];
    }
    else{
      this.fullList = this.alunos
      for(let index of this.alunos){
        index.presente = 'Não'
      }
    }
    console.log(this.alunos);
    localStorage.setItem('cadastroAluno', JSON.stringify(this.alunos));
    
  }}))   
    
   
  }

  setChamadaForm() {
    this.chamada = this.fb.group({
      aluno: [null],
      data: [this.data, [Validators.required]],
      professor: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      obs: [null, [Validators.required]],
    });
  }
  setChamada() {
    this.setChamadaForm();
    
    this.colaboradorS.testeApi().subscribe((
      colaboradores => {
        console.log(colaboradores._embedded.colaboradors);
        this.colaboradorResponsavel = colaboradores._embedded.colaboradors
      }
    ))
  }
  setPresente(value, index: number) {
    if(value=true){
      this.alunos[index].presente = 'Sim';
    }
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
    const arrayAlunosChamada = [];
    // tslint:disable-next-line: forin
    for (const index in aluno) {
      const formAluno = {
        id: aluno[index].id,
        nome: aluno[index].nome,
        presente: aluno[index].presente,
        categoria: aluno[index].categoria
      };
      arrayAlunosChamada.push(formAluno);
    }
    this.chamada.patchValue({
      aluno: arrayAlunosChamada,
    });
    
    this.chamadaList.push(this.chamada.value);
    localStorage.setItem('chamadaList', JSON.stringify(this.chamadaList));
    console.log(this.chamada.value); 
    this.chamadaService.submitChamada(this.chamada.value).subscribe((data =>
      {console.log(data)
        this.chamada.reset();
        this.uncheckAll = false;
        this.helper.toast('Chamada realizada com sucesso!', 'success');
      
      }))
  }

  submitChamada(aluno) {
    this.fazerChamada(aluno);
    
    
  }
  categoriaChange(categoria) {
    this.alunos = this.fullList;
    this.chamadaAtiva = true;
    let alunosCategoriaFilter = [];
    for(let i of this.alunos){
      if(i.categoria === categoria){ 
        alunosCategoriaFilter.push(i);
      }
    }
    this.alunos = alunosCategoriaFilter
    this.showAlunosList = true;
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
            this.modalController.dismiss({
              dismissed: true,
            });
          },
        },
        {
          text: 'No',
          handler: () => {
          },
        },
      ],
    });
    await alert.present();
  }
}
