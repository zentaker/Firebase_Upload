import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FotosComponent } from './components/fotos/fotos.component';
import { CargaComponent } from './components/carga/carga.component';
import { APP_ROUTES } from './app.routes';
import { FirmaComponent } from './components/firma/firma.component';
import { SignaturepadComponent } from './components/signaturepad/signaturepad.component';
import { CargaImagenesService } from './services/carga-imagenes.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { NgdropFilesDirective } from './directives/ngdrop-files.directive';
import { FirmaDigitalDirective } from './directives/firma-digital.directive';
;




@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    CargaComponent,
    FirmaComponent,
    SignaturepadComponent,
    NgdropFilesDirective,
    FirmaDigitalDirective,
   
  
    
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    
    
  ],
  providers: [CargaImagenesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
