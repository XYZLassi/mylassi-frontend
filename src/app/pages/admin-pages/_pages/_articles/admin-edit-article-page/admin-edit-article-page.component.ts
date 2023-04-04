import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from "../../../../../api/services/articles.service";
import {Subscription, switchMap, take} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {ArticleOptionsRestType} from "../../../../../api/models/article-options-rest-type";
import {ArticleRestType} from "../../../../../api/models/article-rest-type";
import {ArticleFileUsage} from "../../../../../api/models/article-file-usage";
import {ArticleContentRestType} from "../../../../../api/models/article-content-rest-type";
import {filter, map} from "rxjs/operators";
import {ArticleFileRestType} from "../../../../../api/models/article-file-rest-type";
import {FileRestType} from "../../../../../api/models/file-rest-type";

@Component({
  selector: 'app-admin-edit-article-page',
  templateUrl: './admin-edit-article-page.component.html',
  styleUrls: ['./admin-edit-article-page.component.scss']
})
export class AdminEditArticlePageComponent implements OnInit, OnDestroy {
  public article!: ArticleRestType;
  public articleContent: ArticleContentRestType[] = [];

  public articleFiles: ArticleFileRestType[] = [];

  public get thumbnailImages() {
    return this.articleFiles.filter(i => i.fileUsage === ArticleFileUsage.Thumbnail)
  }


  private subscriptions: Subscription[] = [];

  constructor(private articlesService: ArticlesService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const initSub = this.route.params.pipe(
      map(params => parseInt(params['id'])),
      filter(id => !isNaN(id)),
      switchMap(id => {
        return this.articlesService.getArticle({article: id}).pipe(take(1))
      }),
      switchMap(article => {
        return this.articlesService.getArticleFiles({article: article.id}).pipe(
          take(1),
          map(files => {
            return {
              article: article,
              files: files,
            }
          })
        )
      }),
      switchMap(articleFiles => {
        return this.articlesService.getContentsFromArticle({article: articleFiles.article.id}).pipe(
          take(1),
          map(contents => {
            return {
              article: articleFiles.article,
              files: articleFiles.files,
              contents: contents,
            }
          })
        )
      })
    ).subscribe(article => {
        this.article = article.article;
        this.articleContent = article.contents;
        this.articleFiles = article.files;
      }
    );
    this.subscriptions = [...this.subscriptions, initSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSubmit($event: ArticleOptionsRestType) {
    const updateSub = this.articlesService.addOrReplaceFilesToArticle({
      article: this.article.id,
      body: this.articleFiles
    }).subscribe(articleFiles => {
        this.articleFiles = articleFiles;
      }
    );

    this.subscriptions = [...this.subscriptions, updateSub];
  }


  onThumbnailUploaded(image: FileRestType) {
    this.addFileToArticle(image, ArticleFileUsage.Thumbnail);
  }

  onRemoveImage(articleFile: ArticleFileRestType) {
    this.articleFiles = this.articleFiles.filter(file => file.articleFileId !== articleFile.articleFileId)
  }

  addFileToArticle(file: FileRestType, fileUsage?: ArticleFileUsage) {
    const addSub = this.articlesService.addFileToArticle({
      article: this.article.id,
      body: [
        {
          fileId: file.id,
          fileUsage: fileUsage
        }
      ]
    }).pipe(
      take(1)
    ).subscribe(articleFile => {
      this.articleFiles.push(...articleFile);
    });

    this.subscriptions = [...this.subscriptions, addSub];
  }
}
