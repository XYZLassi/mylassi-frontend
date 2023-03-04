import {Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ArticleListModel} from "../../../../components/articles/interfaces";
import {Apollo, graphql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {makeStateKey, Title, TransferState} from "@angular/platform-browser";
import {CategoriesService} from "../../../../api/services/categories.service";
import {CategoryRestType} from "../../../../api/models/category-rest-type";
import {GetArticlesQuery, QueryArticlesArgs} from "../../../../../generated/graphql";
import {isPlatformBrowser} from "@angular/common";

const STATE_KEY_QUERY = makeStateKey<ArticleListModel[]>('articleListPageQuery');

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
    this.articles = this.state.get(STATE_KEY_QUERY, []);

    const routeSub = this.route.params.subscribe(params => {
      this.clear();
      let category = params['index'];

      if (!category) {
        this.loadArticles()
      } else {
        const testCategorySub = this.categoriesService.getCategory({category}).subscribe(
          {
            next: (category) => {
              this.category = category;
              this.title.setTitle(`MyLassi.xyz - ${category.category}`);
              this.loadArticles();
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


  loadArticles() {
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

    const querySub = this.apollo.watchQuery<GetArticlesQuery>({query, variables})
      .valueChanges.subscribe({
        next: next => {
          this.nextCursor = next.data.articles.cursor || null;
          this.createObserver();

          next.data.articles.items.forEach(article => {
            this.articles.push({
              id: parseInt(article.id),
              title: article.title,
              teaser: article.teaser,
              thumbnailImageId: article.thumbnails.length > 0 ? article.thumbnails[0].fileId : null,
            });

            this.isBusy = false;
          });
          this.state.set(STATE_KEY_QUERY, this.articles);
        },
        error: _ => {
          this.isBusy = false;
        },
        complete: () => {
          this.isBusy = false;
        }
      });

    this.subscriptions = [...this.subscriptions, querySub];
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
            this.loadArticles();
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
    if (this.nextCursor)
      this.loadArticles();
  }
}
