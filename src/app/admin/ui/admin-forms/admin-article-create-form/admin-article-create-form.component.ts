import {Component, EventEmitter, inject, isDevMode, OnDestroy, OnInit, Output} from '@angular/core';
import {mergeMap, of, Subscription, switchMap, take} from "rxjs";
import {
  ApiArticlesService,
  ApiFilesService,
  IApiAppendArticleFileOptionsRestType,
  IApiArticleFileUsage, IApiFullArticleRestType
} from "../../../../../api";
import {toArray} from "rxjs/operators";
import {IAdminArticleBaseFormOutputData} from "../admin-article-base-form/admin-article-base-form.component";

@Component({
  selector: 'app-admin-article-create-form',
  templateUrl: './admin-article-create-form.component.html',
  styleUrls: ['./admin-article-create-form.component.scss']
})
export class AdminArticleCreateFormComponent implements OnInit, OnDestroy {

  private filesService = inject(ApiFilesService);
  private articlesService = inject(ApiArticlesService)


  public errorMessage?: string
  public isBusy = false;

  private subscriptions: Subscription[] = [];
  @Output() articleCreated = new EventEmitter<IApiFullArticleRestType>();

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onValuesChanges($event: Partial<{ title: string | null | undefined; teaser: string | null | undefined }>) {
    this.errorMessage = undefined;
  }


  onSubmit($event: IAdminArticleBaseFormOutputData) {
    this.isBusy = false;
    this.errorMessage = undefined;

    this.isBusy = true;

    const createSub = of(...$event.thumbnailFiles).pipe(
      mergeMap(file => {
        return this.filesService.uploadFile({
          body: {
            file: file
          }
        }).pipe(
          take(1)
        )
      }),
      toArray(),
      switchMap(files => {
        return this.articlesService.createArticle({
          body: $event.article,
        }).pipe(
          take(1),
          switchMap(article => {
            const articleFilesOptions = files.map(file => {
              const articleFilesOption: IApiAppendArticleFileOptionsRestType = {
                fileId: file.id,
                fileUsage: IApiArticleFileUsage.Thumbnail
              };
              return articleFilesOption;
            })

            return this.articlesService.addFileToArticle({
              article: article.id,
              body: articleFilesOptions,
            }).pipe(
              take(1),
              switchMap(_ => {
                return this.articlesService.getArticleFull({article: article.id}).pipe(take(1));
              })
            )
          })
        )
      })
    ).subscribe({
      next: item => {
        this.articleCreated.emit(item);
      },
      complete: () => {
        this.isBusy = false;
      },
      error: (err) => {
        if (isDevMode()) {
          console.error(err);
        }
        this.isBusy = false;

        if (err.status == 401)
          this.errorMessage = "Du bist nicht eingeloggt?";
        else
          this.errorMessage = err.error.detail || err.error;
      }
    });

    this.subscriptions = [...this.subscriptions, createSub];
  }
}
