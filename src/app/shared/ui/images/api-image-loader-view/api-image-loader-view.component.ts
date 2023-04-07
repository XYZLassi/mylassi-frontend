import {Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ApiFilesService, IApiFileRestType} from "../../../../../api";
import {Subscription, take} from "rxjs";
import {IApiImageViewImage} from "../api-image-view/api-image-view.component";

@Component({
  selector: 'app-api-image-loader-view',
  templateUrl: './api-image-loader-view.component.html',
  styleUrls: ['./api-image-loader-view.component.scss']
})
export class ApiImageLoaderViewComponent implements OnInit, OnChanges, OnDestroy {
  private fileService = inject(ApiFilesService);

  public imageInfo?: IApiImageViewImage;

  @Input() imageId?: string;

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.updateImage();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateImage();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  private updateImage() {
    this.imageInfo = undefined;

    if (!this.imageId) {
      return
    }

    const loadSub = this.fileService.getFileInfo({
      file: this.imageId
    }).pipe(
      take(1),
    ).subscribe({
      next: info => {
        this.imageInfo = {
          fileId: info.id,
          imageWidth: info.imageWidth,
          imageHeight: info.imageHeight,
          altText: info.filename
        }
      },
      error: err => {
        //Todo: LoadError
      },
      complete: () => {
        loadSub.unsubscribe();
      }
    });
    this.subscriptions = [...this.subscriptions, loadSub];
  }

}
