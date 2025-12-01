// Importa el decorador Component y la utilidad signal para definir un componente Angular y manejar estado reactivo
import { Component, signal } from '@angular/core';
// Importa RouterModule y RouterOutlet para gestionar la navegación y renderizar vistas según las rutas
import { RouterModule, RouterOutlet } from '@angular/router';
// Importa el componente Header para mostrar la cabecera
import { Header } from "./components/header/header";
// Importa el componente Footer para mostrar el pie de página
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',                     // Nombre de la etiqueta HTML para usar este componente raíz
  imports: [RouterOutlet, RouterModule, Header, Footer], // Importa funcionalidades de enrutamiento y los componentes de cabecera y pie
  templateUrl: './app.html',                // Archivo de plantilla HTML asociado
  styleUrl: './app.css'                     // Archivo de estilos CSS asociado
})
export class App {
  protected readonly title = signal('tienda-variada'); // Signal que almacena el título de la aplicación
}
