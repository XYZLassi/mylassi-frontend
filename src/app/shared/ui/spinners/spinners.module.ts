import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleSpinnerComponent } from './circle-spinner/circle-spinner.component';



@NgModule({
    declarations: [
        CircleSpinnerComponent
    ],
    exports: [
        CircleSpinnerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SpinnersModule { }
