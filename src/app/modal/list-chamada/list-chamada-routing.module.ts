import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListChamadaPage } from './list-chamada.page';

const routes: Routes = [
  {
    path: '',
    component: ListChamadaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListChamadaPageRoutingModule {}
