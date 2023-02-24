import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiImageViewComponent } from './api-image-view/api-image-view.component';
import { ApiImageUploaderComponent } from './api-image-uploader/api-image-uploader.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ShapesModule} from "../shapes/shapes.module";



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
        CommonModule,
        FontAwesomeModule,
        ShapesModule
    ]
})
export class ImagesModule { }
