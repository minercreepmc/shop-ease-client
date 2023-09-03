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
    private readonly authService: AuthService
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
      catchError(this.handleError)
    );
  }

  getCart$() {
    return this.http.get<V1GetCartHttpResponse>(this.getCartUrl);
  }

  updateCart$(dto: UpdateCartRequestDto) {
    return this.http.put<UpdateCartResponseDto>(this.updateCartUrl, dto);
  }

  addToCart$(currentCartValue: CartModel, product: ProductModel) {
    let updateCartRequest: UpdateCartRequestDto = {
      items: currentCartValue.items.map((item) => {
        return {
          productId: item.product.id,
          amount: item?.amount,
          price: item.product.price,
          cartId: currentCartValue.id,
        };
      }),
    };

    const updateCartRequestMap = new Map(
      updateCartRequest.items.map((item) => [item?.productId, item])
    );

    if (updateCartRequestMap.has(product.id)) {
      const existingItem = updateCartRequestMap.get(product.id)!;
      existingItem.amount += 1;
    } else {
      updateCartRequestMap.set(product.id, {
        productId: product.id,
        amount: 1,
        price: product.price,
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
            product_id: item.product.id,
            product: item.product,
            amount: item.amount,
            cartId: response.id,
          })),
        };
        this.cart.next(updateCart);
      }),
      catchError(this.handleError)
    );
  }

  removeFromCart$(currentCartValue: CartModel, productId: string) {
    let updateCartRequest: UpdateCartRequestDto = {
      items: currentCartValue.items.map((item) => {
        return {
          productId: item.product.id,
          amount: item?.amount,
          price: item.product.price,
          cartId: currentCartValue.id,
        };
      }),
    };

    const updateCartRequestMap = new Map(
      updateCartRequest.items.map((item) => [item?.productId, item])
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
            product_id: item.product.id,
            product: item.product,
            amount: item.amount,
            cartId: response.id,
          })),
        };
        this.cart.next(updateCart);
      })
    );
  }

  replaceAmount$(
    currentCartValue: CartModel,
    product: ProductModel,
    amount: number
  ) {
    let updateCartRequest: UpdateCartRequestDto = {
      items: currentCartValue.items.map((item) => {
        return {
          productId: item.product.id,
          amount: item?.amount,
          price: item.product.price,
          cartId: currentCartValue.id,
        };
      }),
    };

    const updateCartRequestMap = new Map(
      updateCartRequest.items.map((item) => [item?.productId, item])
    );

    updateCartRequestMap.set(product.id, {
      productId: product.id,
      amount: amount,
      price: product.price,
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
            product_id: item.product.id,
            product: item.product,
            amount: item.amount,
            cartId: response.id,
          })),
        };
        this.cart.next(updateCart);
      })
    );
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
