import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullSinglePageLayoutComponent } from './full-single-page-layout/full-single-page-layout.component';
import { SinglePageLayoutComponent } from './single-page-layout/single-page-layout.component';




@NgModule({
    declarations: [
    FullSinglePageLayoutComponent,
    SinglePageLayoutComponent
  ],
    exports: [
        FullSinglePageLayoutComponent,
        SinglePageLayoutComponent
    ],
    imports: [
        CommonModule
    ]
})
export class LayoutsModule { }
