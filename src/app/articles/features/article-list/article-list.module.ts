import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleListRoutingModule } from './article-list-routing.module';
import { ArticleListPageComponent } from './article-list-page/article-list-page.component';


@NgModule({
  declarations: [
    ArticleListPageComponent
  ],
  imports: [
    CommonModule,
    ArticleListRoutingModule
  ]
})
export class ArticleListModule { }
