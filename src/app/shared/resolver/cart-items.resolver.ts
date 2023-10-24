import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CartItemRO } from '@ro';
import { CartItemService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemsResolver implements Resolve<CartItemRO[]> {
  constructor(private readonly cartItemService: CartItemService) {}
  resolve(): Observable<CartItemRO[]> {
    this.cartItemService.getCartItems$().subscribe({
      next: (items) => {
        this.cartItemService.setCartItem$(items);
      },
    });
    return this.cartItemService.items$;
  }
}
