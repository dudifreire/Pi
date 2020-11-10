import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Cadastros',
      url: 'folder',
      icon: 'document'
    },
    {
      title: 'Chamada',
      url: 'folder2',
      icon: 'people'
    },
    {
      title: 'Relatório',
      url: 'folder3',
      icon: 'document'
    },
    {
      title: 'Sair',
      url: 'login',
      icon: 'log-out'
    },
  ];


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    public toastController: ToastController,
    private menu: MenuController,

  ) {
    this.initializeApp();
  }
  async logOff() {
    const toast = await this.toastController.create({
          message: 'logging off...',
          duration: 2000
        });
    toast.present();
    this.storage.remove('user');
    this.router.navigate(['/login']);
    this.menu.close('main-menu');
    this.menu.enable(false);

      }




initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

ngOnInit() {

    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
}
