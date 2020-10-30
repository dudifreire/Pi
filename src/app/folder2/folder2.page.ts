import { Component, OnInit, ViewChild,  } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/profile-modal/modal.component';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-folder2',
  templateUrl: './folder2.page.html',
  styleUrls: ['./folder2.page.scss'],


})
export class Folder2Page implements OnInit {

   public searchTerm: '';
   public items: any[] = [{first_name: 'Con', last_name: 'Capineer', endereco: 'Rua Visconde de Nácar, 876 - Centro, Curitiba - PR, 80410-201'},
   {first_name: 'Milicent', last_name: 'Clara', endereco: 'R. Francisco Torres, 830 - Centro, Curitiba - PR, 80060-130'},
   {first_name: 'Errol', last_name: 'Pallent', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Rea', last_name: 'Sanbrooke', endereco: 'R. Des. Westphalen, 56 - Centro, Curitiba - PR, 80010-110'},
   {first_name: 'Charmion', last_name: 'Suddock', endereco: 'R. Pedro Ivo, 204 - Centro, Curitiba - PR, 80010-020'},
   {first_name: 'Maureene', last_name: 'Hobbert', endereco: 'Av. Mal. Floriano Peixoto, 4742 - Hauer, Curitiba - PR, 81270-410'},
   {first_name: 'Jonie', last_name: 'Bragger', endereco: 'Av. Rep. Argentina, 1115 - Água Verde, Curitiba - PR, 80620-010'},
   {first_name: 'Cinda', last_name: 'Basler', endereco: 'R. Mal. Deodoro, 869 - Centro, Curitiba - PR, 80060-010'},
   {first_name: 'Vicki', last_name: 'Goodger', endereco: 'Rua Professora Maria de Assumpção, 215 - Hauer, Curitiba - PR, 81630-040'},
   {first_name: 'Adelaida', last_name: 'Zeal' , endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Morly', last_name: 'Shadfourth', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Clemmie', last_name: 'Hall-Gough', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Clerc', last_name: 'Bainbrigge', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Gloriana', last_name: 'Rizzolo', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Clarke', last_name: 'Glendining', endereco: 'Av. Mal. Floriano Peixoto, 4742 - Hauer, Curitiba - PR, 81270-410'},
   {first_name: 'Courtnay', last_name: 'Labrone', endereco: 'Av. Mal. Floriano Peixoto, 4742 - Hauer, Curitiba - PR, 81270-410'},
   {first_name: 'Elfrieda', last_name: 'Nansom', endereco: 'Av. Mal. Floriano Peixoto, 4742 - Hauer, Curitiba - PR, 81270-410'},
   {first_name: 'Calypso', last_name: 'Gislebert', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Denny', last_name: 'Cordova', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Agosto', last_name: 'Leadbetter', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Callida', last_name: 'Iglesia', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Merl', last_name: 'Pankhurst.', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Saunder', last_name: 'Bellino', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Nev', last_name: 'Pourveer', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Barton', last_name: 'McGurk', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Nappy', last_name: 'MacCollom', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Silvester', last_name: 'Kirsche', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Gideon', last_name: 'Mucklo', endereco: 'R. Francisco Torres, 830 - Centro, Curitiba - PR, 80060-130'},
   {first_name: 'Debby', last_name: 'Pavey', endereco: 'R. Francisco Torres, 830 - Centro, Curitiba - PR, 80060-130'},
   {first_name: 'Matthew', last_name: 'Knutsen', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Diahann', last_name: 'McCardle', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Gelya', last_name: 'Batter', endereco: 'R. Francisco Torres, 830 - Centro, Curitiba - PR, 80060-130'},
   {first_name: 'Millard', last_name: 'McCrie', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Cy', last_name: 'Suart', endereco: 'R. Francisco Torres, 830 - Centro, Curitiba - PR, 80060-130'},
   {first_name: 'Dorothy', last_name: 'Gershom', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Emilie', last_name: 'Sauvage', endereco: 'R. Francisco Torres, 830 - Centro, Curitiba - PR, 80060-130'},
   {first_name: 'Marthe', last_name: 'Maureen', endereco: 'Av. Iraí, 611a - Weissópolis, Pinhais - PR, 83321-000'},
   {first_name: 'Currie', last_name: 'Bogies', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Morse', last_name: 'Sterricker', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Fionna', last_name: 'Ludmann', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Claude', last_name: 'Nears', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Caesar', last_name: 'Cutler', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Barrett', last_name: 'Venables', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Mellicent', last_name: 'Skynner', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Dorthea', last_name: 'Guwer', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Ric', last_name: 'Collcott', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Netti', last_name: 'Orred', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Barnie', last_name: 'Hebdon', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'},
   {first_name: 'Galen', last_name: 'Lammert', endereco: 'Av. Pres. Kennedy, 757 - Rebouças, Curitiba - PR, 80220-200'},
   {first_name: 'Rosetta', last_name: 'Philot', endereco: 'Rua Orestes Camilli, 91 - Prado Velho, Curitiba - PR, 80215-000'}];





   public alunos: any = [];
   public fullList = this.items;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;



  constructor(

    private menu: MenuController,
    public modalController: ModalController,
    public alertController: AlertController
  ) { }



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
      const index = this.items.indexOf(item);

      if (index > -1){
      this.items.splice(index, 1);


    }



  }
   filterItems(searchTerm) {

      return this.items.filter(item => {
      return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
      item.last_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }


  ngOnInit() {
    // tslint:disable-next-line: deprecation
    //  this.loadData(event);Yes
   //  this.setFilteredItems();
    this.menu.enable(true, 'main-menu');
    this.alunos = JSON.parse(localStorage.getItem('cadastroAluno'));
  }
  setFilteredItems() {

    this.items = this.filterItems(this.searchTerm);
    if (this.searchTerm === ''){
      this.items = this.fullList;
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
