import {ArticleOptionsRestType} from "../api/models/article-options-rest-type";
import {ArticleContentType} from "../api/models/article-content-type";


export interface ArticleModel extends ArticleOptionsRestType {
  id: number;
  contents: ArticleContentModel[];

  files: ArticleFileModel[];
}

export interface ArticleContentModel {
  position: number
  contentType: ArticleContentType
  header?: string
}

export interface ArticleFileModel {
  fileId: string
  url: string
}
