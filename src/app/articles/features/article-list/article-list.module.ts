import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticleListRoutingModule} from './article-list-routing.module';
import {ArticleListPageComponent} from './article-list-page/article-list-page.component';
import {ArticleUiModule} from "../../ui/article-ui/article-ui.module";


@NgModule({
  declarations: [
    ArticleListPageComponent
  ],
  imports: [
    CommonModule,
    ArticleListRoutingModule,
    ArticleUiModule
  ]
})
export class ArticleListModule {
}
