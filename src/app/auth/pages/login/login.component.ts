import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthSvcService } from '../../services/auth-svc.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private isEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  LoginForm: FormGroup;
  loading = false;
  hide = true;
  constructor(private fb: FormBuilder, private auth: AuthSvcService, private router: Router) { 
    this.LoginForm = this.fb.group({
      emailLogin: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      passwordLogin: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  isValidField(field: string): boolean {

    return ((this.LoginForm.get(field)?.touched || this.LoginForm.get(field)!.dirty) &&
      !this.LoginForm.get(field)?.valid);
  }


  getErrorMessage(field: string): string {
    let message = '';
    if (this.LoginForm.get(field)?.hasError('required')) {
      message = 'El campo es obligatorio';
    } else if (this.LoginForm.get(field)?.hasError('pattern')) {
      message = 'Ingrese un email valido';
    }
    return message;
  }

  async logear() {
    try {
      const correo = this.LoginForm.value.emailLogin;
      const contraseña = this.LoginForm.value.passwordLogin;
      const user = await this.auth.login(correo, contraseña);
      if (user) {
        this.fakeLoading();
      }
    } catch {
      this.msjError();
      this.LoginForm.reset();
    }
  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/home/inicio'])
    }, 1500);
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
      title: 'Usuario o contraseña incorrectos',
      
    });

  }

}
