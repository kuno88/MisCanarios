import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LineaInterface } from 'src/app/lineas/Interfaces/lineaInterface';
import { LineaSvcService } from 'src/app/lineas/services/linea-svc.service';
import { CanarioInterface } from '../../interfaces/canariosI';
import firebase from 'firebase/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanariosSvcService } from '../../services/canarios-svc.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-agregar-canarios',
  templateUrl: './agregar-canarios.component.html',
  styleUrls: ['./agregar-canarios.component.scss']
})
export class AgregarCanariosComponent implements OnInit {
  user: firebase.User | undefined;
  //keyword = "name";
  lineaArray: LineaInterface[] = [];
  filteredOptions: Observable<LineaInterface[]> | undefined;
  formRegistroCanario: FormGroup;
  myControl = new FormControl();
  loading = false;

  constructor(private fb: FormBuilder, private lin: LineaSvcService, private afauth: AngularFireAuth,
    private canarioSvc: CanariosSvcService, private router: Router) {
    this.formRegistroCanario = this.fb.group({
      procedencia: ['', Validators.required],
      nAnillo: [''],
      sinAnillo: [''],
      genero: [''],
      estado: ['', Validators.required],
      fechaEstado: [''],
      observacionEstado: [''],
      colorAnillo: [''],
      observaciones: [''],
      usuario: ['']

    })
  }

  ngOnInit(): void {

    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })

    this.lin.obtenerLineas().subscribe(
      contenido => {
        //console.log(contenido);
        this.lineaArray = contenido;
      }
    )

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  private _filter(value: string): LineaInterface[] {
    const filterValue = value.toLowerCase();

    return this.lineaArray.filter(option => option.linea.toLowerCase().includes(filterValue));
  }

  async agregarCanario() {
    try {
      const canario: CanarioInterface = {
        usuario: this.user?.email,
        procedencia: this.formRegistroCanario.value.procedencia,
        nAnillo: this.formRegistroCanario.value.nAnillo,
        sinAnillo: this.formRegistroCanario.value.sinAnillo,
        colorAnillo: this.formRegistroCanario.value.colorAnillo,
        genero: this.formRegistroCanario.value.genero,
        linea: this.myControl.value,
        estado: this.formRegistroCanario.value.estado,
        fechaEstado: this.formRegistroCanario.value.fechaEstado,
        observacionEstado: this.formRegistroCanario.value.observacionEstado,
        observaciones: this.formRegistroCanario.value.observaciones,
        disponibilidad: 'libre',
        fechaCreacion: new Date(),
        fechaActualizacion: new Date(),

      }
      if (canario) {
        await this.canarioSvc.createregisterBird(canario).then();
        this.fakeLoading();
      } else {
        this.msjError();
      }
    } catch (error) {
      console.log(error)
    }
  }

  registroCorrecto() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })

    Toast.fire({
      icon: 'success',
      title: 'Canario registrado',

    });
  }
  msjError() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 3000,
      background: '#C0CBDE'
    })
    Toast.fire({
      icon: 'error',
      title: 'Hubo un error intentelo nuevamente',
    });

  }

  fakeLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['/canarios/listarCanarios'])
      this.registroCorrecto();
    }, 1500);
  }


}
