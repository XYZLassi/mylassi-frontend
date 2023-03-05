import {Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ArticleListModel} from "../../../../components/articles";
import {Apollo, graphql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {makeStateKey, Title, TransferState} from "@angular/platform-browser";
import {CategoriesService} from "../../../../api/services/categories.service";
import {CategoryRestType} from "../../../../api/models/category-rest-type";
import {GetArticlesQuery, QueryArticlesArgs} from "../../../../../generated/graphql";
import {isPlatformBrowser} from "@angular/common";
import {map} from "rxjs/operators";

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

  public articles: ArticleListModel[] = [];
  public category?: CategoryRestType | null;

  public nextCursor?: string | null;

  public isBusy: boolean = true;


  private subscriptions: Subscription[] = [];

  private observer?: IntersectionObserver;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private apollo: Apollo, private state: TransferState,
    private title: Title,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.createObserver();

    const routeSub = this.route.params.subscribe(params => {
      this.clear();
      let category = params['index'];

      const loadKey = `ArticleList-${category || 'Index'}`;
      this.articles = this.loadArticlesFromStorage(loadKey) || this.loadArticlesFromState(loadKey) || [];


      if (!category) {
        this.loadNext();
      } else {
        const testCategorySub = this.categoriesService.getCategory({category}).subscribe(
          {
            next: (category) => {
              this.category = category;
              this.title.setTitle(`MyLassi.xyz - ${category.category}`);
              this.loadNext();
              testCategorySub.unsubscribe();
            },
            error: _ => {
              this.router.navigate(['/error', '404']);
              testCategorySub.unsubscribe();
            },
            complete: () => {
              testCategorySub.unsubscribe();
            }
          });

        this.subscriptions = [...this.subscriptions, testCategorySub];
      }
    });
    this.subscriptions = [...this.subscriptions, routeSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private clear() {
    this.isBusy = false;
    this.nextCursor = null;
    this.category = null;
    this.articles = [];
  }

  loadNext() {
    if (this.isBusy)
      return;

    this.isBusy = true;

    const category = this.category?.uniqueName;

    const loadSub = this.loadNextArticlesFromApi(category, this.nextCursor).subscribe({
      next: next => {
        this.nextCursor = next.articles.cursor;

        next.articles.items.forEach(item => {


          const article: ArticleListModel = {
            id: item.id,
            title: item.title,
            teaser: item.teaser,
            thumbnailImageId: item.thumbnails.length > 0 ? item.thumbnails[0].fileId : null,
          }

          const findId = this.articles.findIndex(i => i.id === article.id);

          if (findId >= 0)
            this.articles[findId] = article;
          else
            this.articles.push(article);
        });

        const loadKey = `ArticleList-${category || 'Index'}`;
        this.saveArticleInStateOrStorage(loadKey, this.articles);

        this.isBusy = false;
        loadSub.unsubscribe();
      },
      error: _ => {
        this.isBusy = false;
        loadSub.unsubscribe();
      },
      complete: () => {
        this.isBusy = false;
        loadSub.unsubscribe();
      }
    });
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

  loadNextArticlesFromApi(category: string | undefined | null, cursor: string | undefined | null)
    : Observable<GetArticlesQuery> {
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
      category: this.category?.uniqueName,
      cursor: this.nextCursor
    }

    return this.apollo.watchQuery<GetArticlesQuery>({query, variables})
      .valueChanges.pipe(map(i => i.data));
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

          if (intersected && !this.isBusy && !this.nextCursor) {
            this.loadNext();
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

  onLoadNext($event: any) {
    if (!this.isBusy && !this.nextCursor)
      this.loadNext();
  }
}
