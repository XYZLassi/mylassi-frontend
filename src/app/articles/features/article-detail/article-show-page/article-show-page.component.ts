import {Component, inject, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {Subscription, switchMap} from "rxjs";
import {ArticleService, IArticle} from "../../../data-access";
import {ActivatedRoute, Router} from "@angular/router";
import {filter, map, tap} from "rxjs/operators";
import {Meta, Title} from "@angular/platform-browser";

@Component({
  selector: 'app-article-show-page',
  templateUrl: './article-show-page.component.html',
  styleUrls: ['./article-show-page.component.scss']
})
export class ArticleShowPageComponent implements OnInit, OnDestroy {

  private articleService = inject(ArticleService);
  private activeRoute = inject(ActivatedRoute);
  private titleMeta = inject(Title);
  private meta = inject(Meta);
  private router = inject(Router)

  public isBusy = false;
  public article?: IArticle;

  private subscriptions: Subscription[] = [];


  ngOnInit(): void {
    const updateSub = this.activeRoute.params.pipe(
      tap({
        next: () => {
          this.isBusy = true;
        }
      }),
      map(params => parseInt(params['id'])),
      filter(articleId => !isNaN(articleId)),
      switchMap(articleId => {
        return this.articleService.loadArticle(articleId);
      }),
    ).subscribe({
        next: article => {
          this.isBusy = false;
          this.article = article;
          this.updateMeta(article);
        },
        error: err => {
          if (isDevMode())
            console.error(err);

          this.isBusy = false;
        },
        complete: () => {

        }
      }
    );

    this.subscriptions = [...this.subscriptions, updateSub];

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  updateMeta(article: IArticle) {

    this.titleMeta.setTitle(`MyLassi.xyz - ${article.title}`);

    this.meta.updateTag({
      property: 'og:title',
      content: article.title
    });

    if (article.teaser) {
      this.meta.updateTag({
        property: 'og:description',
        content: article.teaser,
      })
    }

    this.meta.updateTag({
      property: 'og:url',
      content: `https://mylassi.xyz${this.router.url}`,
    });

    if (article.thumbnails.length > 0) {
      const thumbnailId = article.thumbnails[0].fileId;

      const url = `https://api.mylassi.xyz/images/${thumbnailId}`;
      this.meta.updateTag({
        property: 'og:image',
        content: url
      });
    }

  }

}
