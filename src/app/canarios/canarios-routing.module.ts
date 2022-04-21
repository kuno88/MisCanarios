import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarCanariosComponent } from './pages/agregar-canarios/agregar-canarios.component';
import { EditarCanariosComponent } from './pages/editar-canarios/editar-canarios.component';
import { ListarCanariosComponent } from './pages/listar-canarios/listar-canarios.component';
import { MostrarCanariosComponent } from './pages/mostrar-canarios/mostrar-canarios.component';

const routes: Routes = [
  {
    path: '',
    children:[
      { path:'agregarCanarios', component:AgregarCanariosComponent },
      { path:'editarCanarios', component:EditarCanariosComponent },
      { path:'listarCanarios', component:ListarCanariosComponent },
      { path:'mostrarCanarios', component:MostrarCanariosComponent },
      { path: '**', redirectTo:'listarCanarios' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanariosRoutingModule { }
