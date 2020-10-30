import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CadastroVoluntarioComponent } from '../modal/cadastro-voluntario/cadastro-voluntario.component';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/profile-modal/modal.component';
import { AlertController } from '@ionic/angular';




@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user;

  constructor(
    private storage: Storage,
    private menu: MenuController,
    private router: Router,
    public toastController: ToastController,
    private modalController: ModalController,
    private alertCtrl: AlertController
   ) { }

  async LogIn(){
    if (this.user === 'admin'){
    this.storage.set('user', 'true');
    this.storage.get('user').then((val) => {
      console.log('value?', val);
      this.router.navigate(['/home']);
    });
    this.router.navigate(['/folder']);

  }
  else {
    const toast = await this.toastController.create({
      message: 'please enter a valid user!',
      duration: 2000
    });
    toast.present();
  }

}
  delete(){
  this.storage.remove('user');
  this.storage.get('user').then((val) => {
    console.log('value?', val);
  });
  }
  async register(){
    const modal = await this.modalController.create({
        component: CadastroVoluntarioComponent,
        cssClass: 'voluntarioModal',
        componentProps: {
          
  
        }
      });
    return await modal.present();
    

  }

  ngOnInit() {
    this.menu.enable(false);
 
  
  }

}
