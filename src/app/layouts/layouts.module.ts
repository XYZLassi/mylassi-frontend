import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullSinglePageLayoutComponent} from './full-single-page-layout/full-single-page-layout.component';
import {SinglePageLayoutComponent} from './single-page-layout/single-page-layout.component';
import {AppRoutingModule} from "../app-routing.module";
import { AdminPageLayoutComponent } from './admin-page-layout/admin-page-layout.component';


@NgModule({
  declarations: [
    FullSinglePageLayoutComponent,
    SinglePageLayoutComponent,
    AdminPageLayoutComponent,
  ],
    exports: [
        FullSinglePageLayoutComponent,
        SinglePageLayoutComponent,
        AdminPageLayoutComponent
    ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class LayoutsModule {
}
