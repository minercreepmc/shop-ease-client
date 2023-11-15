import type { AddressModel } from '@model';
import type { CartItemRO } from '@ro';

export class CartRO {
  id: string;
  shipping_fee?: number;
  shipping_fee_id?: string;
  address: AddressModel;
  total_price: number;
  items: CartItemRO[];
}
