import {
  V1LogInHttpRequest,
  V1LogInHttpResponse,
  V1RegisterMemberHttpRequest,
  V1RegisterMemberHttpResponse,
  V1UserModel,
} from '@api/http';

export type UserModel = V1UserModel;
export type RegisterMemberHttpRequest = V1RegisterMemberHttpRequest;
export type RegisterMemberHttpResponse = V1RegisterMemberHttpResponse;

export type LogInRequestDto = V1LogInHttpRequest;
export type LogInResponseDto = V1LogInHttpResponse;
