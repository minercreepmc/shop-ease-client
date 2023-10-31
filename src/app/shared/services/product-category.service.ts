import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { ProductGetAllByCategoryDto } from '@dto';
import { ProductRO } from '@ro';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  constructor(private http: HttpClient) {}

  getProductsByCategory$(dto: ProductGetAllByCategoryDto) {
    return this.http.post<ProductRO[]>(
      ApiApplication.PRODUCT_CATEGORY.CONTROLLER +
        '/' +
        ApiApplication.PRODUCT_CATEGORY.GET_PRODUCTS_BY_CATEGORY,
      dto,
    );
  }
}
