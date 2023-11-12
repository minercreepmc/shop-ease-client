import { OrderModel } from '@model';
import { PaginationParams } from './pagination.dto';

export class CreateOrderDto {
  addressId: string;
}

export class UpdateOrderDto {
  status: string;
}

export class GetByMemberDto {
  memberId: string;
}

export class OrderGetAllDto extends PaginationParams {
  status? = 'PROCESSING';
  orderBy?: keyof OrderModel = 'created_at';
  direction?: 'asc' | 'desc' = 'desc';
}
