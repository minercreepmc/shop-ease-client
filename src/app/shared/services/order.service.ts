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
} from './order.service.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}
  private readonly createOrderUrlderUrl = v1ApiEndpoints.createOrder;
  private readonly getOrderUrl = v1ApiEndpoints.getOrder;

  getOrder$(query?: GetOrderHttpQuery): Observable<GetOrderHttpResponse> {
    return this.http.get<GetOrderHttpResponse>(this.getOrderUrl, {
      params: query as HttpParams,
    });
  }

  checkOut$(dto: CreateOrderHttpRequest): Observable<CreateOrderHttpResponse> {
    return this.http
      .post<CreateOrderHttpResponse>(this.createOrderUrlderUrl, dto)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => new HttpCustomException(error));
  }
}
