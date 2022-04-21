import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { PerfilRoutingModule } from './perfil-routing.module';
import { AgregarPerfilComponent } from './pages/agregar-perfil/agregar-perfil.component';
import { MostrarPerfilComponent } from './pages/mostrar-perfil/mostrar-perfil.component';
import { EditarPerfilComponent } from './pages/editar-perfil/editar-perfil.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarPerfilComponent,
    MostrarPerfilComponent,
    EditarPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class PerfilModule { }
