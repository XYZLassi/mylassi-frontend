import {Component, OnDestroy} from '@angular/core';
import {ArticlesService} from "../../../../api/services/articles.service";
import {EMPTY, Subject, Subscription} from "rxjs";
import {ArticleFileUsage} from "../../../../api/models/article-file-usage";
import {ArticleOptionsRestType} from "../../../../api/models/article-options-rest-type";
import {Router} from "@angular/router";
import {ArticleFileUploadData, FileUploadService} from "../../../../services/file-upload.service";

@Component({
  selector: 'app-admin-create-article-page',
  templateUrl: './admin-create-article-page.component.html',
  styleUrls: ['./admin-create-article-page.component.scss']
})
export class AdminCreateArticlePageComponent implements OnDestroy {

  private subscriptions: Subscription[] = [];
  thumbnailImages: ArticleFileUploadData[] = [];
  thumbnailUsage = ArticleFileUsage.Thumbnail;

  constructor(private articleService: ArticlesService,
              private fileUploadService: FileUploadService,
              private router: Router) {
  }

  onSubmit($event: ArticleOptionsRestType) {
    const createSub = this.articleService.createNewArticle({
      body: $event
    }).subscribe(value => {
      const uploadSub = this.fileUploadService.uploadFilesToArticle(value, this.thumbnailImages)
        .subscribe({
          next: (i) => {
            console.log(i);
          },
          complete: () => {
            console.log('Complete');
            this.router.navigate(['/articles', value.id]);
          }
        });

      this.subscriptions = [...this.subscriptions, uploadSub];
    });

    this.subscriptions = [...this.subscriptions, createSub];
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
