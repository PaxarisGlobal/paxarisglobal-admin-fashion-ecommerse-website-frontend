import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { CatalogModule } from './features/catalog/catalog.module';
import { CartComponent } from './features/experience/components/cart.component';
import { LoginComponent } from './features/experience/components/login.component';
import { SignupComponent } from './features/experience/components/signup.component';
import { CheckoutComponent } from './features/experience/components/checkout.component';
import { WishlistComponent } from './features/experience/components/wishlist.component';
import { AccountComponent } from './features/experience/components/account.component';
import { AdminComponent } from './features/experience/components/admin.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    CheckoutComponent,
    WishlistComponent,
    AccountComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    CatalogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
