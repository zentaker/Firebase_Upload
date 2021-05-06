import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';



@Directive({
  selector: '[appNgdropFiles]'
})
export class NgdropFilesDirective {

  //definir una relacion con nuestros arvhivos que tenemos en el carga componet
  @Input() archivos: FileItem[] = []; //archivos a controlar

  //output para estar conectado con el padre o el elemento que lo contiene 
   //Estructura para poder emitir 
   @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  constructor() { }


  
  //espesificar un callback cuando suceda el dragover
  @HostListener('dragover', ['$event']) // dragover cuando se esta encima
  public onDragEnter(event: any) {

    //lanzamos una notificacion hacia el padre
    this.mouseSobre.emit(true); // el mouse esta sobre el elemento
    this._prevenirdetener(event);
  }

  @HostListener('dragleave', ['$event']) // el mouse sale
  public onDragLeave(event: any) {

    this.mouseSobre.emit(false);
 
  }

  @HostListener('drop', ['$event']) // se atrastra algo y se suelta
  public onDrop(event: any) {

   

    const tranferencia = this._getTranfererncia(event);

    if (!tranferencia) {
      return;
    }

    this._extraerArchivos(tranferencia.files);
    
    this.mouseSobre.emit(false); // se desaparecen los puntos

    this._prevenirdetener(event);

    

  }

  //para extender la compatibilidad de los navegadores
  private _getTranfererncia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extraerArchivos(archivosLista: FileList) {

    //obtenemos el archivo 
    console.log(archivosLista);

    //para barrer las propiedades para convertira en un arreglo
    for (const propiedad in Object.getOwnPropertyNames(archivosLista)) {
      const archivoTemporal = archivosLista[propiedad];

      //si el archivo puede ser cargado
      if (this._archivoPuedeSerCargado(archivoTemporal)) {
        //crear un arreglo con todos los elementos que halla colocado
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }


    }
    console.log(this.archivos);

  }



  //validaciones

  //haga la combinacion de que ya fue dropeado y es un imagen la conbinmacion
  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (!this._archivoYaFueDropeado(archivo.name) && this._esImagen(archivo.type)) {
      return true;
    } else {
      return false;
    }

  }

  //crome no abra la imagen por defecto
  private _prevenirdetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  //Asegurarme que el archivo ya no exista en el arreglo
  private _archivoYaFueDropeado(nombreArchivo: string): boolean {

    //un barrido para comprobar 
    for (const archivo of this.archivos) {

      //si el archivo ya ha sido dropeado
      if (archivo.nombreArchivo == nombreArchivo) {
        console.log('el archivo' + nombreArchivo + 'ya esta agregado');
        return true;
      }
    }
    // si el archivo no fue dropeado
    return false;

  }

  //validacion para verificar que son imagenes
  private _esImagen(tipoArchivo: string): boolean {

    // si no es una images (no lo permites) : si es una imagen (si lo permites)
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');

  }


}
