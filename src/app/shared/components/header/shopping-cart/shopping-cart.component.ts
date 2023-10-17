import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { OrderService } from '@shared/services';

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
  ],
})
export class ShoppingCartComponent implements OnInit {
  faTrash = faTrash;
  constructor(
    private readonly orderService: OrderService, //private readonly toast: ToastCustomService,
  ) {}
  ngOnInit(): void {
    console.log('oke');
  }

  onChange(productId: string, $event: any) {
    // this.cartService.getCart$().subscribe({
    //   next: (cart) => {
    //     this.cartService
    //       .replaceAmount$(
    //         cart,
    //         productId,
    //         Number(($event.target as HTMLInputElement)?.value),
    //       )
    //       .subscribe({
    //         next: (response) => {
    //           console.log(response);
    //         },
    //       });
    //   },
    //   error: (error) => {
    //     this.toast.error('Something went wrong, try again later');
    //     throw error;
    //   },
    // });
  }

  removeCartItem(productId: string) {
    // this.cartService.getCart$().subscribe({
    //   next: (cart) => {
    //     this.cartService.removeFromCart$(cart, productId).subscribe();
    //   },
    //   error: (error) => {
    //     this.toast.error('Something went wrong, try again later');
    //     throw error;
    //   },
    // });
  }

  onCheckOut() {
    // const dto: CreateOrderHttpRequest = {
    //   cartId: this.cart.id,
    //   address: 'Just testing',
    //   totalPrice: this.cart.total_price,
    //   productIds: this.cart.items.map((item) => item.product_id),
    // };
    // this.orderService.checkOut$(dto).subscribe({
    //   next: (response) => {
    //     this.toast.success('Order placed successfully');
    //   },
    //   complete: () => {
    //     window.location.reload();
    //   },
    // });
  }
}
