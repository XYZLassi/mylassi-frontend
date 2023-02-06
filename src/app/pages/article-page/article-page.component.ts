import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticlesService} from "../../api/services/articles.service";

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private articlesService: ArticlesService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
    })
  }

}
