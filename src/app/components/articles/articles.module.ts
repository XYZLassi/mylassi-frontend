import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {RouterLink} from "@angular/router";
import {ImagesModule} from "../images/images.module";
import {ReactiveFormsModule} from "@angular/forms";
import { ArticleContentViewComponent } from './article-content-view/article-content-view.component';


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleContentViewComponent,
  ],
    exports: [
        ArticleListComponent,
        ArticleContentViewComponent,

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
