import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { HomeComponent } from './features/home/components/home.component';
import { ProductListComponent } from './features/catalog/components/product-list.component';
import { ProductDetailComponent } from './features/catalog/components/product-detail.component';
import { CartComponent } from './features/experience/components/cart.component';
import { LoginComponent } from './features/experience/components/login.component';
import { SignupComponent } from './features/experience/components/signup.component';
import { CheckoutComponent } from './features/experience/components/checkout.component';
import { WishlistComponent } from './features/experience/components/wishlist.component';
import { AccountComponent } from './features/experience/components/account.component';
import { AdminComponent } from './features/experience/components/admin.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'auth/signup',
    component: SignupComponent,
    canActivate: [GuestGuard]
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
