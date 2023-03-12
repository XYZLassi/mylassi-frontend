import {ArticleFileModel} from "../../models";

export interface ArticleFileCacheModel extends ArticleFileModel {
  articles: number[]
}
