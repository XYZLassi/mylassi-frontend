/* tslint:disable */
/* eslint-disable */
import { IApiArticleContentType } from './i-api-article-content-type';
export interface IApiArticleContentRestType {
  contentType: IApiArticleContentType;
  header?: string;
  id: number;
  position: number;
  textContent?: string;
}
