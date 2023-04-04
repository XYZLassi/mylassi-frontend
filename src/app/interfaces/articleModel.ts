import {ArticleOptionsRestType} from "../api/models/article-options-rest-type";
import {ArticleContentType} from "../api/models/article-content-type";

export interface IArticleInfoModel extends ArticleOptionsRestType {
  id: number
  title: string
  teaser?: string
  thumbnailImageId?: string
}


export interface IArticleModel extends IArticleInfoModel {
  id: number;
  contents: IArticleContentModel[];

  files: IArticleFileModel[];
}

export interface IArticleContentModel {
  position: number
  contentType: ArticleContentType
  header?: string
}

export interface IArticleFileModel {
  fileId: string
  url: string
}
