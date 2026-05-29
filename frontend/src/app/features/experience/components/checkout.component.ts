import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  readonly title = 'Checkout';
  readonly highlights = ['Premium UX', 'Color-rich design', 'Connected flow'];
}
