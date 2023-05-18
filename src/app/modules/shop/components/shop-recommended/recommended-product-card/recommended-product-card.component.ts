import { Component, Input } from '@angular/core';
import { ProductItem } from '@modules/shop/services/products';

@Component({
  selector: 'app-recommended-product-card',
  templateUrl: './recommended-product-card.component.html',
  styleUrls: ['./recommended-product-card.component.scss'],
})
export class RecommendedProductCardComponent {
  @Input() product!: ProductItem;
}
