export class CartItemRO {
  id: string;
  amount: number;
  product_id: string;
  product_name: string;
  product_new_price: number;
  product_price: number;
  discount_id?: string;
  discount_percentage?: number;
  image_urls: string[];
}
