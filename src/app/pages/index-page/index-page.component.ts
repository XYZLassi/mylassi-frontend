import {Component, OnDestroy, OnInit} from '@angular/core';
import {Apollo, graphql} from "apollo-angular";
import {DashboardPostsQuery} from "../../../generated/graphql";
import {ArticleListModel} from "../../components/articles/interfaces";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit, OnDestroy {
  public articles: ArticleListModel[] = [];

  private subscriptions: Subscription[] = []

  constructor(private _apollo: Apollo) {
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

    let querySub = this._apollo.watchQuery<DashboardPostsQuery>({query}).valueChanges.subscribe(next => {
      next.data.articles.forEach(article => {
        this.articles.push({
          id: parseInt(article.id),
          title: article.title,
          teaser: article.teaser,
          thumbnailImageId: article.thumbnails.length > 0 ? article.thumbnails[0].fileId : null,
        });
      });
    });

    this.subscriptions = [...this.subscriptions, querySub];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
