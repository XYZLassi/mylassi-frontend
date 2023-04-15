import {Component, inject, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {ArticleService, IArticleTeaser} from "../../../data-access";
import {ActivatedRoute} from "@angular/router";
import {Subscription, switchMap} from "rxjs";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit, OnDestroy {

  private articleService = inject(ArticleService);
  private activeRoute = inject(ActivatedRoute);

  public articles: IArticleTeaser[] = [];
  public nextCursor?: string;

  public isBusy = true;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const updateSub = this.activeRoute.params.pipe(
      tap({
        next: () => {
          this.isBusy = true
        }
      }),
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
    ).subscribe({
      next: articles => {
        this.isBusy = false;
        this.nextCursor = articles.cursor || undefined;
        this.updateArticles(articles.articles);
      },
      error: err => {
        if (isDevMode())
          console.log(err);
      }
    });

    this.subscriptions = [...this.subscriptions, updateSub]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
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
