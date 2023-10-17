import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import {
  CategoriesResolver,
  ProductResolver,
  ProductsResolver,
} from '@shared/resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'shop',
    resolve: {
      products: ProductsResolver,
      categories: CategoriesResolver,
    },
    loadComponent: () =>
      import('./modules/shop/shop.component').then((m) => m.ShopComponent),
  },
  {
    path: 'shop/:id',
    resolve: {
      product: ProductResolver,
    },
    loadComponent: () =>
      import('./modules/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
