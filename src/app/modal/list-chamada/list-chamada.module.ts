import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListChamadaPageRoutingModule } from './list-chamada-routing.module';

import { ListChamadaPage } from './list-chamada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListChamadaPageRoutingModule
  ],
  declarations: [ListChamadaPage]
})
export class ListChamadaPageModule {}
