export enum OrderStatusEnum {
  PROCESSING = 'PROCESSING',
  SHIPPING = 'SHIPPING',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export class V1OrderModel {
  user_id: string;
  cart_id: string;
  address: string;
  status: OrderStatusEnum;
  total_price: number;
  id: string;
}
