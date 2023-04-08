import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppRoutingModule} from "../../../app-routing.module";
import {SinglePageLayoutComponent} from "./single-page-layout/single-page-layout.component";
import {FullPageLayoutComponent} from './full-page-layout/full-page-layout.component';


@NgModule({
  declarations: [
    SinglePageLayoutComponent,
    FullPageLayoutComponent
  ],
  exports: [
    SinglePageLayoutComponent,
    FullPageLayoutComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ]
})
export class LayoutsModule {
}
