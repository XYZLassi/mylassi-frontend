/* tslint:disable */
/* eslint-disable */
import { ArticleFileRestType } from './article-file-rest-type';
export interface FullArticleRestType {
  articleFiles?: Array<ArticleFileRestType>;
  author: number;
  categories?: Array<number>;
  contents?: Array<number>;
  id: number;
  isDeleted?: string;
  teaser?: string;
  title: string;
}
