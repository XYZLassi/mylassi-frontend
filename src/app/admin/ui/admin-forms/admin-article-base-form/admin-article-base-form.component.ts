import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";
import {IApiArticleFileUsage, IApiArticleOptionsRestType, IApiFullArticleRestType} from "../../../../../api";


export interface IAdminArticleBaseFormOutputData {
  article: IApiArticleOptionsRestType,
  apiImagesIds: string[]
  thumbnailFiles: File[]
}

@Component({
  selector: 'app-admin-article-base-form',
  templateUrl: './admin-article-base-form.component.html',
  styleUrls: ['./admin-article-base-form.component.scss']
})
export class AdminArticleBaseFormComponent implements OnInit, OnDestroy {
  public articleForm = new FormGroup({
    title: new FormControl('Title', [
      Validators.required
    ]),
    teaser: new FormControl('', []),
  });


  @Input() errorMessage?: string
  @Input() isBusy = false;

  @Input() btnText = 'Erstellen'

  public internErrorMessage?: string;

  public apiThumbnailImages: string[] = [];
  public uploadThumbnailFiles: File[] = [];

  @Input() baseArticleData?: IApiFullArticleRestType;

  @Output() valuesChanges = new EventEmitter<Partial<{
    title: string | null | undefined,
    teaser: string | null | undefined,
  }>>

  @Output() submitForm = new EventEmitter<IAdminArticleBaseFormOutputData>()

  private subscriptions: Subscription[] = [];


  ngOnInit(): void {
    if (this.baseArticleData) {
      this.articleForm.setValue({
        title: this.baseArticleData.title,
        teaser: this.baseArticleData.teaser || null,
      });

      if (this.baseArticleData.articleFiles)
        this.apiThumbnailImages = this.baseArticleData.articleFiles
          .filter(i => i.fileUsage == IApiArticleFileUsage.Thumbnail)
          .map(i => i.fileId)

    }

    const updateSub = this.articleForm.valueChanges.subscribe(
      values => {
        this.valuesChanges.emit(values)
      }
    );
    this.subscriptions = [...this.subscriptions, updateSub];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onUploadFilesChanged(files: File[]) {
    this.uploadThumbnailFiles = files;
  }

  onApiImagesChanges(apiImages: string[]) {
    this.apiThumbnailImages = apiImages;
  }

  onSubmit($event: any) {
    try {
      this.submitForm.emit({
        article: this.getArticleOptions(),
        thumbnailFiles: this.uploadThumbnailFiles,
        apiImagesIds: this.apiThumbnailImages,
      });
    } catch (error: any) {
      this.internErrorMessage = error.message;
    }
  }

  private getArticleOptions(): IApiArticleOptionsRestType {
    const {title, teaser} = this.articleForm.value

    if (!title)
      throw new Error('Title is undefined or null')

    return {
      title: title,
      teaser: teaser || undefined
    }
  }
}
