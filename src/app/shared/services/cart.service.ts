import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException, v1ApiEndpoints } from '@api/http';
import { V1GetCartHttpResponse } from '@api/http/v1';
import { catchError, Subject, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import {
  CartModel,
  GetCartResponseDto,
  UpdateCartRequestDto,
  UpdateCartResponseDto,
} from './cart.service.dto';
import { ProductModel } from './product.service.dto';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService,
  ) {
    this.authService.isLoggedIn$().subscribe({
      next: (response) => {
        if (response) {
          this.loadCart$().subscribe();
        }
      },
    });
  }
  getCartUrl = v1ApiEndpoints.getCart;
  updateCartUrl = v1ApiEndpoints.updateCart;

  readonly cart = new Subject<CartModel>();

  get cart$() {
    return this.cart.asObservable();
  }

  loadCart$() {
    return this.getCart$().pipe(
      tap((response: GetCartResponseDto) => {
        this.cart.next(response);
      }),
      catchError(this.handleError),
    );
  }

  getCart$() {
    return this.http.get<V1GetCartHttpResponse>(this.getCartUrl);
  }

  updateCart$(dto: UpdateCartRequestDto) {
    console.log(dto);
    return this.http.put<UpdateCartResponseDto>(this.updateCartUrl, dto);
  }

  addToCart$(currentCartValue: CartModel, productId: string) {
    let updateCartRequest: UpdateCartRequestDto = {
      items: currentCartValue.items.map((item) => {
        return {
          productId: item.product_id,
          amount: item?.amount,
          cartId: currentCartValue.id,
        };
      }),
    };

    const updateCartRequestMap = new Map(
      updateCartRequest.items.map((item) => [item?.productId, item]),
    );

    if (updateCartRequestMap.has(productId)) {
      const existingItem = updateCartRequestMap.get(productId)!;
      existingItem.amount += 1;
    } else {
      updateCartRequestMap.set(productId, {
        productId,
        amount: 1,
        cartId: currentCartValue.id,
      });
    }

    updateCartRequest = {
      items: Array.from(updateCartRequestMap.values()),
    };

    return this.updateCart$(updateCartRequest).pipe(
      tap((response) => {
        const updateCart = {
          id: response.id,
          total_price: response.totalPrice,
          user_id: response.userId,
          items: response.items.map((item) => ({
            product_id: item.productId,
            name: item.name,
            price: item.price,
            image_url: item.imageUrl,
            discount: item.discount,
            total_price: item.totalPrice,
            amount: item.amount,
            cartId: response.id,
          })),
        };
        this.cart.next(updateCart);
      }),
    );
  }

  removeFromCart$(currentCartValue: CartModel, productId: string) {
    let updateCartRequest: UpdateCartRequestDto = {
      items: currentCartValue.items.map((item) => {
        return {
          productId: item.product_id,
          amount: item?.amount,
          price: item.price,
          cartId: currentCartValue.id,
        };
      }),
    };

    const updateCartRequestMap = new Map(
      updateCartRequest.items.map((item) => [item?.productId, item]),
    );

    updateCartRequestMap.delete(productId);

    updateCartRequest = {
      items: Array.from(updateCartRequestMap.values()),
    };

    return this.updateCart$(updateCartRequest).pipe(
      tap((response) => {
        const updateCart = {
          id: response.id,
          total_price: response.totalPrice,
          user_id: response.userId,
          items: response.items.map((item) => ({
            product_id: item.productId,
            amount: item.amount,
            total_price: item.totalPrice,
            price: item.price,
            discount: item.discount,
            cartId: response.id,
            name: item.name,
          })),
        };
        this.cart.next(updateCart);
      }),
    );
  }

  replaceAmount$(
    currentCartValue: CartModel,
    productId: string,
    amount: number,
  ) {
    let updateCartRequest: UpdateCartRequestDto = {
      items: currentCartValue.items.map((item) => {
        return {
          productId: item.product_id,
          amount: item?.amount,
          price: item.price,
          cartId: currentCartValue.id,
        };
      }),
    };

    const updateCartRequestMap = new Map(
      updateCartRequest.items.map((item) => [item?.productId, item]),
    );

    updateCartRequestMap.set(productId, {
      productId,
      amount: amount,
      cartId: currentCartValue.id,
    });

    updateCartRequest = {
      items: Array.from(updateCartRequestMap.values()),
    };

    return this.updateCart$(updateCartRequest).pipe(
      tap((response) => {
        const updateCart = {
          id: response.id,
          total_price: response.totalPrice,
          user_id: response.userId,
          items: response.items.map((item) => ({
            product_id: item.productId,
            amount: item.amount,
            total_price: item.totalPrice,
            price: item.price,
            discount: item.discount,
            cartId: response.id,
            name: item.name,
          })),
        };
        this.cart.next(updateCart);
      }),
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error);
    return throwError(() => new HttpCustomException(error));
  }
}
