import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ShippingMethodDataRO } from '@ro/shipping-method.ro';
import { ShippingMethodService } from '@service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShippingMethodsResolver
  implements Resolve<ShippingMethodDataRO[]>
{
  constructor(private shippingMethodService: ShippingMethodService) {}
  resolve(): Observable<ShippingMethodDataRO[]> {
    this.shippingMethodService.getMethods$().subscribe({
      next: (response) => {
        this.shippingMethodService.setMethods(response.data);
      },
    });
    return this.shippingMethodService.methods$;
  }
}
