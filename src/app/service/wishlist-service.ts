// Importa el decorador Injectable para definir un servicio en Angular
import { Injectable } from '@angular/core';
// Importa la interfaz Product que define la estructura de un producto
import { Product } from '../components/product/product';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class WishlistService {

  private WISHLIST_KEY = "UffQueGanasDeComprarmeEsto"; // Clave usada para guardar la wishlist en sessionStorage
  private wishlist = new Set<number>();                // Conjunto de IDs de productos que están en la wishlist

  constructor() {
    // Al inicializar el servicio, intenta recuperar la wishlist guardada en sessionStorage
    const saved = sessionStorage.getItem(this.WISHLIST_KEY);
    if (saved) {
      this.wishlist = new Set(JSON.parse(saved));
    }
  }

  // Método privado para guardar el estado actual de la wishlist en sessionStorage
  private save() {
    sessionStorage.setItem(this.WISHLIST_KEY, JSON.stringify([...this.wishlist]))
  }

  // Alterna el estado de un producto en la wishlist
  toggleWishlist(product: Product) {
    if (this.wishlist.has(product.id)) {
      this.wishlist.delete(product.id);   // Si ya está, lo elimina
      product.wishlisted = false;         // Marca el producto como no deseado
    } else {
      this.wishlist.add(product.id);      // Si no está, lo añade
      product.wishlisted = true;          // Marca el producto como deseado
    }
    this.save();                          // Guarda el estado actualizado
  }

  // Sincroniza los productos con la información de la wishlist
  loadWishlistIntoProducts(products: Product[]) {
    for (const p of products) {
      p.wishlisted = this.wishlist.has(p.id);
    }
  }

  // Limpia completamente la wishlist
  clearWishlist() {
    this.wishlist.clear();
    sessionStorage.removeItem(this.WISHLIST_KEY);
  }

  // Devuelve el conjunto de IDs de productos que están en la wishlist
  getWishlistedProducts() {
    return this.wishlist;
  }
}
