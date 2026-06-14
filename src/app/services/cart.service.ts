import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  
  constructor() {
    this.loadCart();
  }

  private loadCart(): void {
    const saved = localStorage.getItem('techhub-cart');
    if (saved) {
      try {
        this.cart = JSON.parse(saved);
        this.cartSubject.next(this.cart);
      } catch {
        this.cart = [];
      }
    }
  }

  private saveCart(): void {
    localStorage.setItem('techhub-cart', JSON.stringify(this.cart));
    this.cartSubject.next(this.cart);
  }

  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  getCartItems(): CartItem[] {
    return this.cart;
  }

  addToCart(product: Product, quantity: number = 1): void {
    const existing = this.cart.find(item => item.product.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      this.cart.push({ product, quantity });
    }
    
    this.saveCart();
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.product.id !== productId);
    this.saveCart();
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cart.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  clearCart(): void {
    this.cart = [];
    this.saveCart();
  }

  getTotal(): number {
    return this.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  getItemsCount(): number {
    return this.cart.reduce((count, item) => count + item.quantity, 0);
  }
}
