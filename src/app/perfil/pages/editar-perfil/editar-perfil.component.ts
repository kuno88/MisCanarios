import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { perfilInterface } from '../../interfaces/perfil.interface';
import { PerfilSvcService } from '../../services/perfil-svc.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  loading = false;
  perfilForm: FormGroup;
  FireUser?: firebase.User;
  usuario: string | undefined;
  private image: any;
  value: any;
  imagen: any;
  constructor(private fb: FormBuilder, private perfil: PerfilSvcService, private afauth: AngularFireAuth, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras.state!.value;
    this.imagen = this.value.imgPerfil;
    this.perfilForm = this.fb.group({

      nombrePerfil: [this.value.nombre, Validators.required],
      apellidoPerfil: [this.value.apellido, Validators.required],
      direccionPerfil: [this.value.direccion, Validators.required],
      ciudadPerfil: [this.value.ciudad, Validators.required],
      provinciaPerfil: [this.value.provincia, Validators.required],
      codCriadorPerfil: [this.value.codCriador, Validators.required],
    })

  }

  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.FireUser = user;
        this.usuario = this.FireUser.email?.toString();
      }
    })

    if (typeof this.value == 'undefined') {
      this.router.navigate(['/home/inicio'])
    }

    console.log(this.image)
  }


  async actualizarPerfil() {
    try {
      const data: perfilInterface = {
        nombre: this.perfilForm.value.nombrePerfil,
        apellido: this.perfilForm.value.apellidoPerfil,
        direccion: this.perfilForm.value.direccionPerfil,
        ciudad: this.perfilForm.value.ciudadPerfil,
        provincia: this.perfilForm.value.provinciaPerfil,
        codCriador: this.perfilForm.value.codCriadorPerfil,
      }
      if (data) {
        if (typeof this.image != 'undefined') {
          this.imagen = this.image;
          await this.perfil.preAddPerfil(data, this.imagen, this.usuario);
          this.fakeLoading();
          this.registroCorrecto();
        }
      }
    } catch (error) {
      console.log(error);
      this.msjError2();

    }
  }


  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/perfil/mostrarPerfil'])
    }, 1500);
  }



  handleImage(event: any): void {
    this.image = event.target.files[0];
  }


  registroCorrecto() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,

    })

    Toast.fire({
      icon: 'success',
      title: 'Actualizacion exitosa',

    });
  }

  msjError2() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })
    Toast.fire({
      icon: 'error',
      title: 'Hubo un error intentelo de nuevo',

    });

  }
}
