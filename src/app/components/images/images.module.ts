import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ApiImageViewComponent} from './api-image-view/api-image-view.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ShapesModule} from "../shapes/shapes.module";
import { FileImageViewComponent } from './file-image-view/file-image-view.component';
import { ApiFileImageSelectorViewComponent } from './api-file-image-selector-view/api-file-image-selector-view.component';


@NgModule({
  declarations: [
    ApiImageViewComponent,
    FileImageViewComponent,
    ApiFileImageSelectorViewComponent,
  ],
    exports: [
        ApiImageViewComponent,
        ApiFileImageSelectorViewComponent,
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
