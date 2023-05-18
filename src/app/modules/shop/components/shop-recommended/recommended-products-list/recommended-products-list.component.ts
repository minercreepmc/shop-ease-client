import { Component, OnInit } from '@angular/core';
import { ProductItem, ProductsService } from '@modules/shop/services/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-recommended-products-list',
  templateUrl: './recommended-products-list.component.html',
  styleUrls: ['./recommended-products-list.component.scss'],
})
export class RecommendedProductsListComponent implements OnInit {
  productItems$!: Observable<ProductItem[]>;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productItems$ = this.productService.getProductItems();
  }
}
