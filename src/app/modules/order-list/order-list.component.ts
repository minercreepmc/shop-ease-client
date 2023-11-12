import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { OrderComponent } from '@modules/order/order.component';
import { OrderService } from '@service';
import { OrderStatus } from '@constant';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { OrderGetAllDataRO } from '@ro';
import { OrderGetAllDto } from '@dto';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  standalone: true,
  imports: [
    OrderComponent,
    NgFor,
    MatSelectModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
})
export class OrderListComponent implements OnInit {
  orders: OrderGetAllDataRO[];
  pageEvent: PageEvent;
  totalItems: number;
  itemsPerPage = 5;
  page = 1;
  currentStatus = '';
  orderStatus = OrderStatus;
  constructor(
    private readonly orderService: OrderService,
    private readonly cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getOrderList({
      status: '',
      orderBy: 'created_at',
      direction: 'desc',
    });
  }

  getOrderList(dto: OrderGetAllDto) {
    this.orderService.getOrders$(dto).subscribe({
      next: (response) => {
        const { data, meta } = response;
        this.orders = data;
        this.totalItems = meta.totalItems;
        this.cd.detectChanges();
      },
    });
  }

  handlePageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    const previousIndex = event.previousPageIndex;
    const previousSize = pageSize * pageIndex;

    this.getNextData(previousSize, pageIndex, pageSize);
  }

  getNextData(currentSize: number, pageIndex: number, pageSize: number) {
    this.orderService
      .getOrders$({
        page: pageIndex + 1,
        limit: pageSize,
        status: this.currentStatus,
      })
      .subscribe({
        next: (response) => {
          const { data } = response;
          this.orders = data;
          this.itemsPerPage = pageSize;
          this.page = pageIndex + 1;
          this.cd.detectChanges();
        },
      });
  }

  onSelectionStatusChange($event: MatSelectChange) {
    this.getOrderList({
      status: $event.value,
      orderBy: 'created_at',
      direction: 'desc',
    });
  }
}
