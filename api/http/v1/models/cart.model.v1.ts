export class V1CartModel {
  id: string;
  user_id: string;
  items: V1CartItemModel[];
  total_price: number;
}

export class V1CartItemModel {
  name: string;
  amount: number;
  product_id: string;
  total_price: number;
  discount: number;
  price: number;
  image_url?: string;
}
