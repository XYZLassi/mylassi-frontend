import {inject, Injectable} from '@angular/core';
import {Apollo} from "apollo-angular";
import {LoadArticlesGQL} from "../../../graphQL/graphql";
import {map, mergeMap, toArray} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {IArticleTeaser} from "./interfaces";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apollo = inject(Apollo);

  constructor() {
  }

  loadArticleTeasers(category?: string, cursor?: string) {
    const query = new LoadArticlesGQL(this.apollo);
    return query.fetch({category, cursor}).pipe(
      map(result => result.data),
      mergeMap(i => {
        if (i.articles)
          return of(...i.articles.items).pipe(
            map(article => article as IArticleTeaser),
            toArray(),
            map(articles => {
              return {
                cursor: i.articles.cursor,
                articles: articles,
              }
            })
          );
        return EMPTY;
      })
    )
  }
}
