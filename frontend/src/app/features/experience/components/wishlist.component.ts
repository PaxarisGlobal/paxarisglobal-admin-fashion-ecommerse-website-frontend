import { Component } from '@angular/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  readonly title = 'Wishlist';
  readonly highlights = ['Premium UX', 'Color-rich design', 'Connected flow'];
}
