import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { UpsertCartItemDto } from '@dto';
import { BehaviorSubject, Observable } from 'rxjs';

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
    return this.http.post(
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
    return this.http.post(
      ApiApplication.CART_ITEM.CONTROLLER +
        '/' +
        ApiApplication.CART_ITEM.UPSERT,
      dto,
    );
  }
}
