import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderModel, OrderService } from '@shared/services';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderModel[]>;
  constructor(private readonly orderService: OrderService) {}
  ngOnInit() {
    this.orders$ = this.orderService
      .getOrders$()
      .pipe(map((response) => response.orders));
  }
}
