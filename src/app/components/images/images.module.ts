import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiImageViewComponent } from './api-image-view/api-image-view.component';
import { ApiImageUploaderComponent } from './api-image-uploader/api-image-uploader.component';



@NgModule({
    declarations: [
        ApiImageViewComponent,
        ApiImageUploaderComponent
    ],
    exports: [
        ApiImageViewComponent,
        ApiImageUploaderComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ImagesModule { }
