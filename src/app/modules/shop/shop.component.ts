import { Component, OnInit } from '@angular/core';
import { ShopProductsComponent } from '@modules/shop-products/shop-products.component';
import { ProductRO } from '@ro';
import { ProductService } from '@service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  standalone: true,
  imports: [ShopProductsComponent],
})
export class ShopComponent implements OnInit {
  constructor(private productService: ProductService) {}
  products: ProductRO[] = [];

  ngOnInit() {
    this.productService.products$.subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }
}
