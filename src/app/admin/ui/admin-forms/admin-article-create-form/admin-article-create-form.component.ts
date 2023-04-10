import {Component, EventEmitter, inject, isDevMode, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {mergeMap, of, Subscription, switchMap, take} from "rxjs";
import {
  ApiArticlesService,
  ApiFilesService,
  IApiAppendArticleFileOptionsRestType,
  IApiArticleFileUsage, IApiFullArticleRestType
} from "../../../../../api";
import {map, toArray} from "rxjs/operators";

@Component({
  selector: 'app-admin-article-create-form',
  templateUrl: './admin-article-create-form.component.html',
  styleUrls: ['./admin-article-create-form.component.scss']
})
export class AdminArticleCreateFormComponent implements OnInit, OnDestroy {

  private filesService = inject(ApiFilesService);
  private articlesService = inject(ApiArticlesService)

  @Output() articleCreated = new EventEmitter<IApiFullArticleRestType>();

  public createArticleForm = new FormGroup({
    title: new FormControl('Title', [
      Validators.required
    ]),
    teaser: new FormControl('', []),
  });

  public errorMessage?: string
  public isBusy = false;

  public thumbnailFiles: File[] = [];

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const updateSub = this.createArticleForm.valueChanges.subscribe(_ => {
        this.errorMessage = undefined;
      }
    );

    this.subscriptions = [...this.subscriptions, updateSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onUploadFilesChanged(files: File[]) {
    this.thumbnailFiles = files;
  }

  onSubmit($event: any) {
    const {title, teaser} = this.createArticleForm.value;

    this.isBusy = false;
    this.errorMessage = undefined;

    if (!title) {
      this.errorMessage = "Kein Title angeben";
      return
    }

    this.isBusy = true;

    const createSub = of(...this.thumbnailFiles).pipe(
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
        return this.articlesService.createNewArticle({
          body: {
            title: title,
            teaser: teaser || undefined,
          }
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
                return this.articlesService.getFullArticle({article: article.id}).pipe(take(1));
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
          this.errorMessage = err.error.detail;
      }
    });

    this.subscriptions = [...this.subscriptions, createSub];
  }

}
