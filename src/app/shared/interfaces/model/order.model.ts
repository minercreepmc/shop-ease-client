export class OrderModel {
  id: string;
  status: string;
  total_price: number;
  fee_id: string;
  member_id: string;
  address_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(dto: OrderModel) {
    this.id = dto.id;
    this.status = dto.status;
    this.total_price = dto.total_price;
    this.fee_id = dto.fee_id;
    this.member_id = dto.member_id;
    this.address_id = dto.address_id;
    this.created_at = dto.created_at;
    this.updated_at = dto.updated_at;
  }
}

export class OrderItemModel {
  id: string;
  price: number;
  order_id: string;
  product_id: string;
  amount: number;

  constructor(dto: OrderItemModel) {
    this.id = dto.id;
    this.price = dto.price;
    this.order_id = dto.order_id;
    this.product_id = dto.product_id;
    this.amount = dto.amount;
  }
}
