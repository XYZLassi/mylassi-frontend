import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FullSinglePageLayoutComponent} from './full-single-page-layout/full-single-page-layout.component';
import {SinglePageLayoutComponent} from './single-page-layout/single-page-layout.component';
import {AppRoutingModule} from "../app-routing.module";
import { AdminPageLayoutComponent } from './admin-page-layout/admin-page-layout.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


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
        AppRoutingModule,
        FontAwesomeModule,
        NgOptimizedImage
    ]
})
export class LayoutsModule {
}
