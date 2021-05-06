import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import * as firebase from 'firebase';
import firebase from 'firebase'
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaFirmaService {

  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }

  cargarImagenesFirebase(imagenes: FileItem[]) {
    
    const storageRef = firebase.storage().ref();
    for (const item of imagenes) {
      item.estaSubiendo = true;
      //una validacion
      if (item.progreso >= 100) {
        continue;
      }
      //tarea de subida de firebase
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombreArchivo}`).put(item.archivo);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => console.log('error al subir', error),
        () => {
          console.log('Imagen Cargada correctamente');
 
          uploadTask.snapshot.ref.getDownloadURL()
            .then((url) => {
              item.url = url;
              item.estaSubiendo = false;
              this.guardarImagenes({
                nombre: item.nombreArchivo,
                url: item.url
            });
          });
 
        }
      
      )
    }

  }

  private guardarImagenes(imagen:{nombre: string, url: string} ) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`).add(imagen);

  }
}
