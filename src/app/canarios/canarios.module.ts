import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanariosRoutingModule } from './canarios-routing.module';
import { AgregarCanariosComponent } from './pages/agregar-canarios/agregar-canarios.component';
import { EditarCanariosComponent } from './pages/editar-canarios/editar-canarios.component';
import { ListarCanariosComponent } from './pages/listar-canarios/listar-canarios.component';
import { MostrarCanariosComponent } from './pages/mostrar-canarios/mostrar-canarios.component';
//modulos
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BuscadorPipe } from '../shared/buscador.pipe';


@NgModule({
  declarations: [
    AgregarCanariosComponent,
    EditarCanariosComponent,
    ListarCanariosComponent,
    MostrarCanariosComponent,
    BuscadorPipe
  ],
  imports: [
    CommonModule,
    CanariosRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    
  ]
})
export class CanariosModule { }
