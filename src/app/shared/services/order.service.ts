import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpCustomException, v1ApiEndpoints } from '@api/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  CreateOrderHttpRequest,
  CreateOrderHttpResponse,
  GetOrderHttpQuery,
  GetOrderHttpResponse,
  GetOrdersHttpQuery,
  GetOrdersHttpResponse,
  UpdateOrderHttpRequest,
  UpdateOrderHttpResponse,
} from './order.service.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}
  private readonly createOrderUrlderUrl = v1ApiEndpoints.createOrder;
  private readonly getOrderUrl = v1ApiEndpoints.getOrder;
  private readonly getOrdersUrl = v1ApiEndpoints.getOrders;
  private readonly updateOrderUrl = v1ApiEndpoints.updateOrder;

  getOrder$(query?: GetOrderHttpQuery): Observable<GetOrderHttpResponse> {
    return this.http.get<GetOrderHttpResponse>(this.getOrderUrl, {
      params: query as HttpParams,
    });
  }

  getOrders$(query?: GetOrdersHttpQuery): Observable<GetOrdersHttpResponse> {
    return this.http.get<GetOrdersHttpResponse>(this.getOrdersUrl, {
      params: query as HttpParams,
    });
  }

  checkOut$(dto: CreateOrderHttpRequest): Observable<CreateOrderHttpResponse> {
    return this.http
      .post<CreateOrderHttpResponse>(this.createOrderUrlderUrl, dto)
      .pipe(catchError(this.handleError));
  }

  updateOrder$(
    id: string,
    dto: UpdateOrderHttpRequest
  ): Observable<UpdateOrderHttpResponse> {
    return this.http
      .put<UpdateOrderHttpResponse>(this.updateOrderUrl.replace(':id', id), dto)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
