import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { ImageUploadSelectorFormControlComponent } from './image-upload-selector-form-control/image-upload-selector-form-control.component';
import {ImagesModule} from "../images";



@NgModule({
    declarations: [
        ImageUploadSelectorFormControlComponent
    ],
    exports: [
        ImageUploadSelectorFormControlComponent
    ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    ImagesModule
  ]
})
export class FormControlsModule { }
