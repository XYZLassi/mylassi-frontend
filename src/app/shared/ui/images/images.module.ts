import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ApiImageViewComponent} from './api-image-view/api-image-view.component';
import {ApiImageLoaderViewComponent} from './api-image-loader-view/api-image-loader-view.component';


@NgModule({
    declarations: [
        ApiImageViewComponent,
        ApiImageLoaderViewComponent
    ],
    exports: [
        ApiImageLoaderViewComponent
    ],
    imports: [
        CommonModule,
        NgOptimizedImage
    ]
})
export class ImagesModule {
}
