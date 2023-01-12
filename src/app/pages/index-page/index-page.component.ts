import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {PostsService} from "../../api/services/posts.service";
import {PostRestType} from "../../api/models/post-rest-type";

@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss']
})
export class IndexPageComponent implements OnInit {


  public posts: PostRestType[] = [];

  constructor(private _postService: PostsService) {
  }

  ngOnInit(): void {

    this._postService.getPostsPostsGet$Response().subscribe(next => {
      if (next.body) {
        next.body.forEach(post => {
          this.posts.push(post);
        })
      }
    })
  }

}
