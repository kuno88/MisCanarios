import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CanarioInterface } from '../../interfaces/canariosI';
import { CanariosSvcService } from '../../services/canarios-svc.service';
@Component({
  selector: 'app-mostrar-canarios',
  templateUrl: './mostrar-canarios.component.html',
  styleUrls: ['./mostrar-canarios.component.scss']
})
export class MostrarCanariosComponent implements OnInit {
  loading = false;
  canario: any;
  navigationExtras: NavigationExtras = {
    state: {
      value: null
    }
  }

  constructor(private fb: FormBuilder, private router: Router, private canariosSvc: CanariosSvcService) {
    const navigation = this.router.getCurrentNavigation();
    this.canario = navigation?.extras.state!.value;
    if (typeof this.canario == 'undefined') {
      this.router.navigate(['/canarios/listarCanarios'])
    }
    console.log(this.canario)
  }

  ngOnInit(): void {

  }


  editarCanario() {
    this.navigationExtras.state!.value = this.canario;
    this.router.navigate(['canarios/editarCanarios'],this.navigationExtras);
  }

  async eliminarCanario() {
    Swal.fire({
      title: 'Desea eliminar el registro?',
      text: 'Una vez eliminado, el registro no podra ser recuperado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then(async willDelete => {
      if (willDelete) {
        //this._cana.eliminarCanario(id).then(() => {
        await this.canariosSvc.deleteCanario(this.canario).then(() => {
          Swal.fire({ title: 'Eliminado', text: 'Su registro ha sido eliminado!', icon: "success" });
          this.router.navigate(['canarios/listarCanarios'])
        }).catch((error) => {
          Swal.fire({ title: 'Error', text: 'Ha ocurrido un eror durante la eliminacion!', icon: "error" });
        });
      }
    })
  }
}
