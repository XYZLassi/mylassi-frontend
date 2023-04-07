import {IFileReference} from "./article-files";
import {IApiArticleContentType} from "../../../../api";

export interface IArticleTeaser {
  id: number;
  title: string;

  teaser?: string;

  thumbnails: IFileReference[];
}

export interface IArticleAuthor {
  username: string
}

export interface IArticleContent {
  position: number
  contentType: IApiArticleContentType
  header?: string
}

export interface IArticleFile {
  fileId: string
  url: string
}


export interface IArticle extends IArticleTeaser {
  author: IArticleAuthor;
  contents: IArticleContent[]

  files: IArticleFile[]
}


