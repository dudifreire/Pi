import { ModalComponent } from '../modal/profile-modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Folder2PageRoutingModule } from './folder2-routing.module';
import { Folder2Page } from './folder2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    Folder2PageRoutingModule,
  ],
  declarations: [Folder2Page, ModalComponent],
  entryComponents: [ModalComponent],
})
export class Folder2PageModule {}
