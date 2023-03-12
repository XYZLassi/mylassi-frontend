import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {Observable, Subscription} from "rxjs";
import {FullArticleService, ItemTransferState} from "../../../../services";
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

  constructor(private fullArticleService: FullArticleService,
              private route: ActivatedRoute,
              private router: Router, private titleMeta: Title,
              private meta: Meta) {
  }

  ngOnInit(): void {

    let loadSub: Subscription | undefined;

    let routeSub = this.route.params.subscribe(params => {
      this.isBusy = true;

      if (loadSub) {
        loadSub.unsubscribe();
        loadSub = undefined;
      }

      const articleId = parseInt(params['index']);
      // Test NaN

      loadSub = this.fullArticleService.getArticle(articleId).subscribe(
        {
          next: item => {
            console.log(item);
            this.article = item.item;

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

    /*
    if (article.thumbnails.length > 0) {
      const url = article.thumbnails[0].url;
      this.meta.updateTag({
        property: 'og:image',
        content: url
      });
    }
    */
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async onSaveArticle($event: any) {
    if (!this.article)
      return

    await this.fullArticleService.cachePutArticle(this.article)
  }
}
