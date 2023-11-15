export class CreateCartDto {}
export class UpdateCartDto {
  shippingFeeId?: string | null;
  addressId?: string | null;
  shippingMethodId?: string | null;
}
