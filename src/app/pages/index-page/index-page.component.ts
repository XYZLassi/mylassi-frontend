import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from "apollo-angular";
import {DashboardPostsQuery} from "../../../generated/graphql";

export interface DashboardPost {
  id: number
  title: string
  teaser: string | undefined | null

  thumbnail: string | undefined | null
}

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {
  public articles: DashboardPost[] = [];

  constructor(private _apollo: Apollo) {
  }

  ngOnInit(): void {
    const query = gql`
      query DashboardPosts{
        articles{
          id
          title
          teaser
          filesByUsage(usage: "thumbnail") {
            url
          }
        }
      }`

    this._apollo.watchQuery<DashboardPostsQuery>({query}).valueChanges.subscribe(next => {
      next.data.articles.forEach(article => {
        this.articles.push({
          id: parseInt(article.id),
          title: article.title,
          teaser: article.teaser,
          thumbnail: article.filesByUsage.length > 0 ? article.filesByUsage[0].url : null,
        });
      });
    })
  }

}
