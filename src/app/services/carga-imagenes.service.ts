import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
//import * as firebase from 'firebase';
import firebase from 'firebase'
import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})
export class CargaImagenesService {
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }


  cargarFirmaFirebase(firma) {
    console.log(firma);

    const storageRef = firebase.storage().ref();

    const uploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/firma`).put(firma);

    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
    }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...

      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);

        
      });
    });

  }

  

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

      console.log(item.archivo);

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
