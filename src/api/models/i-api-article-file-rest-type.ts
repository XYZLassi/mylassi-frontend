/* tslint:disable */
/* eslint-disable */
import { IApiArticleFileUsage } from './i-api-article-file-usage';
export interface IApiArticleFileRestType {
  articleFileId: number;
  fileId: string;
  fileUsage?: IApiArticleFileUsage;
  url: string;
}
