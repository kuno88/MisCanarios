import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LineaInterface } from '../../Interfaces/lineaInterface';
import { LineaSvcService } from '../../services/linea-svc.service';

export interface ListaLineas {
  codigo: string;
  linea: string;
  fechaCreacion?: Date,
  fechaActualizacion?: Date,

}


@Component({
  selector: 'app-agregar-linea',
  templateUrl: './agregar-linea.component.html',
  styleUrls: ['./agregar-linea.component.scss']
})
export class AgregarLineaComponent implements OnInit {

  formRegistroLinea: FormGroup;

  displayedColumns: string[] = ['codigo', 'linea'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private lin: LineaSvcService, private _snackBar: MatSnackBar) {
    this.formRegistroLinea = this.fb.group({
      codigoLinea: ['', Validators.required],
      nombreLinea: ['', Validators.required],
    });

    this.dataSource = new MatTableDataSource();
    this.lin.obtenerLineas().subscribe(data => this.dataSource.data = data)
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
  }
  /*
  agregarjson() {
    var i = 0
    for (let j = 0; j < lineaPrueba.length; j++) {
      
      const linea2: LineaInterface = {
        codigo: lineaPrueba[i]["codigo"],
        linea: lineaPrueba[i]["linea"],
        fechaCreacion: new Date(),
        fechaActualizacion: new Date()
      }
     
      this.lin.agregarLinea(linea2).then()
      console.log("agregado");
      i += 1;
    }


  }
*/
  agregarLinea() {
    const linea: LineaInterface = {
      codigo: this.formRegistroLinea.value.codigoLinea,
      linea: this.formRegistroLinea.value.nombreLinea,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
    if (linea) {
      this.lin.agregarLinea(linea).then()
      this.openSnackBar('Linea registrada', 'cerrar', 3);


      this.formRegistroLinea.reset();
    }
  }

  openSnackBar(message: string, accion: string, duracion: number) {
    const dura = duracion * 1000
    this._snackBar.open(message, accion, { duration: dura });
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
