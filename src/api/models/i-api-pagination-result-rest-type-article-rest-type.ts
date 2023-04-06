/* tslint:disable */
/* eslint-disable */
import { IApiArticleRestType } from './i-api-article-rest-type';
export interface IApiPaginationResultRestTypeArticleRestType {
  cursor?: string;
  items: Array<IApiArticleRestType>;
  length: number;
  pageSize: number;
}
