// Importa el decorador Component y la utilidad Input para definir un componente Angular y recibir datos
import { Component, Input } from '@angular/core';
// Importa CommonModule para poder usar directivas básicas como @if, @for en el template
import { CommonModule } from '@angular/common';
// Importa la interfaz Product que define la estructura de un producto
import { Product } from '../product/product';
// Importa el servicio que gestiona el carrito
import { CartService } from '../../service/cart-service';
// Importa el servicio que gestiona la lista de deseos
import { WishlistService } from '../../service/wishlist-service';

@Component({
  selector: 'app-product-list',           // Nombre de la etiqueta HTML para usar este componente
  standalone: true,                       // Indica que es un componente independiente (no necesita NgModule)
  imports: [ CommonModule ],              // Permite usar directivas comunes en la plantilla
  templateUrl: './product-list.html',     // Archivo de plantilla HTML asociado
  styleUrl: './product-list.css',         // Archivo de estilos CSS asociado
})
export class ProductList {

  @Input() products: Product[] = [];      // Recibe un array de productos desde el componente padre

  constructor(
    private cartService: CartService,     // Servicio para gestionar operaciones del carrito
    private wishlistService: WishlistService // Servicio para gestionar operaciones de la lista de deseos
  ) {}

  // Método para añadir un producto al carrito
  addToCart(p: Product) {
    this.cartService.addToCart(p);
  }

  // Método para quitar un producto del carrito
  removeFromCart(p: Product) {
    this.cartService.removeFromCart(p);
  }

  // Método para alternar el estado de un producto en la lista de deseos
  toggleWishlist(p: Product) {
    this.wishlistService.toggleWishlist(p);
  }
}
