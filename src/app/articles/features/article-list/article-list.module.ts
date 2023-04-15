import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticleListRoutingModule} from './article-list-routing.module';
import {ArticleListPageComponent} from './article-list-page/article-list-page.component';
import {ArticleUiModule} from "../../ui/article-ui/article-ui.module";
import {SpinnersModule} from "../../../shared/ui/spinners";


@NgModule({
  declarations: [
    ArticleListPageComponent
  ],
  imports: [
    CommonModule,
    ArticleListRoutingModule,
    ArticleUiModule,
    SpinnersModule
  ]
})
export class ArticleListModule {
}
