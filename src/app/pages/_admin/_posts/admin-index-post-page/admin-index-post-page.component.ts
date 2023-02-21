import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArticlesService} from "../../../../api/services/articles.service";
import {FullArticleRestType} from "../../../../api/models/full-article-rest-type";
import {faTrash, faTrashRestore} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-admin-index-post-page',
  templateUrl: './admin-index-post-page.component.html',
  styleUrls: ['./admin-index-post-page.component.scss']
})
export class AdminIndexPostPageComponent implements OnInit, OnDestroy {

  faTrash = faTrash;
  faTrashRestore = faTrashRestore;

  articles: FullArticleRestType[] = [];

  private subscriptions: Subscription[] = [];

  constructor(private articleService: ArticlesService) {
  }

  ngOnInit(): void {
    this.loadArticles();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  loadArticles() {
    const loadArticlesSub = this.articleService.getAllArticles().subscribe(articles => {
      this.articles = articles;
    });

    this.subscriptions = [...this.subscriptions, loadArticlesSub];
  }


  onDeleteArticle($event: any, article: FullArticleRestType) {
    if (confirm("Möchtest du den Artikel wirklich löschen?")) {
      const deleteArticleSub = this.articleService.deleteArticle({
        article: article.id
      }).subscribe(value => {
        this.loadArticles(); // Todo: if okay?
      });

      this.subscriptions = [...this.subscriptions, deleteArticleSub];
    }
  }

  onRestoreArticle($event: any, article: FullArticleRestType) {
    if (confirm("Möchtest du den Artikel wirklich wiederherstellen?")) {
      const restoreArticleSub = this.articleService.restoreArticle({
        article: article.id
      }).subscribe(value => {
        this.loadArticles(); // Todo: if okay?
      });

      this.subscriptions = [...this.subscriptions, restoreArticleSub];
    }
  }
}
