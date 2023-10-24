import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CreateAddressDto } from '@dto';
import { AddressModel } from '@model';
import { ToastrCustomService } from '@service';
import { AddressService } from '@service/address.service';
import { ButtonComponent, InputComponent } from '@shared/components';
import { handleError } from '@shared/utils';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  standalone: true,
  imports: [
    NgFor,
    InputComponent,
    ButtonComponent,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class AddressFormComponent implements OnInit {
  constructor(
    private addressService: AddressService,
    private toast: ToastrCustomService,
  ) {}
  addresses: AddressModel[];
  faTrash = faTrash;

  createAddressDto = new CreateAddressDto();

  ngOnInit(): void {
    this.addressService.addresses$.subscribe((addresses) => {
      this.addresses = addresses;
    });
  }

  createAddress() {
    this.addressService.createAddress(this.createAddressDto).subscribe({
      next: () => {
        this.toast.success('Create address successful');
      },
      error: (e) => {
        handleError(e, this.toast);
      },
      complete: () => {
        this.createAddressDto = new CreateAddressDto();
      },
    });
  }

  deleteAddress(id: string) {
    this.addressService.deleteAddress(id).subscribe({
      next: () => {
        this.toast.success('Delete address successful');
      },
      error: (e) => {
        handleError(e, this.toast);
      },
    });
  }
}
