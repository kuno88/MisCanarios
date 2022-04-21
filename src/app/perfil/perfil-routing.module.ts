import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPerfilComponent } from './pages/agregar-perfil/agregar-perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { MostrarPerfilComponent } from './pages/mostrar-perfil/mostrar-perfil.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'agregarPerfil', component: AgregarPerfilComponent },
      { path: 'mostrarPerfil', component: MostrarPerfilComponent },
      { path: 'editarPerfil', component: EditarPerfilComponent },
      { path: '**', redirectTo: 'mostrarPerfil' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
