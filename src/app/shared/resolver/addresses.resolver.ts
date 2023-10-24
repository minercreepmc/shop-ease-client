import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AddressModel } from '@model';
import { AddressService } from '@service/address.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressesResolver implements Resolve<AddressModel[]> {
  constructor(private addressService: AddressService) {}
  resolve(): Observable<AddressModel[]> {
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        this.addressService.setAddresses(addresses);
      },
    });
    return this.addressService.addresses$;
  }
}
