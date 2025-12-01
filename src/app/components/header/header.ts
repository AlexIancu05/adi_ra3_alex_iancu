// Importamos el decorador Component para definir un componente Angular
import { Component } from '@angular/core';
// Importamos RouterLink y RouterModule para poder usar enlaces de navegación en el template
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',             // Nombre de la etiqueta HTML para usar este componente
  imports: [RouterModule, RouterLink],// Importamos las directivas de routing para poder usar <a routerLink="...">
  standalone: true,                   // Es un componente standalone (no depende de NgModule)
  templateUrl: './header.html',       // Plantilla HTML asociada
  styleUrl: './header.css',           // Estilos CSS asociados
})
export class Header {
  //La clase está vacía porque el header solo se encarga de renderizar la vista.
}
