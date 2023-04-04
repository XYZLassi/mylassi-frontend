import {IArticleInfoModel} from "../../interfaces";

export interface IArticleInfoCursorContainer {
  articles: IArticleInfoModel[]
  cursor?: string

}

export interface IFileArticleAssoziation {
  fileId: string
  imageUrl: string
  articles: number[]
}

