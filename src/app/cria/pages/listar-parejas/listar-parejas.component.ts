import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavigationExtras, Router } from '@angular/router';
import firebase from 'firebase/compat';
import { CanariosSvcService } from 'src/app/canarios/services/canarios-svc.service';
import { ParejaInterface } from '../../interfaces/parejaInterface';
import { CriaSvcService } from '../../services/cria-svc.service';

@Component({
  selector: 'app-listar-parejas',
  templateUrl: './listar-parejas.component.html',
  styleUrls: ['./listar-parejas.component.scss']
})
export class ListarParejasComponent implements OnInit {
  pageActual: number = 1;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  user: firebase.User | undefined;
  listadoParejas: any
  canarioMacho: any
  canarioHembra: any
  constructor(private afauth: AngularFireAuth, private router: Router, private criaSvc: CriaSvcService,
    private canarioSvc: CanariosSvcService) {

  }

  ngOnInit(): void {

    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.criaSvc.getAllCouples(this.user.email).subscribe(data => {
          console.log('Pareja', data)
          this.listadoParejas = data
        })
      }
    })
  }

  editarPareja(item: ParejaInterface) {
    this.navigationExtras.state!.value = item;
    this.router.navigate(['cria/editarPareja'], this.navigationExtras);
  }


}
