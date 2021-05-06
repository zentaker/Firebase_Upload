  
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FileItem } from 'src/app/models/file-item.js';
import { CargaImagenesService } from '../../services/carga-imagenes.service';



import SignaturePad from "../../../../node_modules/signature_pad/dist/signature_pad.js";





@Component({
  selector: 'app-firma',
  templateUrl: './firma.component.html',
  styles: [
    `
    .signature-pad--body canvas {
      border: solid 1px #0d6efd;
      border-radius: 20px;
      margin-top: 100px;
    }
    `
  ]
})
export class FirmaComponent implements OnInit {
  @ViewChild('sPad', {static: true}) signaturePadElement;
  signaturePad: any;


  archivos: FileItem[] = [];
  firma: Array<string> = [];

  constructor(public _cargaImagenes: CargaImagenesService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signaturePadElement.nativeElement);
  }



  clear() {
    this.signaturePad.clear();
  }

  //guardar la firma 

  guardar(dataURL) {
    console.log(this.signaturePad.toDataURL());

  }



  download(dataURL, filename) {
    if (navigator.userAgent.indexOf('Safari') > -1 && navigator.userAgent.indexOf('Chrome') === -1) {
      window.open(dataURL);
    } else {
      const blob = this.dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);

    }
    
  }

  dataURLToBlob(dataURL) {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: contentType });
     //return new Firma([uInt8Array], { type: contentType });
    
   
    
  }

  savePNG() {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
    } else {
      const dataURL = this.signaturePad.toDataURL();
      //const nuevo = this.download(dataURL, 'signature.png');

/* 
      const parts = dataURL.split(';base64,');
      const contentType = parts[0].split(':')[1];
      const raw = window.atob(parts[1]);
      const rawLength = raw.length;
      const uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      new Blob([uInt8Array], { type: contentType });

      let firma = {size: rawLength,
        type: contentType ,
        nombrearchivo: 'firma'}
   
       */
      
     

     


      const blob = this.dataURLToBlob(dataURL);

      this._cargaImagenes.cargarFirmaFirebase(blob);
      
      

      

      console.log(blob);

      //
      //this.archivos.push(nuevoArchivo);
      //this._cargaImagenes.cargarFirmaFirebase(blob);

    
    }
  }


}
