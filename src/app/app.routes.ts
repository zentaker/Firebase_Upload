import { RouterModule, Routes } from "@angular/router";
import { CargaComponent } from "./components/carga/carga.component";
import { FirmaComponent } from "./components/firma/firma.component";
import { FotosComponent } from "./components/fotos/fotos.component";

const RUTAS: Routes = [
    { path: 'fotos', component: FotosComponent },
    { path: 'carga', component: CargaComponent },
    { path: 'firma', component: FirmaComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'fotos' }
];

export const APP_ROUTES = RouterModule.forRoot(RUTAS);