import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthSvcService } from '../../services/auth-svc.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hide = true;
  registerForm: FormGroup;
  loading = false;
  constructor(private fb: FormBuilder, private auth: AuthSvcService, private router: Router) {
    this.registerForm = this.fb.group({
      emailRegister: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      passwordRegister: ['', Validators.required]
    })

   
  }

  ngOnInit(): void {

  }

  isValidField(field: string): boolean {

    return ((this.registerForm.get(field)?.touched || this.registerForm.get(field)!.dirty) &&
      !this.registerForm.get(field)?.valid);
  }


  getErrorMessage(field: string): string {
    let message = '';
    if (this.registerForm.get(field)?.hasError('required')) {
      message = 'El campo es obligatorio';
    } else if (this.registerForm.get(field)?.hasError('pattern')) {
      message = 'Ingrese un email valido';
    }
    return message;
  }



  async registrarUsuario(){

    try {
      const correo = this.registerForm.value.emailRegister;
      const contraseña = this.registerForm.value.passwordRegister;
      const user = await this.auth.register(correo, contraseña);
      if (user) {
        this.fakeLoading();
        this.registroCorrecto();
      }
    } catch (error) {
      console.log(error)
      this.msjError2();
      this.registerForm.reset();
    }
  }
  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/perfil/agregarPerfil'])
    }, 1500);
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
      title: 'Registro exitoso',
      
    });
  }

  msjError(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })
    Toast.fire({
      icon: 'error',
      title: 'Email o contraseña incorrectos',
      
    });

  }
  msjError2(){
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
