import { AsyncPipe, DecimalPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { numberFormat } from '@constant';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CartModel } from '@model';
import { CheckoutDialogComponent } from '@modules/checkout-dialog/checkout-dialog.component';
import { CartItemRO, CartRO } from '@ro';
import { CartItemService } from '@service/cart-item.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import {
  CartService,
  OrderService,
  ToastrCustomService,
} from '@shared/services';
import { handleError } from '@shared/utils';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [
    FontAwesomeModule,
    NgFor,
    NgIf,
    AsyncPipe,
    NgClass,
    HttpClientModule,
    ButtonComponent,
    DecimalPipe,
  ],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private cartItemService: CartItemService,
    private cartService: CartService,
    private dialog: MatDialog,
    private orderService: OrderService,
    private toast: ToastrCustomService,
  ) {}
  faTrash = faTrash;
  numberFormat = numberFormat;
  items: CartItemRO[] = [];
  detail: CartRO;

  ngOnInit(): void {
    this.cartItemService.items$.subscribe({
      next: (items) => {
        this.items = items;
      },
    });
    this.cartService.detail$.subscribe({
      next: (detail) => {
        this.detail = detail;
      },
    });
  }

  onAmountChange(event: any, itemId: string) {
    this.cartItemService
      .updateCartItem$(itemId, {
        amount: event.target.value,
      })
      .subscribe({
        complete: () => {
          this.getTotalPrice();
        },
      });
  }

  deleteItem(id: string) {
    this.cartItemService.deleteCartItem$(id).subscribe();
  }

  confirmCheckout() {
    this.dialog
      .open(CheckoutDialogComponent)
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.createOrder();
          }
        },
      });
  }
  createOrder() {
    this.orderService.createOrder$().subscribe({
      next: () => {
        this.toast.success('Đặt hàng thành công');
      },
      error: (e) => {
        handleError(e, this.toast);
      },
      complete: () => {
        window.location.reload();
      },
    });
  }

  getTotalPrice() {
    this.cartService.getDetail$().subscribe({
      next: (detail) => {
        this.cartService.setDetail$(detail);
      },
    });
  }
}
