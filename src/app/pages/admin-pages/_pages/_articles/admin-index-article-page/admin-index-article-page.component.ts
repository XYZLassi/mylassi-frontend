import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArticlesService} from "../../../../../api/services/articles.service";
import {FullArticleRestType} from "../../../../../api/models/full-article-rest-type";
import {faTrash, faTrashRestore} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-index-article-page',
  templateUrl: './admin-index-article-page.component.html',
  styleUrls: ['./admin-index-article-page.component.scss']
})
export class AdminIndexArticlePageComponent implements OnInit, OnDestroy {

  faTrash = faTrash;
  faTrashRestore = faTrashRestore;

  articles: FullArticleRestType[] = [];

  private subscriptions: Subscription[] = [];

  public currentCursor?: string;

  constructor(private articleService: ArticlesService) {
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  updateArticle(articleId: number) {
    const updateArticle = this.articleService.getFullArticle({
      article: articleId
    }).subscribe(article => {
      const indexToUpdate = this.articles.findIndex(i => i.id === article.id);

      if (indexToUpdate >= 0)
        this.articles[indexToUpdate] = article
    })

    this.subscriptions = [...this.subscriptions, updateArticle];
  }


  loadArticles() {
    const loadArticlesSub = this.articleService.getAllArticles({
      cursor: this.currentCursor,
      size: 25,
    }).subscribe(articles => {
      this.articles.push(...articles.items);
      this.currentCursor = articles.cursor;
    });

    this.subscriptions = [...this.subscriptions, loadArticlesSub];
  }


  onDeleteArticle($event: any, article: FullArticleRestType) {
    if (confirm("Möchtest du den Artikel wirklich löschen?")) {
      const deleteArticleSub = this.articleService.deleteArticle({
        article: article.id
      }).subscribe(_ => {
        this.updateArticle(article.id);
      });

      this.subscriptions = [...this.subscriptions, deleteArticleSub];
    }
  }

  onRestoreArticle($event: any, article: FullArticleRestType) {
    if (confirm("Möchtest du den Artikel wirklich wiederherstellen?")) {
      const restoreArticleSub = this.articleService.restoreArticle({
        article: article.id
      }).subscribe(value => {
        this.updateArticle(article.id);
      });

      this.subscriptions = [...this.subscriptions, restoreArticleSub];
    }
  }

  onLoadMoreArticles($event: MouseEvent) {
    if (this.currentCursor)
      this.loadArticles();
  }
}
