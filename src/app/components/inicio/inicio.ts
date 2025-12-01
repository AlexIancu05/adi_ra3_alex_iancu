// Importa el decorador Component para definir un componente Angular
import { Component } from '@angular/core';
// Importa RouterModule para poder usar directivas de enrutamiento en el template
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-inicio',           // Nombre de la etiqueta HTML para usar este componente
  standalone: true,                 // Indica que es un componente independiente (no necesita NgModule)
  imports: [RouterModule],          // Permite usar funcionalidades de enrutamiento en la vista
  templateUrl: './inicio.html',     // Archivo de plantilla HTML asociado
  styleUrl: './inicio.css',         // Archivo de estilos CSS asociado
})
export class Inicio {}              // Clase del componente, actualmente sin lógica interna