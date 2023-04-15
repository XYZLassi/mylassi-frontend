import {Component, EventEmitter, inject, Input, isDevMode, OnDestroy, OnInit, Output} from '@angular/core';
import {
  IAdminArticleBaseFormOutputData
} from "../admin-article-base-form/admin-article-base-form.component";
import {defaultIfEmpty, mergeMap, of, Subscription, switchMap, take} from "rxjs";
import {map, tap, toArray} from "rxjs/operators";
import {
  ApiArticlesService,
  ApiFilesService,
  IApiAppendArticleFileOptionsRestType,
  IApiArticleFileUsage, IApiFullArticleRestType
} from "../../../../../api";

@Component({
  selector: 'app-admin-article-edit-form',
  templateUrl: './admin-article-edit-form.component.html',
  styleUrls: ['./admin-article-edit-form.component.scss']
})
export class AdminArticleEditFormComponent implements OnInit, OnDestroy {
  private filesService = inject(ApiFilesService);
  private articlesService = inject(ApiArticlesService)

  public isBusy: boolean = false;
  public errorMessage?: string;

  @Input() baseArticleData!: IApiFullArticleRestType;
  @Output() articleUpdated = new EventEmitter<IApiFullArticleRestType>;


  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const load
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onValuesChanges($event: Partial<{ title: string | null | undefined; teaser: string | null | undefined }>) {
    this.errorMessage = undefined;
  }

  onSubmit($event: IAdminArticleBaseFormOutputData) {
    this.isBusy = false;
    this.errorMessage = undefined;

    this.isBusy = true;

    const updateSub = this.articlesService.updateArticle({
      article: this.baseArticleData.id,
      body: $event.article
    }).pipe(
      take(1),
      switchMap(article => {
        return of(...$event.thumbnailFiles).pipe(
          mergeMap(file => {
            return this.filesService.uploadFile({
              body: {
                file: file
              }
            }).pipe(
              take(1)
            )
          }),
          map(file => {
            const articleFilesOption: IApiAppendArticleFileOptionsRestType = {
              fileId: file.id,
              fileUsage: IApiArticleFileUsage.Thumbnail
            };
            return articleFilesOption;
          }),
          toArray(),
          defaultIfEmpty([]),
          switchMap(files => {
            return this.articlesService.addOrReplaceFilesToArticle({
              article: article.id,
              body: files,
            }).pipe(
              take(1),
              switchMap(_ => {
                return this.articlesService.getFullArticle({article: article.id}).pipe(take(1));
              })
            )
          })
        );
      })
    ).subscribe({
      next: item => {
        this.articleUpdated.emit(item);
      },
      complete: () => {
        this.isBusy = false;
      },
      error: (err) => {
        if (isDevMode()) {
          console.error(err);
        }
        this.isBusy = false;

        console.log(err.error.detail);

        if (err.status == 401)
          this.errorMessage = "Du bist nicht eingeloggt?";
        else
          this.errorMessage = err.error.detail || err.error;
      }
    });

    this.subscriptions = [...this.subscriptions, updateSub];
  }
}
