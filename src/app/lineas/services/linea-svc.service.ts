import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LineaInterface } from '../Interfaces/lineaInterface';

@Injectable({
  providedIn: 'root'
})
export class LineaSvcService {

  constructor(private firestore: AngularFirestore) { }

  agregarLinea(linea: LineaInterface): Promise<any> {

    //return this.firestore.collection('linea-canario').add(linea);
    return this.firestore.collection('Lineas').doc('FOCI').collection('Color').add(linea);
  }


  obtenerLineas(): Observable<LineaInterface[]> {

    return this.firestore.collection('Lineas').doc('FOCI').collection
    ('Color', ref => ref.orderBy('codigo', 'asc')).snapshotChanges().pipe(
      map(actions=>
        actions.map(a=>{
          const data = a.payload.doc.data() as LineaInterface;
          const id = a.payload.doc.id;
          return { ...data, id};
        }))
    )

    // return this.firestore
    //   .collection('linea-canario', ref => ref.orderBy('codigo', 'desc'))
    //   .snapshotChanges()
    //   .pipe(
    //     map(actions =>
    //       actions.map(a => {
    //         const data = a.payload.doc.data() as LineaInterface;
    //         const id = a.payload.doc.id;
    //         return { ...data, id };
    //       }
    //       )
    //     )
    //   );
  }


  obtenerLinea(id: string): Observable<any> {
    return this.firestore.collection('linea-canario').doc(id).snapshotChanges();

  }
  actualizarLinea(id: string, data: LineaInterface): Promise<any> {
    return this.firestore.collection('linea-canario').doc(id).update(data);
  }
  eliminarLinea(id: string): Promise<any> {
    return this.firestore.collection('linea-canario').doc(id).delete();
  }



}
