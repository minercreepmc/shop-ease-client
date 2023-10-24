import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderComponent } from '@modules/order/order.component';
import { OrderRO } from '@ro';
import { OrderService } from '@service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [OrderComponent, NgFor],
})
export class OrderListComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  orders: OrderRO[];

  ngOnInit(): void {
    this.orderService.orders$.subscribe({
      next: (orders) => {
        this.orders = orders;
      },
    });
  }
}
