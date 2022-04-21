import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanariosSvcService } from '../../services/canarios-svc.service';
import firebase from 'firebase/compat';
import { CanarioInterface } from '../../interfaces/canariosI';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-listar-canarios',
  templateUrl: './listar-canarios.component.html',
  styleUrls: ['./listar-canarios.component.scss']
})
export class ListarCanariosComponent implements OnInit {
  pageActual: number = 1;
  user: firebase.User | undefined;
  filterValue: any
  listadoCanarios: any
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }
  buscadorCanarios = '';
  
  constructor(private afauth: AngularFireAuth, private canarioSvc: CanariosSvcService, private router: Router) { }



  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.canarioSvc.newGetAllCanarios(this.user.email).subscribe(data => this.listadoCanarios = data)
      }
    })
  }

  mostrarCanario(item: CanarioInterface) {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['canarios/mostrarCanarios'], this.navigationExtras);
  }


}
