// Importamos utilidades modernas de Angular para estado reactivo
import { Component, signal, effect } from '@angular/core';
// Interfaz que define la estructura de un producto
import { Product } from '../product/product';
// Servicio que gestiona la lista de deseos
import { WishlistService } from '../../service/wishlist-service';
// Servicio que obtiene los productos desde un JSON o API
import { ProductsDataService } from '../../service/products-data-service';
// Servicio que gestiona el carrito
import { CartService } from '../../service/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-deseados',          // Nombre de la etiqueta HTML para usar este componente
  imports: [RouterLink],                      // No importa otros componentes standalone aquí
  templateUrl: './deseados.html',    // Plantilla HTML asociada
  styleUrl: './deseados.css',        // Estilos CSS asociados
})
export class Deseados {

  // Signal con todos los productos que están en la wishlist
  products = signal<Product[]>([]);
  // Signal con los productos filtrados (según búsqueda y categorías)
  filteredProducts = signal<Product[]>([]);

  // Signal para el término de búsqueda introducido por el usuario
  searchTerm = signal("");

  // Signals para cada tipo de producto, usados como filtros por categoría
  types = {
    Ropa: signal(false),
    Calzado: signal(false),
    Abrigo: signal(false),
    Informatica: signal(false)
  };

  constructor(
    private dataService: ProductsDataService, // Servicio que trae los productos
    private wishlistService: WishlistService, // Servicio que sincroniza la wishlist
    private cartService: CartService          // Servicio que sincroniza el carrito
  ) {
    // Al construir el componente, pedimos los productos al servicio
    this.dataService.getProducts().subscribe(data => {
      // Sincronizamos carrito y wishlist con los productos cargados
      this.cartService.loadCartIntoProducts(data);
      this.wishlistService.loadWishlistIntoProducts(data);
      // Guardamos solo los productos que están en la wishlist
      this.products.set(data.filter(p => p.wishlisted))
    });
    
    // effect: se ejecuta automáticamente cuando cambian los signals observados
    effect(() => {
      // Forzamos lectura de todos los filtros (para que el effect se dispare al cambiar cualquiera)
      Object.values(this.types).forEach(t => t());
      // Aplicamos el filtro cada vez que cambian los tipos o el término de búsqueda
      this.applyFilter();
      this.searchTerm(); // lectura para que el effect dependa también del término
    });
  }

  // Método para alternar el estado de un filtro de tipo (checkbox)
  toggleType(type: keyof typeof this.types, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.types[type].set(checked);
  }

  // Método que aplica los filtros de tipo y búsqueda sobre la lista de productos deseados
  applyFilter() {
    // Obtenemos los tipos seleccionados (los que tienen signal en true)
    const selectedTypes = Object.entries(this.types)
      .filter(([_, t]) => t())
      .map(([key, _]) => key);

    // Empezamos con todos los productos deseados
    let filtered = this.products();

    // Si hay tipos seleccionados (pero no todos), filtramos por tipo
    if (selectedTypes.length > 0 && selectedTypes.length < Object.keys(this.types).length) {
      filtered = filtered.filter(p => selectedTypes.includes(p.type))
    } 

    // Filtramos por término de búsqueda (nombre del producto)
    const term = this.searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(term))
    }

    // Actualizamos el signal con la lista filtrada
    this.filteredProducts.set(filtered);
  }

  // Método para limpiar todos los filtros de tipo
  clearSelection() {
    Object.values(this.types).forEach(t => t.set(false));
  }

  // Método para añadir un producto de la wishlist al carrito
  addToCart(p: Product) {
    this.cartService.addToCart(p);
  }

  // Método para quitar un producto del carrito
  removeFromCart(p: Product) {
    this.cartService.removeFromCart(p);
  }

  // Método para alternar el estado de un producto en la wishlist
  toggleWishlist(p: Product) {
    this.wishlistService.toggleWishlist(p);
  }
}
