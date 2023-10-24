import type { AddressModel } from '@model';
import type { CartItemRO } from '@ro';

export class CartRO {
  id: string;
  shipping_fee?: number;
  address: AddressModel;
  total_price: number;
  items: CartItemRO[];
}
