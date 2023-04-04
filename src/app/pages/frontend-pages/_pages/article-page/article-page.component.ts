import {Component, isDevMode, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {Subscription} from "rxjs";
import {FullArticleService, ItemDataSource} from "../../../../services";
import {ArticleModel} from "../../../../models";


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {

  public isBusy: boolean = true;

  public article?: ArticleModel;

  private subscriptions: Subscription[] = [];

  public isCached?: boolean;

  constructor(private fullArticleService: FullArticleService,
              private route: ActivatedRoute,
              private router: Router, private titleMeta: Title,
              private meta: Meta) {
  }

  ngOnInit(): void {

    let loadSub: Subscription | undefined;

    let routeSub = this.route.params.subscribe(params => {
      this.isBusy = true;
      this.isCached = undefined;

      if (loadSub) {
        loadSub.unsubscribe();
        loadSub = undefined;
      }

      const articleId = parseInt(params['index']);
      // Test NaN

      loadSub = this.fullArticleService.getArticle(articleId).subscribe(
        {
          next: item => {
            if (isDevMode())
              console.log(item);

            this.isCached = this.isCached || false;
            if (item.source == ItemDataSource.Cache)
              this.isCached = true;
            this.article = item.item;
            this.updateMeta(item.item);
            this.isBusy = false;
          },
          error: err => {

          },
          complete: () => {

          }
        }
      );
      this.subscriptions = [...this.subscriptions, loadSub];
    });

    this.subscriptions = [...this.subscriptions, routeSub];
  }

  updateMeta(article: ArticleModel) {

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

    if (article.thumbnailImageId) {
      const url = `https://api.mylassi.xyz/images/${article.thumbnailImageId}`;
      this.meta.updateTag({
        property: 'og:image',
        content: url
      });
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  canCacheArticle(){
    return this.fullArticleService.cacheReady();
  }

  onCacheChangeArticle($event: any) {
    if (!this.article)
      return

    if (!this.isCached) {
      this.fullArticleService.putArticleInCache(this.article).subscribe({
        next: (i) => {
          this.isCached = true;
        },
        error: (err) => {
          if (isDevMode())
            console.error(err);
        },
      });
    } else {
      this.fullArticleService.removeArticleFormCache(this.article).subscribe({
        next: (i) => {
          this.isCached = false;
        },
        error: (err) => {
          if (isDevMode())
            console.error(err);
        }
      })
    }
  }
}
