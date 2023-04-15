/* tslint:disable */
/* eslint-disable */
import { IApiArticleFileRestType } from './i-api-article-file-rest-type';
export interface IApiFullArticleRestType {
  articleFiles?: Array<IApiArticleFileRestType>;
  author: number;
  categories?: Array<number>;
  contents?: Array<number>;
  id: number;
  isDeleted?: string;
  teaser?: string;
  title: string;
}
