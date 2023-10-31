import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { OrderRO } from '@ro';
import { OrderService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersByMemberResolver implements Resolve<OrderRO[]> {
  constructor(private orderService: OrderService) {}
  resolve(): Observable<OrderRO[]> {
    this.orderService.getByMemberAndStatus$().subscribe({
      next: (orders) => {
        this.orderService.setOrders$(orders);
      },
    });
    return this.orderService.orders$;
  }
}
