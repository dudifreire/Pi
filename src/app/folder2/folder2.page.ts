import { HelperService } from './../services/helper.service';
import { Component, OnInit, ViewChild,  } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/profile-modal/modal.component';
import { AlertController } from '@ionic/angular';
import { FormControl, FormGroup , Validators , FormBuilder} from '@angular/forms';



@Component({
  selector: 'app-folder2',
  templateUrl: './folder2.page.html',
  styleUrls: ['./folder2.page.scss'],


})
export class Folder2Page implements OnInit {

   public searchTerm: '';
   public chamada: FormGroup
   public chamadaAtiva = false;
   public alunos: any = [];
   public fullList = this.alunos;
   public colaboradorResponsavel: any = [];
   public chamadaList: any = [];

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;



  constructor(

    private menu: MenuController,
    public modalController: ModalController,
    public alertController: AlertController,
    public fb: FormBuilder,
    public helper :HelperService
  ) { }
  
  setChamadaForm(){
    this.chamada = this.fb.group({
      aluno: [null, [Validators.required]],
      data: [null, [Validators.required]],
      professor: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      obs: [null,[Validators.required]]
      
    })
  }
  setChamada(){
    this.setChamadaForm();
    this.chamadaAtiva = true;
    const professores = JSON.parse(localStorage.getItem('cadastroVoluntario'));
    this.colaboradorResponsavel.push(professores) 
    
    
  }
  teste(checked: boolean,value, index: number) {
    console.log(checked)
    console.log(value);
    console.log(index);
    this.alunos[index].presente = value;
    console.log(this.alunos);
    
   }
  fazerChamada(aluno){
    this.chamadaList = [];
    console.log(this.chamadaList);
    this.chamada.patchValue({
      aluno: aluno
    })
    console.log(this.chamada.value);
    this.chamadaList.push(this.chamada.value);

    console.log(this.chamadaList);
    localStorage.setItem('chamadaList',JSON.stringify(this.chamadaList));
    
    
  }
  setListChamada(){
    if(this.chamadaList){
      this.chamadaList = JSON.parse(localStorage.getItem('chamadaList'));
    }
  }
  categoriaChange(categoria){
   this.alunos = JSON.parse(localStorage.getItem('"'+ categoria + '"'))
  }
  submitChamada(){
    localStorage.setItem('chamadaList', JSON.stringify(this.chamada));
    this.helper.toast('Chamada realizada com sucesso!','success');
  }
 // setColaboradorResponsavel(categoria){
 // this.colaboradorResponsavel = JSON.parse(localStorage.getItem('colaborador'+'"'+ categoria + '"'))
//  this.colaboradorResponsavel = JSON.parse(localStorage.getItem('cadastroVoluntario'))
//  console.log(this.colaboradorResponsavel);
//  }
  slices = 12;
  loadData(event) {

    setTimeout(() => {

        this.slices =  20;
        event.target.complete();
        this.slices = 50;
        if (event.target.complete) {
          event.target.disabled = true; }

    }, 1500);

  }

  async showModal(aluno) {
    const modal = await this.modalController.create({
      component: ModalComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        aluno

      }
    });
    return await modal.present();
  }

  removeUser(item){
      const index = this.alunos.indexOf(item);

      if (index > -1){
      this.alunos.splice(index, 1);


    }



  }
   filterItems(searchTerm) {

      return this.alunos.filter(item => {
      return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      item.last_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
  ionViewDidEnter(){
   // this.setListChamada();
  }

  ngOnInit() {
    // tslint:disable-next-line: deprecation
    //  this.loadData(event);Yes
   //  this.setFilteredItems();
    this.menu.enable(true, 'main-menu');
    this.alunos = JSON.parse(localStorage.getItem('cadastroAluno'));
    this.setChamada();
    console.log(this.alunos);
  }
  setFilteredItems() {

    this.alunos = this.filterItems(this.searchTerm);
    if (this.searchTerm === ''){
      this.alunos = this.fullList;
    }
  }





  async presentAlert(item) {

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
          dismissed: true
        });

      }
    }, {
      text: 'No',
      handler: () => {

       console.log('Confirm Ok');
      }
    }

    ]

  });
    await alert.present();


    }
  }
