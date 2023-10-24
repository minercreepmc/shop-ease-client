import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { UpdateCartDto } from '@dto';
import { CartModel } from '@model';
import { CartRO } from '@ro';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  private detail = new BehaviorSubject<any>(null);

  get detail$() {
    return this.detail.asObservable();
  }

  setDetail$(detail: any) {
    this.detail.next(detail);
  }

  getDetail$(): Observable<CartRO> {
    return this.http.get<CartRO>(
      ApiApplication.CART.CONTROLLER + '/' + ApiApplication.CART.GET,
    );
  }

  updateCart$(dto: UpdateCartDto) {
    return this.http.put<CartRO>(
      ApiApplication.CART.CONTROLLER +
        '/' +
        ApiApplication.CART.UPDATE,
      dto,
    );
  }
}
