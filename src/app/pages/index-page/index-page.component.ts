import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo, graphql} from "apollo-angular";
import {DashboardPostsQuery} from "../../../generated/graphql";
import {ArticleListModel} from "../../components/articles/interfaces";
import {Subscription} from "rxjs";
import {makeStateKey, TransferState} from "@angular/platform-browser";

const STATE_KEY_QUERY = makeStateKey<ArticleListModel[]>('indexPageQuery');

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public articles: ArticleListModel[] = [];

  private subscriptions: Subscription[] = []

  private paginationCursor: string | null | undefined = null;

  constructor(private apollo: Apollo, private state: TransferState) {

  }

  ngOnInit(): void {
    const query = graphql`
      query DashboardPosts($cursor:String){
        articles(cursor: $cursor){
          items {
            id
            title
            teaser
            thumbnails:filesByUsage(usage: "thumbnail") {
              fileId
            }
          }
          cursor
        }
      }`

    this.articles = this.state.get(STATE_KEY_QUERY, []);

    const variables = {
      cursor: this.paginationCursor,
    };

    let querySub = this.apollo.watchQuery<DashboardPostsQuery>({query, variables}).valueChanges.subscribe(next => {
      this.articles = [];
      this.paginationCursor = next.data.articles.cursor
      next.data.articles.items.forEach(article => {
        this.articles.push({
          id: parseInt(article.id),
          title: article.title,
          teaser: article.teaser,
          thumbnailImageId: article.thumbnails.length > 0 ? article.thumbnails[0].fileId : null,
        });
      });
      this.state.set(STATE_KEY_QUERY, this.articles);
    });

    this.subscriptions = [...this.subscriptions, querySub];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
