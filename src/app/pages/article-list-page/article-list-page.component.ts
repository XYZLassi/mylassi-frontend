import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleListModel} from "../../components/articles/interfaces";
import {Apollo, graphql} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryArticlesQuery} from "../../../generated/graphql";
import {Subscription} from "rxjs";
import {makeStateKey, TransferState} from "@angular/platform-browser";

const STATE_KEY_QUERY = makeStateKey<ArticleListModel[]>('articleListPageQuery');

@Component({
  selector: 'app-article-list-page',
  templateUrl: './article-list-page.component.html',
  styleUrls: ['./article-list-page.component.scss']
})
export class ArticleListPageComponent implements OnInit, OnDestroy {

  public category!: string

  public articles: ArticleListModel[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private apollo: Apollo, private state: TransferState,
              private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    const query = graphql`
      query CategoryArticles($category:String!){
        categoryByUniqueName(category: $category ){
          category
          articles{
            id
            title
            teaser
            filesByUsage(usage: "thumbnail") {
              fileId
            }
          }
        }
      }`

    this.articles = this.state.get(STATE_KEY_QUERY, []);

    let routeSub = this.route.params.subscribe(params => {
      this.clear();
      let category = params['category'];

      if (!category) {
        this.router.navigate(['/error', '404']);
        return
      }

      let variables = {
        category: category
      }

      let querySub = this.apollo.watchQuery<CategoryArticlesQuery>({query, variables}).valueChanges.subscribe(next => {
        if (!next.data.categoryByUniqueName) {
          this.router.navigate(['/error', '404']);
          return
        }

        this.category = next.data.categoryByUniqueName.category;

        next.data.categoryByUniqueName.articles.forEach(article => {
          this.articles.push({
            id: parseInt(article.id),
            title: article.title,
            teaser: article.teaser,
            thumbnailImageId: article.filesByUsage.length > 0 ? article.filesByUsage[0].fileId : null,
          });
        });
        this.state.set(STATE_KEY_QUERY, this.articles);
      });

      this.subscriptions = [...this.subscriptions, querySub];
    });

    this.subscriptions = [...this.subscriptions, routeSub];
  }

  private clear() {
    this.category = "";
    this.articles = [];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
