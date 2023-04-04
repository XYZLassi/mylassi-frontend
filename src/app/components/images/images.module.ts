import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ApiImageViewComponent} from './api-image-view/api-image-view.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ShapesModule} from "../shapes/shapes.module";
import {FileImageViewComponent} from './file-image-view/file-image-view.component';
import {ApiFileImageSelectorViewComponent} from './api-file-image-selector-view/api-file-image-selector-view.component';
import {ApiImagesListViewComponent} from './api-images-list-view/api-images-list-view.component';
import {ImageGalleryComponent} from './image-gallery/image-gallery.component';
import { ImageContainerComponent } from './image-container/image-container.component';


@NgModule({
  declarations: [
    ApiImageViewComponent,
    FileImageViewComponent,
    ApiFileImageSelectorViewComponent,
    ApiImagesListViewComponent,
    ImageGalleryComponent,
    ImageContainerComponent,
  ],
  exports: [
    ApiImageViewComponent,
    ApiFileImageSelectorViewComponent,
    ApiImagesListViewComponent,
    ImageGalleryComponent,
    ImageContainerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ShapesModule,
    NgOptimizedImage
  ]
})
export class ImagesModule {
}
