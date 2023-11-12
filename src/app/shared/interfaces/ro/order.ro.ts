import { OrderModel } from '@model';
import { PaginateRO } from './paginate.ro';
import { OrderItemRO } from './order-item.ro';

export class OrderGetAllDataRO {
  id: string;
  status: string;
  total_price: number;
  fee_name: string;
  fee_price: number;
  address_location: string;
  member_name?: string | undefined;
  member_phone?: string | undefined;
  created_at: Date;
}

export class OrderGetAllRO extends PaginateRO<OrderGetAllDataRO> {
  data: OrderGetAllDataRO[];
}

export class CreateOrderRO extends OrderModel {
  itemIds: string[];
  cartId: string;
}

export class OrderGetDetailsRO extends OrderGetAllDataRO {
  items: OrderItemRO[];
}
