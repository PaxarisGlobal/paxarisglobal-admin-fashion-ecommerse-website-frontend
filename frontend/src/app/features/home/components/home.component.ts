import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  readonly title = 'Fashion Ecommerce Website';
  readonly deals = [
    { title: 'Minimum 40% OFF', subtitle: 'Ethnicwear Picks', img: 'https://picsum.photos/seed/deal1/500/300' },
    { title: 'Sneaker Fest', subtitle: 'Top brands from $49', img: 'https://picsum.photos/seed/deal2/500/300' },
    { title: 'Beauty Bonanza', subtitle: 'Buy 2 Get 1', img: 'https://picsum.photos/seed/deal3/500/300' },
  ];
  readonly banners = [
    { title: 'Streetwear Drop', subtitle: 'Up to 60% OFF', cta: 'Shop Men' },
    { title: 'Style Refresh', subtitle: 'Curated looks for Women', cta: 'Shop Women' },
    { title: 'Beauty Picks', subtitle: 'Top brands this week', cta: 'Shop Beauty' },
  ];
  readonly chips = ['Summer Edit', 'New Arrivals', 'Trending', 'Ethnic', 'Sneakers', 'Beauty Deals'];
  readonly featured = [
    { label: 'Topwear', img: 'https://picsum.photos/seed/topwear/480/320' },
    { label: 'Footwear', img: 'https://picsum.photos/seed/footwear/480/320' },
    { label: 'Watches', img: 'https://picsum.photos/seed/watches/480/320' },
    { label: 'Home Decor', img: 'https://picsum.photos/seed/home/480/320' },
  ];
  readonly shopByCategory = [
    'Casual Shirts', 'Dresses', 'Sports Shoes', 'Watches', 'Handbags', 'Skincare', 'Kurta Sets', 'Home Decor'
  ];
  readonly featuredBrands = ['Roadster', 'H&M', 'Puma', 'Levis', 'ONLY', 'Fossil', 'Libas', 'Nike'];
}
