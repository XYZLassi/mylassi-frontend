import {Component, inject, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap, take} from "rxjs";
import {ApiArticlesService, IApiFullArticleRestType} from "../../../../../api";
import {ActivatedRoute} from "@angular/router";
import {map, tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-articles-edit-page',
  templateUrl: './admin-articles-edit-page.component.html',
  styleUrls: ['./admin-articles-edit-page.component.scss']
})
export class AdminArticlesEditPageComponent implements OnInit, OnDestroy {

  private articlesService = inject(ApiArticlesService);
  private route = inject(ActivatedRoute);

  public article?: IApiFullArticleRestType;

  private subscriptions: Subscription[] = [];

  public isBusy = false;

  ngOnInit(): void {
    this.isBusy = true;

    const loadSub = this.route.params.pipe(
      tap({
        next: () => {
          this.isBusy = true;
        }
      }),
      map(params => parseInt(params['id'])),
      switchMap(articleId => {
        return this.articlesService.getArticleFull({
          article: articleId
        }).pipe(take(1))
      })
    ).subscribe({
        next: article => {
          this.article = article;
          this.isBusy = false;
        },
        complete: () => {

        },
        error: err => {
          if (isDevMode())
            console.error(err);
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(i => i.unsubscribe());
  }

}
