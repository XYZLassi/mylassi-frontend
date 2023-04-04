import {Component, ElementRef, isDevMode, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {concat, mergeMap, Subscription, switchMap, toArray} from "rxjs";
import {Title} from "@angular/platform-browser";
import {CategoriesService} from "../../../../api/services/categories.service";
import {CategoryRestType} from "../../../../api/models/category-rest-type";
import {map} from "rxjs/operators";
import {FullArticleService, ItemDataSource, ItemTransferState} from "../../../../services";
import {IArticleInfoModel} from "../../../../interfaces";
import {IArticleInfoCursorContainer} from "../../../../services/articles/_interfaces";

interface LoadItemsInfos {
  category: string | undefined | null;

  cursor: string | undefined | null;

}

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit, OnDestroy {

  @ViewChild('intersectionContainer') intersectionContainer?: ElementRef;

  public articles: IArticleInfoModel[] = [];

  public cursor?: string;

  private subscriptions: Subscription[] = [];

  private observer?: IntersectionObserver;

  constructor(
    private title: Title,
    private fullArticleService: FullArticleService,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.createObserver();

    const loadSub = this.route.params.pipe(
      map(params => params['index'] as string),
      switchMap(category => {
        return this.route.queryParams.pipe(
          map(params => params['cursor'] as string),
          map(cursor => {
            return {category, cursor}
          })
        )
      }),
      mergeMap(variables => {
        return concat(
          this.fullArticleService.getCachedArticles().pipe(
            toArray(),
            map(i => {
              const result: ItemTransferState<IArticleInfoCursorContainer> = {
                source: ItemDataSource.Cache,
                item: {
                  articles: i,
                }
              }
              return result;
            })
          ),
          this.fullArticleService.loadArticleInfos({
            cursor: variables.cursor,
            category: variables.category,
          }).pipe(),
        );
      })
    ).subscribe(articles => {
      this.cursor = articles.item.cursor;
      this.updateArticles(articles.item.articles);

      if (isDevMode())
        console.log(articles);
    });

    this.subscriptions = [...this.subscriptions, loadSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  private createObserver() {
    if (this.observer)
      return

    if (this.intersectionContainer) {
      this.observer = new IntersectionObserver(entries => {
        let intersected = false;
        entries.forEach(entry => {
          if (entry.isIntersecting)
            intersected = true;

          if (intersected) {
          }
        });
      }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      });
      this.observer.observe(this.intersectionContainer.nativeElement);
    }
  }

  private updateArticles(articles: IArticleInfoModel[]) {
    articles.forEach(a => {
      const index = this.articles.findIndex(i => i.id === a.id);

      if (index >= 0) {
        this.articles[index] = a
      } else {
        this.articles.push(a);
      }

    });

    this.articles = this.articles.sort((a, b) => b.id - a.id);
  }
}
