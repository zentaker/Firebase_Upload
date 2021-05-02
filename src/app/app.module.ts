import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { APP_ROUTES } from './app.routes';
import { FirmaComponent } from './components/firma/firma.component';
import { SignaturepadComponent } from './components/signaturepad/signaturepad.component';
import { CargaImagenesService } from './services/carga-imagenes.service';



@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    FirmaComponent,
    SignaturepadComponent
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    
    
  ],
  providers: [CargaImagenesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
