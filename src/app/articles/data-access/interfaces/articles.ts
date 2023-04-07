import {IFileReference} from "./article-files";

export interface IArticleTeaser {
  id: number;
  title: string;

  teaser?: string;

  thumbnails: IFileReference[];
}
