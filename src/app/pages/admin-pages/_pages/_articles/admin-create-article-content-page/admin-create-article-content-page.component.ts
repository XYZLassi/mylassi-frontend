import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleContentOptionsRestType} from "../../../../../api/models/article-content-options-rest-type";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticlesService} from "../../../../../api/services/articles.service";
import {Subscription} from "rxjs";
import {ArticleRestType} from "../../../../../api/models/article-rest-type";

@Component({
  selector: 'app-admin-create-article-content-page',
  templateUrl: './admin-create-article-content-page.component.html',
  styleUrls: ['./admin-create-article-content-page.component.scss']
})
export class AdminCreateArticleContentPageComponent implements OnInit, OnDestroy {

  article!: ArticleRestType;

  private subscriptions: Subscription[] = [];


  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit(): void {
    const navSub = this.route.params.subscribe(params => {
      const articleId = parseInt(params['id']);

      if (isNaN(articleId)) {
        // Error 404
        return;
      }

      const loadSub = this.articlesService.getArticle({
        article: articleId
      }).subscribe(value => {
        this.article = value;
      });
      this.subscriptions = [...this.subscriptions, loadSub];

    });

    this.subscriptions = [...this.subscriptions, navSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  onSave(articleContent: ArticleContentOptionsRestType) {
    const saveSub = this.articlesService.addArticleContent({
      article: this.article.id,
      body: [articleContent],
    }).subscribe(value => {
      this.router.navigate(['/admin', 'articles', this.article.id]);
    });

    this.subscriptions = [...this.subscriptions, saveSub];
  }


}
