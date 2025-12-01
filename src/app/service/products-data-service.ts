// Importa el decorador Injectable para definir un servicio en Angular
import { Injectable } from '@angular/core';
// Importa HttpClient para realizar peticiones HTTP
import { HttpClient } from '@angular/common/http';
// Importa Observable de RxJS para manejar respuestas asíncronas
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class ProductsDataService {
  
  // Inyecta HttpClient para poder realizar peticiones HTTP
  constructor(private http: HttpClient) {}

  // Método que obtiene la lista de productos desde un archivo JSON
  getProducts(): Observable<any[]> {
    // Realiza una petición GET al archivo /products/products.json
    // Devuelve un Observable que emite un array de productos
    return this.http.get<any[]>("/products/products.json");
  }
}