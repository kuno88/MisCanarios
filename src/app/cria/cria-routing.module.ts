import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarParejaComponent } from './pages/agregar-pareja/agregar-pareja.component';
import { EditarParejaComponent } from './pages/editar-pareja/editar-pareja.component';
import { ListarParejasComponent } from './pages/listar-parejas/listar-parejas.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'listarParejas', component: ListarParejasComponent },
      { path: 'agregarPareja', component: AgregarParejaComponent },
      { path: 'editarPareja', component: EditarParejaComponent },
      { path: '**', redirectTo: 'listarParejas' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriaRoutingModule { }
