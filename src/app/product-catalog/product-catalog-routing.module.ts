import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCatalogComponent } from './product-catalog/product-catalog.component';

const routes: Routes = [
  {
    path: '',
    component: ProductCatalogComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCatalogRoutingModule {}
