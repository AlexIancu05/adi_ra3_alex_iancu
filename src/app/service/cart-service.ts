// Importa el decorador Injectable para definir un servicio en Angular
import { Injectable } from '@angular/core';
// Importa la interfaz Product que define la estructura de un producto
import { Product } from '../components/product/product';

@Injectable({
  providedIn: 'root', // Hace que el servicio esté disponible en toda la aplicación
})
export class CartService {

  private CART_KEY = "QueGuapoMiCarrito"; // Clave usada para guardar el carrito en sessionStorage

  // Objeto que representa el carrito: id del producto -> cantidad
  private cart: { [id: number]: number } = {};

  constructor() {
    // Al inicializar el servicio, intenta recuperar el carrito guardado en sessionStorage
    const saved = sessionStorage.getItem(this.CART_KEY);
    if (saved) {
      this.cart = JSON.parse(saved);
    }
  }

  // Método privado para guardar el estado actual del carrito en sessionStorage
  private save() {
    sessionStorage.setItem(this.CART_KEY, JSON.stringify(this.cart));
  }

  // Añade un producto al carrito
  addToCart(product: Product) {
    if (!this.cart[product.id]) {
      this.cart[product.id] = 0; // Inicializa la cantidad si no existe
    }
    
    this.cart[product.id]++; // Incrementa la cantidad del producto
    
    product.quantity = this.cart[product.id]; // Actualiza la cantidad en el objeto producto
    
    this.save(); // Guarda el estado actualizado del carrito
  }

  // Elimina una unidad de un producto del carrito
  removeFromCart(product: Product) {
    const id = product.id;
    if (this.cart[id]) {
      this.cart[id]--; // Decrementa la cantidad
      
      if (this.cart[id] <= 0) {
        delete this.cart[id]; // Si la cantidad llega a 0, elimina el producto del carrito
      }

      product.quantity = this.cart[id] || 0; // Actualiza la cantidad en el objeto producto

      this.save(); // Guarda el estado actualizado del carrito
    } else {
      delete this.cart[id]; // Si no existe en el carrito, asegura que se elimine
    }
  }

  // Sincroniza los productos con las cantidades guardadas en el carrito
  loadCartIntoProducts(products: Product[]) {
    for (const p of products) {
      p.quantity = this.cart[p.id] || 0;
    }
  }

  // Limpia completamente el carrito
  clearCart() {
    this.cart = {};
    sessionStorage.removeItem(this.CART_KEY);
  }

  // Devuelve una copia del carrito actual
  getCart() {
    return { ...this.cart };
  }
}
