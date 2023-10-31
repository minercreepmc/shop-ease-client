import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '@modules/product-card/product-card.component';
import { ProductRO } from '@ro';
import { ToastrCustomService } from '@service';
import { CartItemService } from '@service/cart-item.service';
import { handleError } from '@shared/utils';

@Component({
  selector: 'app-shop-products',
  templateUrl: './shop-products.component.html',
  styleUrls: ['./shop-products.component.scss'],
  standalone: true,
  imports: [
    ProductCardComponent,
    NgFor,
    RouterLink,
    MatFormFieldModule,
    MatSelectModule,
  ],
})
export class ShopProductsComponent {
  constructor(
    private cartItemService: CartItemService,
    private toast: ToastrCustomService,
  ) {}
  @Input() products: ProductRO[] = [];

  upsertToCart(productId: string) {
    this.cartItemService
      .upsertCartItem$({
        productId,
        amount: 1,
      })
      .subscribe({
        next: () => {
          this.toast.success('Added to cart');
        },
        error: (e) => {
          handleError(e, this.toast);
        },
      });
  }
}
