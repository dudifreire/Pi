import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Folder3Page } from './folder3.page';

const routes: Routes = [
  {
    path: '',
    component: Folder3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Folder3PageRoutingModule {}
