import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthSvcService } from './auth/services/auth-svc.service';
import firebase from 'firebase/compat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Mis Canarios-m';
  FireUser: firebase.User | undefined;
  boton: string = 'Ingresar';
  constructor(private auth: AuthSvcService, private afauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.FireUser = user;
        this.boton='Bienvenido';
      }
    })
  }
  async onLogout() {
    try {
      await this.auth.logout();
      window.location.reload();
    } catch (error) {
      console.log(error)
    }

  }



}


