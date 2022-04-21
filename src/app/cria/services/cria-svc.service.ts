import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ParejaInterface } from '../interfaces/parejaInterface';


@Injectable({
  providedIn: 'root'
})
export class CriaSvcService {

  constructor(private firestore: AngularFirestore) { }

  createregisterCouple(usuario: string | undefined| null, pareja: ParejaInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString()).collection('Cria').add(pareja);
  }

  getAllCouples(usuario: string | null | undefined): Observable<ParejaInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString()).
      collection('Cria', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as ParejaInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }
          )
        )
      );
  }

}
