import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  HttpCustomException,
  v1ApiEndpoints,
  V1GetCategoryHttpQuery,
  V1GetCategoryHttpResponse,
} from '@api/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GetCategoriesHttpRequest } from './category.service.dto';
import {
  CategoryModel,
  GetCategoriesHttpResponse,
} from './category.service.dto';

@Injectable()
export class CategoryService {
  private getAllUrl = v1ApiEndpoints.getCategories;
  private getCategoryUrl = v1ApiEndpoints.getCategory;

  getCategories$(
    query?: GetCategoriesHttpRequest
  ): Observable<GetCategoriesHttpResponse> {
    return this.http
      .get<GetCategoriesHttpResponse>(this.getAllUrl, {
        params: query as HttpParams,
      })
      .pipe(catchError(this.handleError));
  }

  getCategory$(id: string): Observable<V1GetCategoryHttpResponse> {
    const url = this.getCategoryUrl.replace(':id', id);

    return this.http
      .get<CategoryModel>(url, {})
      .pipe(catchError(this.handleError));
  }

  getCategoryWithProducts$(id: string): Observable<V1GetCategoryHttpResponse> {
    const url = this.getCategoryUrl.replace(':id', id);

    const query: V1GetCategoryHttpQuery = {
      populate_products: true,
    };

    return this.http.get<V1GetCategoryHttpResponse>(url, {
      params: query as HttpParams,
    });
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(private readonly http: HttpClient) {}
}
