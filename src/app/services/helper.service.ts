import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  isLoading = false;
  constructor(private toastCtrl: ToastController, private loadingController: LoadingController, private alertController: AlertController) {}
  toast(message, color = 'success') {
    this.toastCtrl.create({
      color,
      message,
      duration: 5000,
      buttons: [{
        text: 'OK',
        role: 'cancel'
      }]
    }).then(v => v.present());
  }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Aguarde...',
      backdropDismiss: true
    }).then((l) => {
      l.present().then(() => {
        if (!this.isLoading) {
          l.dismiss().then(() => {});
        }
      });
    });

    // const { role, data } = await loading.onDidDismiss();
  }

  async dismissLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async showAlertMessage(header: string, message: string) {
    const alert = await this.alertController.create({
      cssClass: 'alert-message',
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  makeRandom() {
    let text = '';
    const lengthOfCode = 4;
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}
