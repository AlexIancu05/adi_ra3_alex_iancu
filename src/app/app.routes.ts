import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { Catalogo } from './components/catalogo/catalogo';
import { Deseados } from './components/deseados/deseados';
import { Carrito } from './components/carrito/carrito';

export const routes: Routes = [
    { path: "", component: Inicio},
    { path: "catalogo", component: Catalogo},
    { path: "deseados", component: Deseados},
    { path: "carrito", component: Carrito},
];
