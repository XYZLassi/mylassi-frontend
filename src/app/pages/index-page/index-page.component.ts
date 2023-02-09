import {Component, OnInit} from '@angular/core';
import {Apollo, graphql} from "apollo-angular";
import {DashboardPostsQuery} from "../../../generated/graphql";
import {ArticleListModel} from "../../components/articles/interfaces";


@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public articles: ArticleListModel[] = [];

  constructor(private _apollo: Apollo) {
  }

  ngOnInit(): void {
    const query = graphql`
      query DashboardPosts{
        articles{
          id
          title
          teaser
          filesByUsage(usage: "thumbnail") {
            fileId
          }
        }
      }`

    this._apollo.watchQuery<DashboardPostsQuery>({query}).valueChanges.subscribe(next => {
      next.data.articles.forEach(article => {
        this.articles.push({
          id: parseInt(article.id),
          title: article.title,
          teaser: article.teaser,
          thumbnailImageId: article.filesByUsage.length > 0 ? article.filesByUsage[0].fileId : null,
        });
      });
    })
  }

}
