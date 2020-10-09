import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListViewComponent } from './list-view/list-view.component';
import { ProductCatalogRoutingModule } from './product-catalog-routing.module';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

@NgModule({
  declarations: [ProductCatalogComponent, ListViewComponent],
  imports: [ProductCatalogRoutingModule, CommonModule],
  exports: [ProductCatalogComponent],
})
export class ProductCatalogModule {}
