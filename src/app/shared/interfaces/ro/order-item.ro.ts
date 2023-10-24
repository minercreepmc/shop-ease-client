import { CategoryModel } from '@model';

export class OrderItemRO {
  id: string;
  price: number;
  order_id: string;
  product_id: string;
  amount: number;
  name: string;
  image_urls: string[];
  description: string;
  categories: CategoryModel[];
}
