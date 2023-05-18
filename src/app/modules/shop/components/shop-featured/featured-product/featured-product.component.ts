import { Component, Input } from '@angular/core';
import { ProductItem } from '@modules/shop/services/products';

@Component({
  selector: 'app-featured-product',
  templateUrl: './featured-product.component.html',
  styleUrls: ['./featured-product.component.scss'],
})
export class FeaturedProductComponent {
  @Input() product!: ProductItem;
}
