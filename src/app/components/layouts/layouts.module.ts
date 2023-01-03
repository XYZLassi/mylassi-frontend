import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullSinglePageLayoutComponent } from './full-single-page-layout/full-single-page-layout.component';




@NgModule({
    declarations: [
    FullSinglePageLayoutComponent
  ],
  exports: [
    FullSinglePageLayoutComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LayoutsModule { }
