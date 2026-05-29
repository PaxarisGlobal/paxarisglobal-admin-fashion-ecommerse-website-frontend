import { ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AuthService, AuthUser } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly cdr = inject(ChangeDetectorRef);
  private authSub?: { unsubscribe(): void };

  readonly promo = 'Color Rush Sale | Futuristic fashion edits live now | Free shipping over $49';
  readonly topCategories = ['Men', 'Women', 'Kids', 'Beauty', 'Footwear', 'Deals'];
  readonly megaMenu: Record<string, string[]> = {
    Men: ['T-Shirts', 'Shirts', 'Jeans', 'Footwear', 'Watches', 'Sportswear'],
    Women: ['Dresses', 'Tops', 'Kurtas', 'Heels', 'Handbags', 'Jewellery'],
    Kids: ['Boys Clothing', 'Girls Clothing', 'Infantwear', 'Toys', 'School'],
    Beauty: ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Grooming'],
    Footwear: ['Sneakers', 'Heels', 'Boots', 'Slides', 'Running'],
    Deals: ['Flash Sale', 'Clearance', 'New Offers', 'Bundle Deals'],
  };

  isAuthenticated = false;
  currentUser: AuthUser | null = null;
  profileMenuOpen = false;
  activeMegaMenu: string | null = null;
  cartCount = 0;

  ngOnInit(): void {
    this.syncAuthState();

    this.authSub = this.authService.currentUser$.subscribe(() => {
      this.syncAuthState();
      this.cdr.markForCheck();
    });

    this.cartService.items$.subscribe(items => {
      this.cartCount = items.reduce((total, item) => total + item.quantity, 0);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.authSub?.unsubscribe();
  }

  private syncAuthState(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.currentUser = this.authService.getCurrentUser();
    if (!this.isAuthenticated) {
      this.profileMenuOpen = false;
    }
  }

  profileLabel(user: AuthUser): string {
    return this.authService.displayName(user);
  }

  profileInitial(user: AuthUser): string {
    const label = this.profileLabel(user);
    return label ? label.charAt(0).toUpperCase() : '?';
  }

  toggleProfileMenu(event: Event): void {
    event.stopPropagation();
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  closeProfileMenu(): void {
    this.profileMenuOpen = false;
  }

  signOut(): void {
    this.closeProfileMenu();
    this.authService.logout();
  }

  openMegaMenu(category: string): void {
    this.activeMegaMenu = category;
  }

  closeMegaMenu(): void {
    this.activeMegaMenu = null;
  }
}
