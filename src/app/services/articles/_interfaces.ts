import {ArticleInfoModel} from "../../models";

export interface IArticleInfoCursorContainer {
  articles: ArticleInfoModel[]
  cursor?: string

}

