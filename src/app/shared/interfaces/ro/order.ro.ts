import { OrderModel } from '@model';
import { OrderItemRO } from './order-item.ro';

export class OrderRO {
  id: string;
  status: string;
  total_price: number;
  fee_name: string;
  fee_price: number;
  address_location: string;
  member_name: string;
  member_phone: string;
  updated_at: Date;
  items?: OrderItemRO[];
}

export class CreateOrderRO extends OrderModel {
  itemIds: string[];
  cartId: string;
}
