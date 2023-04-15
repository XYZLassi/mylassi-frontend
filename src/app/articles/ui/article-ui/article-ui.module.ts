import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleTeaserListComponent} from './article-teaser-list/article-teaser-list.component';
import {ArticleTeaserViewComponent} from './article-teaser-view/article-teaser-view.component';
import {ImagesModule} from "../../../shared/ui/images/images.module";
import {RouterLink} from "@angular/router";
import {ArticleContentsListComponent} from './article-contents-list/article-contents-list.component';
import {ArticleContentViewComponent} from './article-content-view/article-content-view.component';
import {ArticleContentDirective} from "../../utils/article-template";
import { ArticleHeaderContentViewComponent } from './article-header-content-view/article-header-content-view.component';
import { ArticleTextContentViewComponent } from './article-text-content-view/article-text-content-view.component';
import {SpinnersModule} from "../../../shared/ui/spinners";


@NgModule({
  declarations: [
    ArticleTeaserListComponent,
    ArticleTeaserViewComponent,
    ArticleContentsListComponent,
    ArticleContentViewComponent,
    ArticleHeaderContentViewComponent,
    ArticleTextContentViewComponent
  ],
  exports: [
    ArticleTeaserListComponent,
    ArticleContentsListComponent
  ],
    imports: [
        CommonModule,
        ImagesModule,
        RouterLink,
        ArticleContentDirective,
        SpinnersModule,
    ]
})
export class ArticleUiModule {
}
