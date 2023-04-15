import {Component, Input} from '@angular/core';
import {IMAGE_LOADER, ImageLoaderConfig} from "@angular/common";

export interface IApiImageViewImage {
  fileId: string

  imageWidth?: number
  imageHeight?: number

  altText?: string
}

@Component({
  selector: 'app-api-image-view',
  templateUrl: './api-image-view.component.html',
  styleUrls: ['./api-image-view.component.scss'],
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        if (config.width)
          return `/images/${config.src}?width=${config.width}`;
        return `/images/${config.src}`;
      },
    },
  ],
})
export class ApiImageViewComponent<TData extends IApiImageViewImage> {
  @Input() imageInfo?: IApiImageViewImage
  @Input() isBusy = false;

  public loadError = false;

  public getSrcSet() {
    if (!this.imageInfo)
      return ""

    const breakPoints = [16, 48, 96, 128, 384, 640, 750, 828, 1080, 1200, 1920];
    const width = this.imageInfo.imageWidth || 0;
    return breakPoints.filter(i => i <= width).map(i => `${i}w`).join(', ');
  }
}
