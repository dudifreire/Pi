import { RoutingGuardsGuard } from './routing-guards.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
    canActivate: [RoutingGuardsGuard]
  },
  {

    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    canActivate: [RoutingGuardsGuard],
    path: 'folder',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    canActivate: [RoutingGuardsGuard],
    path: 'folder2',
    loadChildren: () => import('./folder2/folder2.module').then( m => m.Folder2PageModule)
  },
  {
    canActivate: [RoutingGuardsGuard],
    path: 'folder3',
    loadChildren: () => import('./folder3/folder3.module').then( m => m.Folder3PageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
