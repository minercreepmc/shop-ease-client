import { V1ProductModel } from './product.model.v1';

export class V1CartModel {
  id: string;
  user_id: string;
  items: V1CartItemModel[];
  total_price: number;
}

export class V1CartItemModel {
  amount: number;
  product_id: string;
  product: V1ProductModel;
  cartId: string;
}
