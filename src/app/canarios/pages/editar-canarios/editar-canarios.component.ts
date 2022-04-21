import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LineaSvcService } from 'src/app/lineas/services/linea-svc.service';
import { CanariosSvcService } from '../../services/canarios-svc.service';
import firebase from 'firebase/compat';
import { LineaInterface } from 'src/app/lineas/Interfaces/lineaInterface';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CanarioInterface } from '../../interfaces/canariosI';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-editar-canarios',
  templateUrl: './editar-canarios.component.html',
  styleUrls: ['./editar-canarios.component.scss']
})
export class EditarCanariosComponent implements OnInit {
  value: any;
  formEditCanario: FormGroup;
  myControl = new FormControl();
  loading= false;
  user: firebase.User | undefined;
  lineaArray: LineaInterface[] = [];
  filteredOptions: Observable<LineaInterface[]> | undefined;


  constructor(private router: Router, private fb: FormBuilder, private lin: LineaSvcService, private afauth: AngularFireAuth,
    private canarioSvc : CanariosSvcService) {
    const navigation = this.router.getCurrentNavigation();
    this.value = navigation?.extras.state!.value;
    this.formEditCanario = this.fb.group({
      procedencia: [this.value.procedencia, Validators.required],
      nAnillo: [this.value.nAnillo],
      sinAnillo:[this.value.sinAnillo],
      genero: [this.value.genero],
      estado: [this.value.estado, Validators.required],
      fechaEstado: [this.value.fechaEstado],
      observacionEstado: [this.value.observacionEstado],
      colorAnillo: [this.value.colorAnillo],
      observaciones: [this.value.observaciones],
      
    })
    this.myControl.setValue(this.value.linea)

  }

  ngOnInit(): void {
    console.log(this.value);
    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    })
//el usuario ya viene del value.usuario asi que lo de arriba esta al pd
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

 async actualizarCanario(){
    try {
      const canario: CanarioInterface = {
        usuario: this.value.usuario,
        id:this.value.id,
        procedencia: this.formEditCanario.value.procedencia,
        nAnillo: this.formEditCanario.value.nAnillo,
        sinAnillo: this.formEditCanario.value.sinAnillo,
        colorAnillo: this.formEditCanario.value.colorAnillo,
        genero: this.formEditCanario.value.genero,
        linea: this.myControl.value,
        estado: this.formEditCanario.value.estado,
        fechaEstado: this.formEditCanario.value.fechaEstado,
        observacionEstado: this.formEditCanario.value.observacionEstado,
        observaciones: this.formEditCanario.value.observaciones,
        disponibilidad:this.value.disponibilidad,
        fechaActualizacion: new Date(),

      }
      if (canario) {
        //this.cana.crearRegistroCanario(canario).then()
        await this.canarioSvc.newEditCanario(canario);
        this.fakeLoading();
      }else{
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
      title: 'Canario actualizado',
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
