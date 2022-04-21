import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanarioInterface } from 'src/app/canarios/interfaces/canariosI';
import { CanariosSvcService } from 'src/app/canarios/services/canarios-svc.service';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { ParejaInterface } from '../../interfaces/parejaInterface';
import { CriaSvcService } from '../../services/cria-svc.service';

@Component({
  selector: 'app-agregar-pareja',
  templateUrl: './agregar-pareja.component.html',
  styleUrls: ['./agregar-pareja.component.scss']
})
export class AgregarParejaComponent implements OnInit {
  loading = false;

  canarioArrayM: CanarioInterface[] = [];
  canarioArrayF: CanarioInterface[] = [];
  machoSeleccionado: CanarioInterface[] = [];
  hembraSeleccionado: CanarioInterface[] = [];
  user!: firebase.User | null;
  filteredOptions1: Observable<CanarioInterface[]> | undefined;
  filteredOptions2: Observable<CanarioInterface[]> | undefined;
  controlMacho = new FormControl();
  controlHembra = new FormControl();
  formRegistroPareja: FormGroup;


  constructor(private canarioSvc: CanariosSvcService, private afauth: AngularFireAuth, private fb: FormBuilder,
    private criaSvc: CriaSvcService) {
    this.formRegistroPareja = this.fb.group({
      yearSeason: ['', Validators.required],
      codJaula: ['', Validators.required],
      codMacho: ['', Validators.required],
      codHembra: ['', Validators.required]
    })
  }

  ngOnInit(): void {

    this.afauth.user.subscribe(user => {
      if (user) {
        this.user = user;
        this.canarioSvc.getAllMale(this.user.email).subscribe(data => {
          console.log('Machos', data)
          this.canarioArrayM = data
        })

        this.canarioSvc.getAllFemale(this.user.email).subscribe(data => {
          console.log('Hembras', data)
          this.canarioArrayF = data
        })


      }
    })


    // this.filteredOptions1 = this.controlMacho.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
  }

  // private _filter(value: string): CanarioInterface[] {
  //   const filterValue = value.toLowerCase();

  //   return this.canarioArray.filter(option => option.nAnillo.toLowerCase().includes(filterValue));
  // }

  async agregarPareja() {
    try {
      const pareja: ParejaInterface = {
        year: this.formRegistroPareja.value.yearSeason,
        codigoJaula: this.formRegistroPareja.value.codJaula,
        idMacho: this.formRegistroPareja.value.codMacho,
        idHembra: this.formRegistroPareja.value.codHembra,
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()

      }
      if (pareja) {
        await this.criaSvc.createregisterCouple(this.user?.email, pareja).then();
        this.canarioSvc.getCanario(pareja.idMacho, this.user?.email).subscribe(
          contenido => {
            console.log(contenido)
            this.machoSeleccionado = contenido;
          }
        );
        const canario1: CanarioInterface = {
          id: pareja.idMacho,
          usuario: this.user?.email?.toString(),
          disponibilidad: 'ocupado',
          estado:'en curso',
          fechaActualizacion: new Date(),
        }
        const canario2: CanarioInterface={
          id: pareja.idHembra,
          usuario: this.user?.email?.toString(),
          disponibilidad:'ocupado',
          fechaActualizacion: new Date(),
        }
        this.canarioSvc.newEditCanario(canario1).then();
        this.canarioSvc.newEditCanario(canario2).then();
        console.log(pareja)
      }
    } catch (error) {

    }
  }

}
