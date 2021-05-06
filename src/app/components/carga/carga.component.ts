import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from 'src/app/services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: [
  ]
})
export class CargaComponent implements OnInit {
  // bandera que nos avisa cuando hay arvhivos que estan sobre el arear
  estaSobreElemento: boolean = false;
  archivos: FileItem[] = [];

  constructor(public _cargaImagenes: CargaImagenesService) { }

  ngOnInit(): void {
  }
  pruebasobreElemento(event) {
    console.log(event);

  }

  cargarImagenes() {
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);

  }

  limpiarArchivos() {
    this.archivos = [];
  }

}
