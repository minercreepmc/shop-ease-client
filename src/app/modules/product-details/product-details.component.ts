import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { numberFormat } from '@constant';
import { CreateCartItemDto } from '@dto';
import { ProductGalleryComponent } from '@modules/product-gallery/product-gallery.component';
import { ProductRO } from '@ro';
import { ToastrCustomService } from '@service';
import { CartItemService } from '@service/cart-item.service';
import { ButtonComponent } from '@shared/components/button/button.component';
import { handleError } from '@shared/utils';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone: true,
  imports: [ProductGalleryComponent, DecimalPipe, ButtonComponent, FormsModule],
})
export class ProductDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartItemService: CartItemService,
    private toast: ToastrCustomService,
  ) {}
  product: ProductRO;
  numberFormat = numberFormat;

  createCartItemDto = new CreateCartItemDto();
  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
    this.createCartItemDto.productId = this.product.id;
  }

  printCategoryNames() {
    console.log(this.product);
    return this.product.categories.map((c) => c.name).join('| ');
  }

  upsertToCart() {
    this.cartItemService.upsertCartItem$(this.createCartItemDto).subscribe({
      next: () => {
        this.toast.success('Đã thêm vào giỏ');
      },
      error: (e) => {
        handleError(e, this.toast);
      },
    });
  }
}
