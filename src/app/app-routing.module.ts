import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auto-complete',
  },
  {
    path: 'auto-complete',
    loadChildren: () =>
      import('./auto-complete/auto-complete.module').then(m => m.AutoCompleteModule),
  },
  {
    path: 'log',
    loadChildren: () => import('./log/log.module').then(m => m.LogModule),
  },
  {
    path: 'product-catalog',
    loadChildren: () =>
      import('./product-catalog/product-catalog.module').then(m => m.ProductCatalogModule),
  },
  {
    path: 'store-like',
    loadChildren: () => import('./store-like/store-like.module').then(m => m.StoreLikeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
