import { Component } from '@angular/core';
import { CartItem, CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  items: CartItem[] = [];

  constructor(private cartService: CartService) {
    this.cartService.items$.subscribe(items => {
      this.items = items;
    });
  }

  get subtotal(): number {
    return this.items.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }

  get grandTotal(): number {
    return this.subtotal > 0 ? this.subtotal + 49 : 0;
  }

  increase(productId: number): void {
    this.cartService.increase(productId);
  }

  decrease(productId: number): void {
    this.cartService.decrease(productId);
  }

  remove(productId: number): void {
    this.cartService.remove(productId);
  }
}
