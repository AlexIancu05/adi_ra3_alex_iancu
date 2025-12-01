// Importamos las utilidades principales de Angular
import { Component, computed, signal } from '@angular/core';
// Importa CommonModule para poder usar directivas básicas como @if, @for en el template
import { CommonModule } from '@angular/common';
// Servicio que gestiona el estado del carrito (añadir, quitar, limpiar)
import { CartService } from '../../service/cart-service';
// Servicio que provee los productos desde un JSON o API
import { ProductsDataService } from '../../service/products-data-service';
// Interfaz que define la estructura de un producto
import { Product } from '../product/product';

@Component({
  selector: 'app-cart',          // Nombre de la etiqueta HTML para usar este componente
  standalone: true,              // Es un componente standalone (no depende de NgModule)
  imports: [CommonModule],       // Importa CommonModule para usar directivas comunes
  templateUrl: './carrito.html', // Plantilla HTML asociada
  styleUrl: './carrito.css',     // Estilos CSS asociados
})
export class Carrito {
  // Signal reactivo que contiene la lista de productos
  // Se inicializa vacío y se actualizará al cargar datos
  products = signal<Product[]>([]);

  // Computed que filtra los productos con cantidad > 0
  // Es decir, solo los que están realmente en el carrito
  cartProducts = computed(() =>
    this.products().filter(p => (p.quantity ?? 0) > 0)
  );

  // Computed que calcula el precio total en tiempo real
  // Suma el precio * cantidad de cada producto del carrito
  totalPrice = computed(() =>
    this.cartProducts().reduce((sum, p) => sum + p.price * (p.quantity ?? 0), 0)
  );

  constructor(
    private cartService: CartService,           // Inyectamos el servicio del carrito
    private productsData: ProductsDataService,  // Inyectamos el servicio de productos
  ) {
    // Al construir el componente, pedimos los productos al servicio
    this.productsData.getProducts().subscribe(products => {
      // Sincronizamos el carrito con los productos cargados
      this.cartService.loadCartIntoProducts(products);
      // Guardamos los productos en el signal para que se rendericen
      this.products.set(products);
    });
  }

  // Método para añadir un producto al carrito
  addToCart(product: Product) {
    this.cartService.addToCart(product);        // Lógica del servicio
    this.products.update(list => [...list]);   // Forzamos actualización reactiva
  }

  // Método para quitar un producto del carrito
  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);   // Lógica del servicio
    this.products.update(list => [...list]);   // Forzamos actualización reactiva
  }
}
