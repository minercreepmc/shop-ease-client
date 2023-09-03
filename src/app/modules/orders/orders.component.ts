import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderStatusEnum } from '@api/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { OrderModel, OrderService, ToastCustomService } from '@shared/services';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  standalone: true,
  imports: [NgIf, NgFor, AsyncPipe, FontAwesomeModule],
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderModel[]>;
  faTimes = faTimes;
  constructor(
    private readonly orderService: OrderService,
    private readonly toast: ToastCustomService
  ) {}
  ngOnInit() {
    this.orders$ = this.orderService
      .getOrders$()
      .pipe(map((response) => response.orders));
  }

  onCancelShow(status: string) {
    return status !== OrderStatusEnum.CANCELED;
  }
  onCancelOrder(id: string) {
    console.log(id);
    this.orderService
      .updateOrder$(id, { status: OrderStatusEnum.CANCELED })
      .subscribe({
        complete: () => {
          this.orders$ = this.orderService
            .getOrders$()
            .pipe(map((response) => response.orders));
          this.toast.success('Order canceled successfully');
        },
      });
  }
}
