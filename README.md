Firma digital
![Animationfirma](https://user-images.githubusercontent.com/46875264/117245692-dca58480-ae00-11eb-92aa-df124d860de0.gif)


Drag N Drop
![Animation2](https://user-images.githubusercontent.com/46875264/117245776-fc3cad00-ae00-11eb-8db5-153b1cbbe740.gif)

## instalar firebase

ng add @angular/fire

## en enviroments.ts
Realizar la importacion de las claves de la aplicacion de firebase
```
export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB1Ke0RJ8yUiUbxKx4wsa5k0vw8KbypaSk",
    authDomain: "loginserver-9d29a.firebaseapp.com",
    projectId: "loginserver-9d29a",
    storageBucket: "loginserver-9d29a.appspot.com",
    messagingSenderId: "986187586678",
    appId: "1:986187586678:web:256deb65c1756edf1a1357"
  }
};
```

## importacion en el module

en el app.module.ts
```
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


  imports: [
    BrowserModule,
    APP_ROUTES,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
    
    
  ],


```



# Angular directives

EventEmitter
- sirve para informar al padre que algo sucedio desde la directiva

 ElementRef
 - sirve para tener una conexion directa con el html que contiene la directiva

  HostListener 
  - crear eventos o callbacks cuando algo suceda, cuando alguien haga click o el mouse este encima 
