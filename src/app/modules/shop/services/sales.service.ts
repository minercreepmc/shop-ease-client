import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SaleItem } from './sale-item.model';

@Injectable({
  providedIn: 'root',
})
export class SalesService {
  private saleItems: SaleItem[] = [
    {
      id: 1,
      name: 'Item 1',
      price: 99.99,
      discount: 20, // Discount in percentage
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 2,
      name: 'Item 2',
      price: 89.99,
      discount: 15,
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 3,
      name: 'Item 3',
      price: 79.99,
      discount: 10,
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 4,
      name: 'Item 4',
      price: 69.99,
      discount: 25,
      imageUrl: 'assets/products/example-can.webp',
    },
    {
      id: 5,
      name: 'Item 5',
      price: 59.99,
      discount: 30,
      imageUrl: 'assets/products/example-can.webp',
    },
    // More items...
  ];

  getSaleItems(): Observable<SaleItem[]> {
    return of(this.saleItems);
  }
}
