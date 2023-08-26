import {
  V1CartItemModel,
  V1CartModel,
  V1UpdateCartHttpRequest,
  V1UpdateCartHttpResponse,
  V1GetCartHttpResponse,
} from '@api/http';

export type UpdateCartRequestDto = V1UpdateCartHttpRequest;
export type UpdateCartResponseDto = V1UpdateCartHttpResponse;

export type CartModel = V1CartModel;
export type CartItemModel = V1CartItemModel;

export type GetCartResponseDto = V1GetCartHttpResponse;
