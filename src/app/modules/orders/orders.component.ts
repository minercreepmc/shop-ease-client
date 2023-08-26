import { Component, OnInit } from '@angular/core';
import { OrderModel, OrderService } from '@shared/services';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderModel[]>;
  constructor(private readonly orderService: OrderService) {}
  ngOnInit() {}
}
