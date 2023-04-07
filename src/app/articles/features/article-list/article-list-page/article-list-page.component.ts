import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ArticleService, IArticleTeaser} from "../../../data-access";
import {ActivatedRoute} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit, OnDestroy {

  private articleService = inject(ArticleService);
  private activeRoute = inject(ActivatedRoute);

  articles: IArticleTeaser[] = [];
  nextCursor?: string;

  private subscriptions: Subscription[] = [];


  ngOnInit(): void {
    const updateSub = this.loadArticlesFromApi().subscribe(
      articles => {
        this.nextCursor = articles.cursor || undefined;
        this.updateArticles(articles.articles);
      }
    );

    this.subscriptions = [...this.subscriptions, updateSub]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private loadArticlesFromApi() {
    return this.activeRoute.params.pipe(
      map(params => params['category']),
      switchMap(category => {
        return this.activeRoute.queryParams.pipe(
          map(queryParams => queryParams['cursor']),
          map(cursor => {
            return {category, cursor};
          })
        );
      }),
      switchMap(i => {
        return this.articleService.loadArticleTeasers(i.category, i.cursor);
      }),
    )
  }

  private updateArticles(articles: IArticleTeaser[]) {
    articles.forEach(article => {
      const articleIndex = this.articles.findIndex(a => a.id == article.id);
      if (articleIndex >= 0) {
        this.articles[articleIndex] = article;
      } else {
        this.articles.push(article);
      }
    });
  }
}
