import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  img: string;
}

export interface CartItem {
  product: CartProduct;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly storageKey = 'pf-cart-items';
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(this.loadItems());
  readonly items$ = this.itemsSubject.asObservable();

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  add(product: CartProduct): void {
    const items = [...this.items];
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.save(items);
  }

  increase(productId: number): void {
    this.save(this.items.map(item => item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
  }

  decrease(productId: number): void {
    this.save(
      this.items
        .map(item => item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
  }

  remove(productId: number): void {
    this.save(this.items.filter(item => item.product.id !== productId));
  }

  clear(): void {
    this.save([]);
  }

  private save(items: CartItem[]): void {
    this.itemsSubject.next(items);
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(items));
    } catch {
      // Keep the in-memory cart working if localStorage is blocked.
    }
  }

  private loadItems(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? JSON.parse(raw) as CartItem[] : [];
    } catch {
      return [];
    }
  }
}
