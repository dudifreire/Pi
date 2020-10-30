import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Folder3PageRoutingModule } from './folder3-routing.module';

import { Folder3Page } from './folder3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule ,
    Folder3PageRoutingModule,
  ],
  declarations: [Folder3Page]
})
export class Folder3PageModule {}
