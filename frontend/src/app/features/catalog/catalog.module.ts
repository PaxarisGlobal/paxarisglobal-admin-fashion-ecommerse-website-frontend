import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list.component';
import { ProductDetailComponent } from './components/product-detail.component';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [ProductListComponent, ProductDetailComponent]
})
export class CatalogModule {}
