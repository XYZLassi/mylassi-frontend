import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BorderBoxComponent } from './border-box/border-box.component';
import { BorderBoxTextWithIconComponent } from './border-box-text-with-icon/border-box-text-with-icon.component';



@NgModule({
    declarations: [
        BorderBoxComponent,
        BorderBoxTextWithIconComponent
    ],
  exports: [
    BorderBoxComponent,
    BorderBoxTextWithIconComponent
  ],
    imports: [
        CommonModule
    ]
})
export class ShapesModule { }
