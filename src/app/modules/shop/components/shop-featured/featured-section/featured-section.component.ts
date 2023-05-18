import { Component, OnInit } from '@angular/core';
import { ProductItem, ProductsService } from '@modules/shop/services/products';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-featured-section',
  templateUrl: './featured-section.component.html',
})
export class FeaturedSectionComponent implements OnInit {
  constructor(private readonly productsService: ProductsService) {}
  firstProducts$!: Observable<ProductItem[]>;
  firstCategory = 'Black Coffee';
  secondProducts$!: Observable<ProductItem[]>;
  secondCategory = 'Milk Coffee';

  ngOnInit(): void {
    this.firstProducts$ = this.productsService.getProductItems();
    this.secondProducts$ = this.productsService.getProductItems();
  }
}
