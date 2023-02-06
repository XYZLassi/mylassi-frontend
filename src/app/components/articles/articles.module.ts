import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    ArticleListComponent,
  ],
  exports: [
    ArticleListComponent,
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class ArticlesModule {
}
