export class V1UpdateCartHttpRequest {
  items: {
    amount: number;
    productId: string;
    price: number;
    cartId: string;
  }[];
}

export class V1UpdateCartHttpResponse {
  items: {
    product: {
      name: string;
      price: number;
      id: string;
    };
    amount: number;
    cartId: string;
  }[];
  id: string;
  totalPrice: number;
  userId: string;
  message: string;
  constructor(options: Omit<V1UpdateCartHttpResponse, 'message'>) {
    this.items = options.items;
    this.message = 'Cart updated successfully';
  }
}
