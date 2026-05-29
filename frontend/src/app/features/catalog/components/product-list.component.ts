import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';

interface ProductCard {
  id: number;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  img: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  selectedSort = 'Popularity';
  showFilters = false;
  readonly filters = {
    categories: ['Men', 'Women', 'Footwear', 'Beauty', 'Home'],
    brands: ['Roadster', 'H&M', 'Puma', 'Levis', 'Libas', 'Fossil'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
  };
  readonly products: ProductCard[] = [
    { id: 1, name: 'Solid Casual Shirt', brand: 'Roadster', price: 1299, mrp: 2599, rating: 4.3, img: 'https://picsum.photos/seed/prod1/400/520' },
    { id: 2, name: 'Slim Fit Jeans', brand: 'Levis', price: 1899, mrp: 2999, rating: 4.2, img: 'https://picsum.photos/seed/prod2/400/520' },
    { id: 3, name: 'Running Sneakers', brand: 'Puma', price: 2499, mrp: 3999, rating: 4.5, img: 'https://picsum.photos/seed/prod3/400/520' },
    { id: 4, name: 'Printed Kurta Set', brand: 'Libas', price: 1599, mrp: 2799, rating: 4.4, img: 'https://picsum.photos/seed/prod4/400/520' },
    { id: 5, name: 'Classic Wrist Watch', brand: 'Fossil', price: 4999, mrp: 7999, rating: 4.6, img: 'https://picsum.photos/seed/prod5/400/520' },
    { id: 6, name: 'Backpack 24L', brand: 'Wildcraft', price: 1199, mrp: 2199, rating: 4.1, img: 'https://picsum.photos/seed/prod6/400/520' }
  ];

  constructor(private cartService: CartService) {}

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  addToCart(product: ProductCard): void {
    this.cartService.add(product);
  }
}
