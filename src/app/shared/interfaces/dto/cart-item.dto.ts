export class GetCartItemsDto {}

export class CreateCartItemDto {
  productId: string;
  amount: number;
}

export class UpdateCartItemDto {
  amount: number;
}

export class UpsertCartItemDto {
  productId: string;
  amount: number;
}
