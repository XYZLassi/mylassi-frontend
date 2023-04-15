import {Component, inject, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {ApiArticlesService, IApiFullArticleRestType} from "../../../../../api";
import {Subscription, switchMap, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-admin-articles-index-page',
  templateUrl: './admin-articles-index-page.component.html',
  styleUrls: ['./admin-articles-index-page.component.scss']
})
export class AdminArticlesIndexPageComponent implements OnInit, OnDestroy {
  private articlesService = inject(ApiArticlesService);
  private route = inject(ActivatedRoute);

  private subscriptions: Subscription[] = [];

  public articles: IApiFullArticleRestType[] = [];
  public isBusy = true;

  ngOnInit(): void {

    const loadSub = this.route.queryParams.pipe(
      tap({
        next: () => {
          this.isBusy = true;
        }
      }),
      switchMap(queryParams => {
        return this.articlesService.getArticlesFull().pipe(
          take(1)
        );
      })
    ).subscribe(
      {
        next: result => {
          this.articles = result.items;
          this.isBusy = false;
        },
        error: err => {
          if (isDevMode())
            console.error(err);
        },
        complete: () => {

        }
      }
    );
    this.subscriptions = [...this.subscriptions, loadSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
