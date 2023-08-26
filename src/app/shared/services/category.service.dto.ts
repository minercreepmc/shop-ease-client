import {
  V1CategoryModel,
  V1GetCategoriesHttpQuery,
  V1GetCategoriesHttpResponse,
  V1GetCategoryHttpResponse,
} from '@api/http';

export class CategoryModel extends V1CategoryModel {}
export type GetCategoriesHttpRequest = V1GetCategoriesHttpQuery;
export type GetCategoriesHttpResponse = V1GetCategoriesHttpResponse;
export type GetCategoryHttpResponse = V1GetCategoryHttpResponse;
