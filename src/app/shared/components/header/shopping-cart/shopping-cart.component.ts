import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {
  CartModel,
  CartService,
  CreateOrderHttpRequest,
  OrderService,
  ProductModel,
  StorageService,
  ToastCustomService,
  ToastrCustomModule,
} from '@shared/services';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

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
    ToastrCustomModule,
  ],
  providers: [StorageService],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  faTrash = faTrash;
  cart: CartModel;
  cartSubscription: Subscription;
  constructor(
    private readonly cartService: CartService,
    private readonly orderService: OrderService,
    private readonly toast: ToastCustomService,
  ) {}
  ngOnInit(): void {
    this.cartSubscription = this.cartService.cart$.subscribe({
      next: (cart) => {
        console.log(cart);
        this.cart = cart;
      },
      error: (error) => {
        this.toast.error('Something went wrong, try again later');
        throw error;
      },
    });
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe();
  }

  onChange(productId: string, $event: any) {
    this.cartService.getCart$().subscribe({
      next: (cart) => {
        this.cartService
          .replaceAmount$(
            cart,
            productId,
            Number(($event.target as HTMLInputElement)?.value),
          )
          .subscribe({
            next: (response) => {
              console.log(response);
            },
          });
      },
      error: (error) => {
        this.toast.error('Something went wrong, try again later');
        throw error;
      },
    });
  }

  removeCartItem(productId: string) {
    this.cartService.getCart$().subscribe({
      next: (cart) => {
        this.cartService.removeFromCart$(cart, productId).subscribe();
      },
      error: (error) => {
        this.toast.error('Something went wrong, try again later');
        throw error;
      },
    });
  }

  onCheckOut() {
    const dto: CreateOrderHttpRequest = {
      cartId: this.cart.id,
      address: 'Just testing',
      totalPrice: this.cart.total_price,
      productIds: this.cart.items.map((item) => item.product_id),
    };
    this.orderService.checkOut$(dto).subscribe({
      next: (response) => {
        this.toast.success('Order placed successfully');
      },
      complete: () => {
        window.location.reload();
      },
    });
  }
}
