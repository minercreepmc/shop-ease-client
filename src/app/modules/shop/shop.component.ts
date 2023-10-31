import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CategoryModel } from '@model';
import { ShopProductsComponent } from '@modules/shop-products/shop-products.component';
import { ProductRO } from '@ro';
import {
  CategoryService,
  ProductCategoryService,
  ProductService,
} from '@service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  standalone: true,
  imports: [ShopProductsComponent, MatFormFieldModule, MatSelectModule, NgFor],
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private productCategoryService: ProductCategoryService,
  ) {}
  products: ProductRO[] = [];
  categories: CategoryModel[] = [];

  ngOnInit() {
    this.productService.products$.subscribe({
      next: (products) => {
        this.products = products;
      },
    });

    this.categoryService.getCategories$().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
    });
  }

  getProductsByCategory(categoryId: string) {
    this.productCategoryService
      .getProductsByCategory$({ categoryId })
      .subscribe({
        next: (products) => {
          this.products = products;
        },
      });
  }
}
