import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {RouterLink} from "@angular/router";
import {ImagesModule} from "../images/images.module";


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
        ImagesModule
    ]
})
export class ArticlesModule {
}
