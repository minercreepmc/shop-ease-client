import { Component, Input } from '@angular/core';
import { ProductItem } from '@modules/shop/services/products';

@Component({
  selector: 'app-featured-block',
  templateUrl: './featured-block.component.html',
  styleUrls: ['./featured-block.component.scss'],
})
export class FeaturedBlockComponent {
  @Input() categoryName!: string;
  @Input() products!: ProductItem[] | null;
}
