import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductItem } from './product-item.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private productItems: ProductItem[] = [
    {
      id: 1,
      name: 'Item 1',
      price: 99.99,
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 2,
      name: 'Item 2',
      price: 89.99,
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 3,
      name: 'Item 3',
      price: 79.99,
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 4,
      name: 'Item 4',
      price: 69.99,
      imageUrl: 'assets/products/example-can.webp',
    },
    // More items...
  ];

  getProductItems(): Observable<ProductItem[]> {
    return of(this.productItems);
  }
}
