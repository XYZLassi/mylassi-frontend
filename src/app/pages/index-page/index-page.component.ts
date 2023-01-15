import {Component, OnInit, ViewChild} from '@angular/core';
import {PostsService} from "../../api/services/posts.service";
import {Apollo, gql} from "apollo-angular";
import {DashboardPostsQuery} from "../../../generate/graphql";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

export interface DashboardPost {
  id: number
  title: string
  teaser: string | undefined | null
}

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {


  public posts: DashboardPost[] = [];

  constructor(private _postService: PostsService,
              private _apollo: Apollo) {
  }

  ngOnInit(): void {
    const query = gql`
      query DashboardPosts{
        posts{
          id
          title
          teaser
        }
      }`

    this._apollo.watchQuery<DashboardPostsQuery>({query}).valueChanges.subscribe(next => {
      next.data.posts.forEach(post => {
        this.posts.push({
          id: parseInt(post.id),
          title: post.title,
          teaser: post.teaser,
        });
      });
    })
  }

}
