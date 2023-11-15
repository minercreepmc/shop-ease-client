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
import { ProfileFormComponent } from '@modules/profile-form/profile-form.component';
import { AddressFormComponent } from '@modules/address-form/address-form.component';
import { OrderListComponent } from '@modules/order-list/order-list.component';
import { ShippingMethodsResolver } from '@shared/resolver/shipping-methods.resolver';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      items: CartItemsResolver,
      addresses: AddressesResolver,
      detail: CartDetailResolver,
      shippingFees: ShippingFeesResolver,
      shippingMethods: ShippingMethodsResolver,
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
      shippingMethods: ShippingMethodsResolver,
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
      shippingMethods: ShippingMethodsResolver,
    },
    loadComponent: () =>
      import('./modules/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent,
      ),
  },
  {
    path: 'profile',
    resolve: {
      items: CartItemsResolver,
      detail: CartDetailResolver,
      shippingFees: ShippingFeesResolver,
      shippingMethods: ShippingMethodsResolver,
    },
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./modules/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    children: [
      {
        path: 'info',
        component: ProfileFormComponent,
        resolve: {
          profile: ProfileResolver,
        },
      },
      {
        path: 'address',
        component: AddressFormComponent,
        resolve: {
          addresses: AddressesResolver,
        },
      },
      {
        path: 'order',
        component: OrderListComponent,
      },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
