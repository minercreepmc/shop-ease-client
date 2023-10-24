import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { UpdateCartItemDto, UpsertCartItemDto } from '@dto';
import { CartItemRO } from '@ro';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient) {}

  private items = new BehaviorSubject<any[]>([]);

  get items$(): Observable<any[]> {
    return this.items.asObservable();
  }

  getCartItems$() {
    return this.http.post<CartItemRO[]>(
      ApiApplication.CART_ITEM.CONTROLLER +
        '/' +
        ApiApplication.CART_ITEM.GET_BY_USER_ID,
      {},
    );
  }

  setCartItem$(items: any) {
    this.items.next(items);
  }

  upsertCartItem$(dto: UpsertCartItemDto) {
    return this.http
      .post<CartItemRO>(
        ApiApplication.CART_ITEM.CONTROLLER +
          '/' +
          ApiApplication.CART_ITEM.UPSERT,
        dto,
      )
      .pipe(
        tap((item) => {
          this.items.next(
            this.items.value.map((i) =>
              i.productId === item.product_id ? item : i,
            ),
          );
        }),
      );
  }

  updateCartItem$(id: string, dto: UpdateCartItemDto) {
    return this.http
      .put(
        ApiApplication.CART_ITEM.CONTROLLER +
          '/' +
          ApiApplication.CART_ITEM.UPDATE.replace(':id', id),
        dto,
      )
      .pipe(
        tap(() => {
          this.items.next(
            this.items.value.map((item) =>
              item.id === id ? { ...item, ...dto } : item,
            ),
          );
        }),
      );
  }

  deleteCartItem$(id: string) {
    return this.http
      .delete(
        ApiApplication.CART_ITEM.CONTROLLER +
          '/' +
          ApiApplication.CART_ITEM.DELETE.replace(':id', id),
      )
      .pipe(
        tap(() => {
          this.items.next(this.items.value.filter((item) => item.id !== id));
        }),
      );
  }
}
