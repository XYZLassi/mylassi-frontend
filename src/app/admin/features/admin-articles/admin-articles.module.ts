import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminArticlesRoutingModule} from './admin-articles-routing.module';
import {AdminArticlesIndexPageComponent} from './admin-articles-index-page/admin-articles-index-page.component';
import {AdminLayoutsModule} from "../../ui/admin-layouts";
import {AdminArticlesCreatePageComponent} from './admin-articles-create-page/admin-articles-create-page.component';
import {AdminFormsModule} from "../../ui/admin-forms";
import {AdminArticlesUiModule} from "../../ui/admin-articles-ui";
import {SpinnersModule} from "../../../shared/ui/spinners";


@NgModule({
  declarations: [
    AdminArticlesIndexPageComponent,
    AdminArticlesCreatePageComponent
  ],
    imports: [
        CommonModule,
        AdminArticlesRoutingModule,
        AdminLayoutsModule,
        AdminFormsModule,
        AdminArticlesUiModule,
        SpinnersModule
    ]
})
export class AdminArticlesModule {
}
