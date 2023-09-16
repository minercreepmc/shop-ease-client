import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException, v1ApiEndpoints } from '@api/http';
import { createFormData } from '@shared/utils';
import {
  BehaviorSubject,
  catchError,
  first,
  Observable,
  tap,
  throwError,
} from 'rxjs';
import {
  CreateProductRequestDto,
  CreateProductResponseDto,
  GetProductQueryDto,
  GetProductResponseDto,
  GetProductsQuery,
  GetProductsResponseDto,
  ProductModel,
  RemoveProductsRequestDto,
  RemoveProductsResponseDto,
  UpdateProductRequestDto,
  UpdateProductResponseDto,
} from './product.service.dto';

@Injectable()
export class ProductService {
  // TODO: setup proxy later;
  createUrl = v1ApiEndpoints.createProduct;
  removeUrl = v1ApiEndpoints.removeProducts;
  getAllUrl = v1ApiEndpoints.getProducts;
  getUrl = v1ApiEndpoints.getProduct;
  updateUrl = v1ApiEndpoints.updateProduct;

  readonly products = new BehaviorSubject<ProductModel[]>([]);

  get products$(): Observable<ProductModel[]> {
    return this.products.asObservable();
  }

  loadProducts$(): Observable<GetProductsResponseDto> {
    const productGetting$ = this.getProducts$().pipe(
      tap((response: GetProductsResponseDto) =>
        this.products.next(response.products),
      ),
    );

    return productGetting$;
  }

  getProducts$(query?: GetProductsQuery): Observable<GetProductsResponseDto> {
    console.log(query);
    return this.http
      .get<GetProductsResponseDto>(this.getAllUrl, {
        params: query as HttpParams,
      })
      .pipe(catchError(this.handleError));
  }

  getProduct$(id: string): Observable<GetProductResponseDto> {
    const url = this.getUrl.replace(':id', id);
    const query: GetProductQueryDto = {
      populate_details: true,
    };
    return this.http.get<GetProductResponseDto>(url, {
      params: query as HttpParams,
    });
  }

  createProduct$(
    dto: CreateProductRequestDto,
  ): Observable<CreateProductResponseDto> {
    const formData = createFormData({
      dto,
    });

    const response$ = this.http.post<CreateProductResponseDto>(
      this.createUrl,
      formData,
    );

    return response$.pipe(
      first(),
      tap((response: CreateProductResponseDto) => {
        const newProduct = response;
        this.products.next([...this.products.value, newProduct]);
      }),
      catchError(this.handleError),
    );
  }

  removeProducts$(ids: string[]): Observable<RemoveProductsResponseDto> {
    const request: RemoveProductsRequestDto = {
      ids,
    };
    const productRemoving$ = this.http.post<RemoveProductsResponseDto>(
      this.removeUrl,
      request,
    );

    return productRemoving$.pipe(
      tap((response: RemoveProductsResponseDto) => {
        const { ids: deletedIds } = response;
        this.products.next(
          this.products.value.filter(
            (product) => !deletedIds.includes(product.id!),
          ),
        );
      }),

      catchError(this.handleError),
    );
  }

  updateProduct$(
    dto: UpdateProductRequestDto,
  ): Observable<UpdateProductResponseDto> {
    const formData = createFormData({
      dto,
    });
    const url = this.updateUrl.replace(':id', dto.id);

    return this.http.put<UpdateProductResponseDto>(url, formData);
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }

  constructor(private readonly http: HttpClient) {}
}
