import { DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { numberFormat } from '@constant';
import { CreateOrderDto } from '@dto';
import { AddressModel, CartModel, ShippingFeeModel } from '@model';
import { CartRO } from '@ro';
import {
  CartService,
  OrderService,
  ShippingFeeService,
  ToastrCustomService,
} from '@service';
import { AddressService } from '@service/address.service';
import { WhiteFormFieldComponent } from '@shared/components/white-form-field/white-form-field.component';
import { WhiteFormComponent } from '@shared/components/white-form/white-form.component';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss'],
  standalone: true,
  imports: [
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    WhiteFormComponent,
    WhiteFormFieldComponent,
    NgFor,
    DecimalPipe,
  ],
})
export class CheckoutFormComponent implements OnInit {
  constructor(
    private addressSerivce: AddressService,
    private shippingFeeService: ShippingFeeService,
    private cartService: CartService,
  ) {}
  createOrderDto = new CreateOrderDto();
  addresses: AddressModel[];
  shippingFees: ShippingFeeModel[];
  cartDetail: CartModel;
  numberFormat = numberFormat;

  ngOnInit(): void {
    this.addressSerivce.addresses$.subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
    });
    this.shippingFeeService.fees$.subscribe({
      next: (fees) => {
        this.shippingFees = fees;
      },
    });
    this.cartService.detail$.subscribe({
      next: (detail) => {
        this.cartDetail = detail;
      },
    });
  }

  onAddressChange(event: MatSelectChange) {
    console.log(event.value);
    this.cartService
      .updateCart$({
        addressId: event.value,
      })
      .subscribe();
  }

  onShippingFeeChange(event: MatSelectChange) {
    this.cartService
      .updateCart$({
        shippingFeeId: event.value,
      })
      .subscribe({
        complete: () => {
          this.cartService.getDetail$().subscribe({
            next: (detail) => {
              this.cartService.setDetail$(detail);
            },
          });
        },
      });
  }
}
