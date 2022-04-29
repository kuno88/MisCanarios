import { query } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanarioInterface } from '../interfaces/canariosI';

@Injectable({
  providedIn: 'root'
})
export class CanariosSvcService {

  constructor(private firestore: AngularFirestore) { }

  //obtiene los canarios por usuario y la coleccion canario
  newGetAllCanarios(usuario: string | null | undefined): Observable<CanarioInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString()).
      collection('Canarios', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges().pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as CanarioInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }
          )
        )
      );
  }

  getAllMale(usuario: string | null): Observable<CanarioInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString())
      .collection('Canarios',ref => ref.
      where('genero', '==', 'macho').
      where('estado', '==', 'criadero').
      where('disponibilidad', '==', 'libre')).snapshotChanges().pipe(
        map(action =>
          action.map(a => {
            const data = a.payload.doc.data() as CanarioInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }))
      );
  }
  obtenerPadre(usuario: string | null): Observable<CanarioInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString())
      .collection('Canarios',ref => ref.
      where('genero', '==', 'macho').
      where('estado', '==', 'criadero')).snapshotChanges().pipe(
        map(action =>
          action.map(a => {
            const data = a.payload.doc.data() as CanarioInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }))
      );
  }
  obtenerMadre(usuario: string | null): Observable<CanarioInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString())
      .collection('Canarios',ref => ref.
      where('genero', '==', 'hembra').
      where('estado', '==', 'criadero')).snapshotChanges().pipe(
        map(action =>
          action.map(a => {
            const data = a.payload.doc.data() as CanarioInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }))
      );
  }


  getAllFemale(usuario: string | null): Observable<CanarioInterface[]> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString())
      .collection('Canarios', ref => ref.where('genero', '==', "hembra")).snapshotChanges().pipe(
        map(action =>
          action.map(a => {
            const data = a.payload.doc.data() as CanarioInterface;
            const id = a.payload.doc.id;
            return { ...data, id };
          }))
      );


  }

  //prueba de recuperar id
  crearRegistro(canario : CanarioInterface):Promise<any>{
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString())
    .collection('Canarios').add(canario).then(docRef=>{
      console.log("Document written with ID: ", docRef.id);
    });
  
  }

  //crea un nuevo registro con un id usuario en la coleccion canarios
  createregisterBird(canario: CanarioInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString()).collection('Canarios').add(canario);
  }

  //elimino registro dentro de la coleccion canarios del usuario
  deleteCanario(canario: CanarioInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString()).
      collection('Canarios').doc(canario.id).delete();
  }

  newEditCanario(canario: CanarioInterface): Promise<any> {
    return this.firestore.collection('registro-canarios').doc(canario.usuario?.toString()).
      collection('Canarios').doc(canario.id).update(canario);
  }

  getCanario(id: string, usuario: string | null | undefined): Observable<any> {
    return this.firestore.collection('registro-canarios').doc(usuario?.toString()).collection('Canarios').
      doc(id).snapshotChanges();
  }



}
