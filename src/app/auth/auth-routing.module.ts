import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { EditarMostrarPerfilComponent } from './pages/editar-mostrar-perfil/editar-mostrar-perfil.component';
import { LoginComponent } from './pages/login/login.component';
import { PassRecoveriComponent } from './pages/pass-recoveri/pass-recoveri.component';
//import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component';
import { RegisterComponent } from './pages/register/register.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'loginUsuario', component: LoginComponent },
      { path: 'registerUsuario', component: RegisterComponent },
      //{ path: 'perfilUsuario', component: PerfilUsuarioComponent },
      { path: 'passRecoveri', component: PassRecoveriComponent },
      //{ path: 'editar-mostrar', component: EditarMostrarPerfilComponent },
      { path: '**', redirectTo: 'loginUsuario' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
