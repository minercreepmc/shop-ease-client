import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { ShippingMethodGetAllRO } from '@ro/shipping-method.ro';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingMethodService {
  constructor(private http: HttpClient) {}
  private methods = new BehaviorSubject<any[]>([]);

  get methods$(): Observable<any[]> {
    return this.methods.asObservable();
  }

  setMethods(methods: any[]) {
    this.methods.next(methods);
  }

  getMethods$() {
    return this.http.get<ShippingMethodGetAllRO>(
      ApiApplication.SHIPPING_METHOD.CONTROLLER +
        '/' +
        ApiApplication.SHIPPING_METHOD.GET_ALL,
    );
  }
}
