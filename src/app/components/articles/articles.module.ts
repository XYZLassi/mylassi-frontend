import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {RouterLink} from "@angular/router";
import {ImagesModule} from "../images/images.module";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArticleListComponent,
  ],
  exports: [
    ArticleListComponent,

  ],
  imports: [
    CommonModule,
    RouterLink,
    ImagesModule,
    ReactiveFormsModule
  ]
})
export class ArticlesModule {
}
