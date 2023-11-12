import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '@modules/home/home.component';
import {
  AddressesResolver,
  CartDetailResolver,
  CategoriesResolver,
  ProductResolver,
  ProductsResolver,
  ProfileResolver,
  ShippingFeesResolver,
} from '@shared/resolver';
import { CartItemsResolver } from '@shared/resolver/cart-items.resolver';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      items: CartItemsResolver,
      addresses: AddressesResolver,
      detail: CartDetailResolver,
      shippingFees: ShippingFeesResolver,
    },
  },
  {
    path: 'shop',
    resolve: {
      products: ProductsResolver,
      categories: CategoriesResolver,
      addresses: AddressesResolver,
      items: CartItemsResolver,
      detail: CartDetailResolver,
      shippingFees: ShippingFeesResolver,
    },
    loadComponent: () =>
      import('./modules/shop/shop.component').then((m) => m.ShopComponent),
  },
  {
    path: 'shop/:id',
    resolve: {
      product: ProductResolver,
      items: CartItemsResolver,
      addresses: AddressesResolver,
      detail: CartDetailResolver,
      shippingFees: ShippingFeesResolver,
    },
    loadComponent: () =>
      import('./modules/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
  },
  {
    path: 'profile',
    resolve: {
      profile: ProfileResolver,
      addresses: AddressesResolver,
      items: CartItemsResolver,
      detail: CartDetailResolver,
      shippingFees: ShippingFeesResolver,
    },
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
