import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiApplication } from '@constant';
import { CreateAddressDto } from '@dto';
import { AddressModel } from '@model';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  private addresses = new BehaviorSubject<any[]>([]);

  get addresses$() {
    return this.addresses.asObservable();
  }

  setAddresses(addresses: any[]) {
    this.addresses.next(addresses);
  }

  getAddresses() {
    return this.http.get<AddressModel[]>(
      ApiApplication.ADDRESS.CONTROLLER + '/' + ApiApplication.ADDRESS.GET_ALL,
    );
  }

  createAddress(dto: CreateAddressDto) {
    return this.http
      .post<AddressModel>(
        ApiApplication.ADDRESS.CONTROLLER + '/' + ApiApplication.ADDRESS.CREATE,
        dto,
      )
      .pipe(
        tap((address) => {
          this.addresses.next([...this.addresses.value, address]);
        }),
      );
  }

  deleteAddress(id: string) {
    return this.http
      .delete<AddressModel>(
        ApiApplication.ADDRESS.CONTROLLER +
          '/' +
          ApiApplication.ADDRESS.DELETE.replace(':id', id),
      )
      .pipe(
        tap(() => {
          this.addresses.next(
            this.addresses.value.filter((address) => address.id !== id),
          );
        }),
      );
  }
}
