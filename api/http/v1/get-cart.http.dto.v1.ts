import type { V1CartItemModel } from './models';

export class V1GetCartHttpResponse {
  items: V1CartItemModel[];
  user_id: string;
  total_price: number;
  id: string;
}
