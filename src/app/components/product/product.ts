// Importa el decorador Component y utilidades para comunicación entre componentes
import { Component, EventEmitter, Input, Output } from '@angular/core';
// Importa CommonModule para poder usar directivas básicas como @if, @for en el template
import { CommonModule } from '@angular/common';

// Interfaz que define la estructura de un producto
export interface Product {
  id: number;             // Identificador único del producto
  name: string;           // Nombre del producto
  type: string;           // Categoría o tipo del producto
  price: number;          // Precio del producto
  image: string;          // URL de la imagen del producto
  wishlisted?: boolean;   // Indica si está en la lista de deseos (opcional)
  quantity?: number;      // Cantidad en el carrito (opcional)
}

@Component({
  selector: 'app-product',           // Nombre de la etiqueta HTML para usar este componente
  imports: [ CommonModule ],         // Permite usar directivas comunes en la plantilla
  templateUrl: './product.html',     // Archivo de plantilla HTML asociado
  styleUrl: './product.css',         // Archivo de estilos CSS asociado
})
export class Product {
  @Input() product!: Product;        // Recibe un producto desde el componente padre

  @Output() addToCart = new EventEmitter<Product>();       // Evento para añadir al carrito
  @Output() toggleWishlist = new EventEmitter<Product>();  // Evento para alternar en la wishlist

  // Método que emite el evento de añadir al carrito con el producto actual
  onAddToCart() {
    this.addToCart.emit(this.product);
  }

  // Método que emite el evento de alternar en la wishlist con el producto actual
  onToggleWishlist() {
    this.toggleWishlist.emit(this.product);
  }
}
