import {Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ArticleListModel} from "../../../../components/articles/interfaces";
import {Apollo, graphql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {makeStateKey, Title, TransferState} from "@angular/platform-browser";
import {CategoriesService} from "../../../../api/services/categories.service";
import {CategoryRestType} from "../../../../api/models/category-rest-type";
import {GetArticlesQuery, QueryArticlesArgs} from "../../../../../generated/graphql";
import {isPlatformBrowser} from "@angular/common";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit, OnDestroy {

  @ViewChild('intersectionContainer') intersectionContainer?: ElementRef;

  public articles: ArticleListModel[] = [];
  public category?: CategoryRestType | null;

  public nextCursor: string | null = null;

  public isBusy: boolean = true;

  private subscriptions: Subscription[] = [];

  private observer: IntersectionObserver | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apollo: Apollo, private state: TransferState,
    private title: Title,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    const routeSub = this.route.params.subscribe(params => {
      this.clear();
      let category = params['index'];

      const loadKey = `ArticleList-${category || 'Index'}`;
      this.articles = this.loadArticlesFromStorage(loadKey) || this.loadArticlesFromState(loadKey) || [];

      const articleSubscription = {
        next: (next: GetArticlesQuery) => {
          this.updateArticlesFromQuery(next);
          this.saveArticleInStateOrStorage(loadKey, this.articles);
          this.createObserver();
        },
        error: (e: any) => {
          this.isBusy = false;
        },
        complete: () => {
          this.isBusy = false;
        }
      };

      if (!category) {
        const loadArticlesSub = this.loadNextArticlesFromApi(category, null).subscribe(articleSubscription);
        this.subscriptions = [...this.subscriptions, loadArticlesSub];
      } else {
        const testCategorySub = this.categoriesService.getCategory({category}).subscribe(
          {
            next: (category) => {
              this.category = category;
              this.title.setTitle(`MyLassi.xyz - ${category.category}`);
              const loadArticlesSub = this.loadNextArticlesFromApi(category.unique_name, null).subscribe(articleSubscription);
              this.subscriptions = [...this.subscriptions, loadArticlesSub];
            },
            error: _ => {
              this.router.navigate(['/error', '404']);
            },
          });

        this.subscriptions = [...this.subscriptions, testCategorySub];
      }

    });
    this.subscriptions = [...this.subscriptions, routeSub];
  }

  updateArticlesFromQuery(result: GetArticlesQuery) {
    this.isBusy = true;
    this.nextCursor = result.articles.cursor || null;

    result.articles.items.forEach(article => {

      const articleItem: ArticleListModel = {
        id: parseInt(article.id),
        title: article.title,
        teaser: article.teaser,
        thumbnailImageId: article.thumbnails.length > 0 ? article.thumbnails[0].fileId : null,
      }

      const index = this.articles.findIndex(i => i.id === articleItem.id)
      if (index >= 0) {
        this.articles[index] = articleItem;
      } else {
        this.articles.push(articleItem);
      }
    });

    this.isBusy = false;
  }

  loadArticlesFromState(key: string): ArticleListModel[] | undefined {
    const STATE_KEY_QUERY = makeStateKey<ArticleListModel[]>(key);
    return this.state.get(STATE_KEY_QUERY, undefined);
  }

  loadArticlesFromStorage(key: string): ArticleListModel[] | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const jsonData = sessionStorage.getItem(key)
      if (jsonData) {
        try {
          return JSON.parse(jsonData)
        } catch {
          sessionStorage.removeItem(key);
        }
      }
    }
    return;
  }

  saveArticleInStateOrStorage(key: string, articles: ArticleListModel[]) {
    if (isPlatformBrowser(this.platformId)) {
      const jsonData = JSON.stringify(articles);
      sessionStorage.setItem(key, jsonData);
    } else {
      const STATE_KEY_QUERY = makeStateKey<ArticleListModel[]>(key);
      this.state.set(STATE_KEY_QUERY, articles)
    }
  }

  loadNextArticlesFromApi(category: string | undefined, cursor: string | undefined | null): Observable<GetArticlesQuery> {
    const query = graphql`
      query GetArticles($cursor:String, $category:String){
        articles(category: $category,cursor: $cursor){
          items {
            id
            title
            teaser
            thumbnails: filesByUsage(usage: "thumbnail") {
              fileId
            }
          }
          cursor
        }
      }`;

    let variables: QueryArticlesArgs = {
      category: this.category?.unique_name,
      cursor: this.nextCursor
    }

    return this.apollo.watchQuery<GetArticlesQuery>({query, variables})
      .valueChanges.pipe(map(i => i.data));
  }

  private clear() {
    this.nextCursor = null;
    this.category = null;
    this.articles = [];
  }

  private createObserver() {
    if (this.observer)
      return

    if (isPlatformBrowser(this.platformId) && this.intersectionContainer) {
      this.observer = new IntersectionObserver(entries => {
        let intersected = false;
        entries.forEach(entry => {
          if (entry.isIntersecting)
            intersected = true;

          if (intersected && this.nextCursor && !this.isBusy) {
            this.onLoadMore(undefined);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onLoadMore($event: any) {
    if (this.nextCursor) {
      const loadSub = this.loadNextArticlesFromApi(this.category?.unique_name, this.nextCursor).subscribe(this.updateArticlesFromQuery);
      this.subscriptions = [...this.subscriptions, loadSub];
    }
  }
}
