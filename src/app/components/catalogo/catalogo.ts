// Importamos utilidades modernas de Angular para estado reactivo
import { Component, signal, effect } from '@angular/core';
// Importamos el componente ProductList para mostrar la lista de productos
import { ProductList } from "../product-list/product-list";
// Servicio que obtiene los productos desde un JSON o API
import { ProductsDataService } from '../../service/products-data-service';
// Interfaz que define la estructura de un producto
import { Product } from '../product/product';
// Servicio que gestiona el carrito
import { CartService } from '../../service/cart-service';
// Servicio que gestiona la lista de deseos
import { WishlistService } from '../../service/wishlist-service';

@Component({
  selector: 'app-catalogo',          // Nombre de la etiqueta HTML para usar este componente
  imports: [ProductList],            // Importamos ProductList (standalone) para renderizar productos
  templateUrl: './catalogo.html',    // Plantilla HTML asociada
  styleUrl: './catalogo.css',        // Estilos CSS asociados
})
export class Catalogo {
  // Signal con todos los productos cargados
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

      // Guardamos los productos en los signals
      this.products.set(data);
      this.filteredProducts.set(data);
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

  // Método que aplica los filtros de tipo y búsqueda sobre la lista de productos
  applyFilter() {
    // Obtenemos los tipos seleccionados (los que tienen signal en true)
    const selectedTypes = Object.entries(this.types)
      .filter(([_, t]) => t())
      .map(([key, _]) => key);

    // Empezamos con todos los productos
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

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value

    if (value.length > 2) {
      this.searchTerm.set(value)
    } else {
      this.searchTerm.set("")
    }
  }
}
