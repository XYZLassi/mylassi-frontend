import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullPageRouterOutletComponent} from './full-page-router-outlet/full-page-router-outlet.component';
import {LayoutsModule} from "../layouts/layouts.module";


@NgModule({
  declarations: [
    FullPageRouterOutletComponent,
  ],
  imports: [
    CommonModule,
    LayoutsModule,
  ]
})
export class OutletsModule {
}
