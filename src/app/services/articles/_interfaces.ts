import {ArticleInfoModel} from "../../models";

export interface IArticleInfoCursorContainer {
  articles: ArticleInfoModel[]
  cursor?: string

}

export interface IFileArticleAssoziation {
  fileId: string
  imageUrl: string
  articles: number[]
}

