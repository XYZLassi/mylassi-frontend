import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleShowPageComponent } from './article-show-page/article-show-page.component';


@NgModule({
  declarations: [
    ArticleShowPageComponent
  ],
  imports: [
    CommonModule,
    ArticleDetailRoutingModule
  ]
})
export class ArticleDetailModule { }
