import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleSpinnerComponent } from './circle-spinner/circle-spinner.component';
import { CircleSpinnerBoxComponent } from './circle-spinner-box/circle-spinner-box.component';



@NgModule({
    declarations: [
        CircleSpinnerComponent,
        CircleSpinnerBoxComponent
    ],
    exports: [
        CircleSpinnerComponent,
        CircleSpinnerBoxComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SpinnersModule { }
