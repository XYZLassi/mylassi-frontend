import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ArticlesService} from "../../../../api/services/articles.service";
import {Observable, Subject, Subscription} from "rxjs";
import {ArticleFileUsage} from "../../../../api/models/article-file-usage";
import {ApiImageUploaderEvent} from "../../../../components/images/api-image-uploader/api-image-uploader.component";
import {ArticleFileRestType} from "../../../../api/models/article-file-rest-type";

@Component({
  selector: 'app-admin-create-post-page',
  templateUrl: './admin-create-post-page.component.html',
  styleUrls: ['./admin-create-post-page.component.scss']
})
export class AdminCreatePostPageComponent implements OnDestroy {

  postForm = new FormGroup({
    title: new FormControl('Post Title'),
    teaser: new FormControl('Teaser')
  })

  thumbnailFile: File | null = null;
  private subscriptions: Subscription[] = [];

  constructor(private articleService: ArticlesService) {
  }

  onSubmit($event: any) {
    const values = this.postForm.value;

    if (!values.title)
      return

    const createSub = this.articleService.createNewArticle({
      body: {
        title: values.title,
        teaser: values.teaser || undefined,
      }
    }).subscribe(value => {
      this.postForm.reset();

      const uploadSub = this.uploadThumbnail(value.id)?.subscribe();
      if (uploadSub) {
        this.subscriptions = [...this.subscriptions, uploadSub];
      }
    });
    this.subscriptions = [...this.subscriptions, createSub];
  }

  uploadThumbnail(articleId: number): Observable<ArticleFileRestType> | null {
    const uploadSubject = new Subject<ArticleFileRestType>();

    if (!this.thumbnailFile)
      return null;

    const uploadThumbnailSub = this.articleService.uploadFileToArticle({
      article: articleId,
      body: {
        file: this.thumbnailFile
      }
    }).subscribe(uploadFile => {
      const updateThumbnailSub = this.articleService.updateArticleFile({
        article: articleId,
        article_file: uploadFile.article_file_id,
        body: {
          file_usage: ArticleFileUsage.Thumbnail
        }
      }).subscribe(updateFiles => {
        uploadSubject.next(updateFiles);
        uploadSubject.complete();
      });
      this.subscriptions = [...this.subscriptions, updateThumbnailSub];
    });
    this.subscriptions = [...this.subscriptions, uploadThumbnailSub];

    return uploadSubject.asObservable();
  }

  onThumbnailChanged($event: ApiImageUploaderEvent) {
    this.thumbnailFile = $event.imageFile;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


}
