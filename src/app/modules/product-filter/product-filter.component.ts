import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductModel, ProductService } from '@shared/services';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.scss'],
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  providers: [ProductService],
})
export class ProductFilterComponent implements OnInit {
  products$: Observable<ProductModel[]>;
  constructor(private readonly productService: ProductService) {}
  ngOnInit(): void {
    this.products$ = this.productService
      .getProducts$({
        category_id: '69a04751-4998-4fde-8efb-a7f777aca05a',
      })
      .pipe(map((response) => response.products));
  }
}
