import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from "../../../../../api/services/articles.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ArticleOptionsRestType} from "../../../../../api/models/article-options-rest-type";
import {ArticleRestType} from "../../../../../api/models/article-rest-type";
import {ArticleFileUsage} from "../../../../../api/models/article-file-usage";
import {ArticleFileUploadData, FileUploadService} from "../../../../../services/file-upload.service";
import {ArticleContentRestType} from "../../../../../api/models/article-content-rest-type";

@Component({
  selector: 'app-admin-edit-article-page',
  templateUrl: './admin-edit-article-page.component.html',
  styleUrls: ['./admin-edit-article-page.component.scss']
})
export class AdminEditArticlePageComponent implements OnInit, OnDestroy {
  article?: ArticleRestType;
  articleContent: ArticleContentRestType[] = [];

  private subscriptions: Subscription[] = [];

  thumbnailImages: ArticleFileUploadData[] = [];

  thumbnailUsage = ArticleFileUsage.Thumbnail;

  constructor(private articlesService: ArticlesService, private fileUploadService: FileUploadService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const paramSub = this.route.params.subscribe(params => {
      const articleId = parseInt(params['id']);
      if (!articleId) {
        // Todo: 404
        return
      }

      const articleSub = this.articlesService.getArticle({
        article: articleId
      }).subscribe(article => {
        this.article = article;

        const loadArticleFileSub = this.articlesService.getArticleFiles({
          article: article.id,
        }).subscribe(articleFiles => {
          this.thumbnailImages = articleFiles.filter(i => i.fileUsage == ArticleFileUsage.Thumbnail)
            .map<ArticleFileUploadData>(i => {
              return {
                file: i.fileId,
                fileUsage: i.fileUsage || null
              }
            });
        });

        const loadContentSub = this.articlesService.getContentsFromArticle({
          article: article.id
        }).subscribe(value => {
          this.articleContent = value;
        });

        this.subscriptions = [...this.subscriptions, loadArticleFileSub, loadContentSub];
      });

      this.subscriptions = [...this.subscriptions, articleSub];
    });

    this.subscriptions = [...this.subscriptions, paramSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


  onSubmit($event: ArticleOptionsRestType) {
    if (!this.article)
      return

    const updateSub = this.articlesService.updateArticle({
      article: this.article.id,
      body: $event
    }).subscribe(value => {
      this.article = value;
    });

    const uploadService = this.fileUploadService.uploadFilesToArticle(this.article, this.thumbnailImages).subscribe()

    this.subscriptions = [...this.subscriptions, updateSub, uploadService];
  }
}
