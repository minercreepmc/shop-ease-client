import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { OrderStatus, numberFormat } from '@constant';
import { OrderItemComponent } from '@modules/order-item/order-item.component';
import { OrderItemRO, OrderRO } from '@ro';
import {
  OrderItemService,
  OrderService,
  ShippingStatusService,
} from '@service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    OrderItemComponent,
    NgFor,
    DecimalPipe,
    NgIf,
    AsyncPipe,
  ],
})
export class OrderComponent implements OnInit {
  constructor(
    private orderItemService: OrderItemService,
    private shippingStatusService: ShippingStatusService,
    private dialog: MatDialog,
    private orderService: OrderService,
  ) {}
  @Input() order = new OrderRO();
  items: OrderItemRO[] = [];

  numberFormat = numberFormat;
  private statusMessageSubject = new BehaviorSubject<string>('');

  statusMessage$ = this.statusMessageSubject.asObservable();

  ngOnInit(): void {
    this.orderItemService
      .getItems$({
        orderId: this.order.id,
      })
      .subscribe({
        next: (items) => {
          this.items = items;
        },
      });

    this.getOrderStatusMessage();
  }

  getOrderStatusMessage() {
    switch (this.order.status) {
      case OrderStatus.PROCESSING:
        this.statusMessageSubject.next('Đơn hàng của bạn đang được xử lý.');
        break;
      case OrderStatus.ASSIGNED:
        this.statusMessageSubject.next('Đơn hàng của bạn đã giao cho shipper.');
        break;
      case OrderStatus.ACCEPTED:
        this.statusMessageSubject.next(
          'Đơn hàng của bạn đã được shipper nhận.',
        );
        break;
      case OrderStatus.DELIVERING:
        this.getShippingStatusMessage().subscribe((data) => {
          this.statusMessageSubject.next(data[0].status);
        });
        break;
      case OrderStatus.DELIVERED:
        this.statusMessageSubject.next('Đơn hàng đã được giao');
        break;
      default:
        this.statusMessageSubject.next('');
        break;
    }
  }

  getShippingStatusMessage() {
    return this.shippingStatusService.getByOrder$(this.order.id);
  }

  cancelShow() {
    return this.order.status === OrderStatus.PROCESSING;
  }

  confirmShow() {
    return this.order.status === OrderStatus.DELIVERED;
  }

  statusShow() {
    return this.order.status !== OrderStatus.COMPLETED;
  }

  confirmClick() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.orderService
              .updateOrder$(this.order.id, {
                status: OrderStatus.COMPLETED,
              })
              .subscribe({
                next: () => {
                  window.location.reload();
                },
              });
          }
        },
      });
  }

  cancelClick() {
    this.dialog
      .open(ConfirmDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.orderService
              .updateOrder$(this.order.id, {
                status: OrderStatus.CANCELED,
              })
              .subscribe({
                next: () => {
                  window.location.reload();
                },
              });
          }
        },
      });
  }
}
