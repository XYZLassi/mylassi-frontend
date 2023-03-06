import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArticlesService} from "../../../../../api/services/articles.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleContentRestType} from "../../../../../api/models/article-content-rest-type";
import {ArticleContentOptionsRestType} from "../../../../../api/models/article-content-options-rest-type";

@Component({
  selector: 'app-admin-edit-article-content-page',
  templateUrl: './admin-edit-article-content-page.component.html',
  styleUrls: ['./admin-edit-article-content-page.component.scss']
})
export class AdminEditArticleContentPageComponent implements OnInit, OnDestroy {

  public articleContent?: ArticleContentRestType;
  private articleId?: number;
  private subscriptions: Subscription[] = [];

  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    const navSub = this.route.params.subscribe(params => {
      this.articleContent = undefined;
      this.articleId = undefined;

      const articleId = parseInt(params['id']);
      const contentId = parseInt(params['contentId']);

      if (isNaN(articleId) || isNaN(contentId)) {
        // Error 404
        return;
      }

      const loadContentSUb = this.articlesService.getContentFromArticle({
        article: articleId,
        content: contentId,
      }).subscribe(content => {
        this.articleId = articleId;
        this.articleContent = content;
      });
      this.subscriptions = [...this.subscriptions, loadContentSUb];
    });
    this.subscriptions = [...this.subscriptions, navSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSave(articleContent: ArticleContentOptionsRestType) {
    if (!this.articleContent || !this.articleId)
      return;

    const updateSub = this.articlesService.updateArticleContent({
      article: this.articleId,
      content: this.articleContent.id,
      body: articleContent,
    }).subscribe(value => {
      this.router.navigate(['/admin', 'articles', this.articleId]);
    });

    this.subscriptions = [...this.subscriptions, updateSub];
  }
}
