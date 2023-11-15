export class CartModel {
  id: string;
  shipping_fee_id?: string | null;
  shipping_method_id?: string | null;
  address_id?: string | null;
  total_price: number;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}
