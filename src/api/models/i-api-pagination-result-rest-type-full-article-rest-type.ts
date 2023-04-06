/* tslint:disable */
/* eslint-disable */
import { IApiFullArticleRestType } from './i-api-full-article-rest-type';
export interface IApiPaginationResultRestTypeFullArticleRestType {
  cursor?: string;
  items: Array<IApiFullArticleRestType>;
  length: number;
  pageSize: number;
}
