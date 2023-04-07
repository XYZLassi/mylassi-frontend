import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {AppRoutingModule} from "../../../app-routing.module";
import {SinglePageLayoutComponent} from "./single-page-layout/single-page-layout.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    SinglePageLayoutComponent
  ],
  exports: [
    SinglePageLayoutComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    NgOptimizedImage,
    BrowserAnimationsModule
  ]
})
export class LayoutsModule {
}
