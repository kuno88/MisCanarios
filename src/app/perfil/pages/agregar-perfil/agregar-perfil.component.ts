import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import firebase from 'firebase/compat';
import { perfilInterface } from '../../interfaces/perfil.interface';
import { PerfilSvcService } from '../../services/perfil-svc.service';

@Component({
  selector: 'app-agregar-perfil',
  templateUrl: './agregar-perfil.component.html',
  styleUrls: ['./agregar-perfil.component.scss']
})
export class AgregarPerfilComponent implements OnInit {
  private image: any;
  loading = false;
  perfilForm: FormGroup;
  FireUser?: firebase.User;
  usuario: string | undefined;
  
  constructor(private fb: FormBuilder, private perfil: PerfilSvcService, private afauth: AngularFireAuth, private router: Router) { 
    this.perfilForm = this.fb.group({
      nombrePerfil: ['',Validators.required],
      apellidoPerfil: ['',Validators.required],
      direccionPerfil: ['',Validators.required],
      ciudadPerfil: ['',Validators.required],
      provinciaPerfil: ['',Validators.required],
      codCriadorPerfil: ['',Validators.required],
     

    })
  }

  ngOnInit(): void {
    this.afauth.user.subscribe(user => {
      if (user) {
        this.FireUser = user;
        this.usuario = this.FireUser.email?.toString();
      }
    })
  }

  async registrarPerfil() {
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
       await this.perfil.preAddPerfil(data, this.image, this.usuario);
       this.fakeLoading();
      }
    } catch (error) {
      console.log(error);

    }

  }


  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/home/inicio'])
    }, 1500);
  }


  handleImage(event: any): void {
    this.image = event.target.files[0];
  }

}
