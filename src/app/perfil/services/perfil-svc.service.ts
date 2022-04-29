import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { fileInterface } from '../interfaces/file.interface';
import { perfilInterface } from '../interfaces/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class PerfilSvcService {
  private filePath: any;
  private downloadURl!: Observable<string>;

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  preAddPerfil(perfil: perfilInterface, image: fileInterface, user: string | undefined): void {
    this.uploadImage(perfil, image, user);
  }

  private createPerfil(perfil: perfilInterface, user: string | undefined) {
    const perfilObj = {
      nombre: perfil.nombre,
      apellido: perfil.apellido,
      direccion: perfil.direccion,
      ciudad: perfil.ciudad,
      provincia: perfil.provincia,
      codCriador: perfil.codCriador,
      imgPerfil: this.downloadURl,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date(),
      fileRef: this.filePath


    }
    //console.log(perfilObj);
    //this.firestore.collection('registro-canarios').doc(user).collection('Perfil').add(perfilObj);
    this.firestore.collection('registro-canarios').doc(user).set(perfilObj);
  }

  private uploadImage(perfil: perfilInterface, image: fileInterface, user: string | undefined) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(urlImage => {
          this.downloadURl = urlImage;
          this.createPerfil(perfil, user);
        });
      })
    ).subscribe();

  }

  getPerfil(user: any){
    return this.firestore.collection('registro-canarios').snapshotChanges().pipe(
      map(contenido => contenido.map(stado=>{
        let data = stado.payload.doc.data() as perfilInterface;
        let id = stado.payload.doc.id;
        return {id, ...data}
      }))
    )
    
  }


}
