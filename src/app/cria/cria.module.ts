import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CriaRoutingModule } from './cria-routing.module';
import { ListarParejasComponent } from './pages/listar-parejas/listar-parejas.component';
import { AgregarParejaComponent } from './pages/agregar-pareja/agregar-pareja.component';
import { EditarParejaComponent } from './pages/editar-pareja/editar-pareja.component';


@NgModule({
  declarations: [
    ListarParejasComponent,
    AgregarParejaComponent,
    EditarParejaComponent
  ],
  imports: [
    CommonModule,
    CriaRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CriaModule { }
