import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiImageViewComponent } from './api-image-view/api-image-view.component';



@NgModule({
    declarations: [
        ApiImageViewComponent
    ],
    exports: [
        ApiImageViewComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ImagesModule { }
