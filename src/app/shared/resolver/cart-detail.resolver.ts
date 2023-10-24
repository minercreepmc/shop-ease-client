import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { CartModel } from '@model';
import { CartService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartDetailResolver implements Resolve<CartModel> {
  constructor(private cartService: CartService) {}
  resolve(): Observable<CartModel> {
    this.cartService.getDetail$().subscribe({
      next: (cart) => {
        this.cartService.setDetail$(cart);
      },
    });

    return this.cartService.detail$;
  }
}
