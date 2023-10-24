import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { OrderItemGetByOrderIdDto } from '@dto/order-item.dto';
import { OrderItemRO } from '@ro';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService {
  constructor(private readonly http: HttpClient) {}
  private items = new BehaviorSubject<any>([]);
  get items$() {
    return this.items;
  }

  setItems$(items: any[]) {
    this.items.next(items);
  }

  getItems$(dto: OrderItemGetByOrderIdDto): Observable<OrderItemRO[]> {
    return this.http.post<OrderItemRO[]>(
      ApiApplication.ORDER_ITEM.CONTROLLER +
        '/' +
        ApiApplication.ORDER_ITEM.GET_BY_ORDER_ID,
      dto,
    );
  }
}
