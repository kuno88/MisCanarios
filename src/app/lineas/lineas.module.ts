import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LineasRoutingModule } from './lineas-routing.module';
import { AgregarLineaComponent } from './pages/agregar-linea/agregar-linea.component';
import { EditarLineaComponent } from './pages/editar-linea/editar-linea.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarLineaComponent,
    EditarLineaComponent,
  ],
  imports: [
    CommonModule,
    LineasRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class LineasModule { }
