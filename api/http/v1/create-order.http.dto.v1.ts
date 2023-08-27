export class V1CreateOrderHttpRequest {
  cartId: string;
  address: string;
  totalPrice: number;
}

export class V1CreateOrderHttpResponse {
  userId: string;
  cartId: string;
  address: string;
  totalPrice: number;
  id: string;
  constructor(options: V1CreateOrderHttpResponse) {
    this.id = options.id;
    this.userId = options.userId;
    this.cartId = options.cartId;
    this.address = options.address;
    this.totalPrice = options.totalPrice;
  }
}
