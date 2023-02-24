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

  constructor(private apollo: Apollo, private state: TransferState) {

  }

  ngOnInit(): void {
    const query = graphql`
      query DashboardPosts{
        articles{
          id
          title
          teaser
          thumbnails:filesByUsage(usage: "thumbnail") {
            fileId
          }
        }
      }`

    this.articles = this.state.get(STATE_KEY_QUERY, []);

    let querySub = this.apollo.watchQuery<DashboardPostsQuery>({query}).valueChanges.subscribe(next => {
      this.articles = [];
      next.data.articles.forEach(article => {
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
