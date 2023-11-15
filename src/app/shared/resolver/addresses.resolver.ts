import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AddressGetAllDataRO } from '@ro';
import { AddressService } from '@service/address.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressesResolver implements Resolve<AddressGetAllDataRO[]> {
  constructor(private addressService: AddressService) {}
  resolve(): Observable<AddressGetAllDataRO[]> {
    this.addressService.getAddresses().subscribe({
      next: (response) => {
        this.addressService.setAddresses(response.data);
      },
    });
    return this.addressService.addresses$;
  }
}
