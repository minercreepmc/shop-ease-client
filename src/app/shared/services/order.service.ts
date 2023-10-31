import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication, OrderStatus } from '@constant';
import { OrderRO } from '@ro';
import { UpdateOrderDto } from '@dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderModel } from '@model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private readonly http: HttpClient) {}
  private orders = new BehaviorSubject<OrderRO[]>([]);
  get orders$() {
    return this.orders;
  }

  setOrders$(orders: OrderRO[]) {
    this.orders.next(orders);
  }

  getOrder$(id: string): Observable<OrderRO> {
    return this.http.get<OrderRO>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.GET_ONE.replace(':orderId', id),
    );
  }

  getByMemberAndStatus$(status?: OrderStatus): Observable<OrderRO[]> {
    let params: HttpParams | undefined = undefined;

    if (status) {
      params = new HttpParams({
        fromObject: { status: status as string },
      });
    }

    return this.http.post<OrderRO[]>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.GET_BY_MEMBER,
      {},
      {
        params,
      },
    );
  }

  updateOrder$(id: string, dto: UpdateOrderDto): Observable<OrderModel> {
    return this.http.put<OrderModel>(
      ApiApplication.ORDER.CONTROLLER +
        '/' +
        ApiApplication.ORDER.UPDATE.replace(':id', id),
      dto,
    );
  }

  getOrders$(): Observable<OrderRO[]> {
    return this.http.get<OrderRO[]>(
      ApiApplication.ORDER.CONTROLLER + '/' + ApiApplication.ORDER.GET_ALL,
    );
  }

  createOrder$(): Observable<OrderModel> {
    return this.http.post<OrderModel>(
      ApiApplication.ORDER.CONTROLLER + '/' + ApiApplication.ORDER.CREATE,
      {},
    );
  }
}
