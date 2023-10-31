import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { OrderComponent } from '@modules/order/order.component';
import { OrderService } from '@service';
import { OrderRO } from '@ro';
import { OrderStatus } from '@constant';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [OrderComponent, NgFor, MatSelectModule, MatFormFieldModule],
})
export class OrderListComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  orders: OrderRO[];

  ngOnInit(): void {
    this.getOrders$();
  }

  getOrders$() {
    this.orderService.orders$.subscribe({
      next: (orders) => {
        this.orders = orders;
      },
    });
  }

  getCancelledOrders$() {
    this.orderService.getByMemberAndStatus$(OrderStatus.CANCELED).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
    });
  }
}
