import { Component } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  selectedImage = 'https://picsum.photos/seed/prod-detail-main/700/900';
  readonly gallery = [
    'https://picsum.photos/seed/prod-detail-main/700/900',
    'https://picsum.photos/seed/prod-detail-2/700/900',
    'https://picsum.photos/seed/prod-detail-3/700/900',
    'https://picsum.photos/seed/prod-detail-4/700/900',
  ];
  readonly sizes = ['XS', 'S', 'M', 'L', 'XL'];
  selectedSize = 'M';
}
