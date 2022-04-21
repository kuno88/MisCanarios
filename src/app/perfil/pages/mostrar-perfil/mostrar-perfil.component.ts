import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationExtras, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { PerfilSvcService } from '../../services/perfil-svc.service';

@Component({
  selector: 'app-mostrar-perfil',
  templateUrl: './mostrar-perfil.component.html',
  styleUrls: ['./mostrar-perfil.component.scss']
})
export class MostrarPerfilComponent implements OnInit {
  loading = false;
  FireUser?: firebase.User;
  usuario: string | undefined;
  array: any;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(private peSvc: PerfilSvcService, private afauth: AngularFireAuth, private router: Router) {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.FireUser = user;
      }
    })
  }

  ngOnInit(): void {
    this.peSvc.getPerfil(this.FireUser?.email).subscribe(
      contenido => {
        this.array = contenido;
        //console.log(contenido)
      }
    )
  }

  editarPerfil(item: any) {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['perfil/editarPerfil'],this.navigationExtras);
    //console.log('actualizado')
  }

  

}
