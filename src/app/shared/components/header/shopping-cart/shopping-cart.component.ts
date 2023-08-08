import { AsyncPipe, NgClass, NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProductModel, ProductService } from '@shared/services';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss'],
  standalone: true,
  imports: [FontAwesomeModule, NgFor, AsyncPipe, NgClass, HttpClientModule],
  providers: [ProductService],
})
export class ShoppingCartComponent implements OnInit {
  products$: Observable<ProductModel[]>;
  faTrash = faTrash;
  constructor(private readonly productService: ProductService) {}

  ngOnInit() {
    this.products$ = this.productService
      .getProducts$({
        category_id: 'fbee020c-5e57-4073-886a-08105028678c',
      })
      .pipe(map((response) => response.products));
  }
}
