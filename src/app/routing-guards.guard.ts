import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class RoutingGuardsGuard implements CanActivate {
  constructor(
    private storage: Storage,
    private router: Router,
    public toastController: ToastController,

   ) { }


  async canActivate(

    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {
      const token = JSON.parse(localStorage.getItem('user'));
      this.storage.get('user').then((val) => {
        if (val === 'true' ){
        localStorage.setItem('user', 'true');

        }
      });
      if ( token === true) {
        return true;
      }
     /* else{

        const toast = await this.toastController.create({
          message: 'Please log in!',
          duration: 2000
        });
        this.router.navigate(['/login']);
        toast.present();
        return false;
      }
      */


  }

}
