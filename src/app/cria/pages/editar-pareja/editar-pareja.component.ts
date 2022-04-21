import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pareja',
  templateUrl: './editar-pareja.component.html',
  styleUrls: ['./editar-pareja.component.scss']
})
export class EditarParejaComponent implements OnInit {
  loading = false;
  pareja: any
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.pareja = navigation?.extras.state!.value;
    if (typeof this.pareja == 'undefined') {
      this.router.navigate(['/cria/listarParejas'])
    }
    console.log(this.pareja)
   }

  ngOnInit(): void {
  }

  editarPareja() { }
}
