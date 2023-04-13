import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ApiImageViewComponent} from './api-image-view/api-image-view.component';
import {ApiImageLoaderViewComponent} from './api-image-loader-view/api-image-loader-view.component';
import { FileImageViewComponent } from './file-image-view/file-image-view.component';
import { ApiArticleThumbnailLoaderViewComponent } from './api-article-thumbnail-loader-view/api-article-thumbnail-loader-view.component';


@NgModule({
    declarations: [
        ApiImageViewComponent,
        ApiImageLoaderViewComponent,
        FileImageViewComponent,
        ApiArticleThumbnailLoaderViewComponent
    ],
  exports: [
    ApiImageLoaderViewComponent,
    FileImageViewComponent,
    ApiArticleThumbnailLoaderViewComponent
  ],
    imports: [
        CommonModule,
        NgOptimizedImage
    ]
})
export class ImagesModule {
}
