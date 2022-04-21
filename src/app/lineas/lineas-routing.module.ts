import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarLineaComponent } from './pages/agregar-linea/agregar-linea.component';
import { EditarLineaComponent } from './pages/editar-linea/editar-linea.component';

const routes: Routes = [
  {
    path: '',
    children:[
      { path:'agregarLineas', component:AgregarLineaComponent },
      { path:'editarLineas', component:EditarLineaComponent },
      { path: '**', redirectTo:'agregarLineas' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineasRoutingModule { }
