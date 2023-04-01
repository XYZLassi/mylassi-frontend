import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ApiImageViewComponent} from './api-image-view/api-image-view.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ShapesModule} from "../shapes/shapes.module";


@NgModule({
  declarations: [
    ApiImageViewComponent,
  ],
  exports: [
    ApiImageViewComponent,
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
