/* tslint:disable */
/* eslint-disable */
import { ArticleRestType } from './article-rest-type';
export interface PaginationResultRestTypeArticleRestType {
  cursor?: string;
  items: Array<ArticleRestType>;
  length: number;
  pageSize: number;
}
