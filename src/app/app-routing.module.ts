import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'perfil', loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'canarios', loadChildren: () => import('./canarios/canarios.module').then(m => m.CanariosModule) },
  { path: 'lineas', loadChildren: () => import('./lineas/lineas.module').then(m => m.LineasModule) },
  { path: 'cria', loadChildren: () => import('./cria/cria.module').then(m => m.CriaModule) },

  { path: '**', redirectTo: 'home/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
