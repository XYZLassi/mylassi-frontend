import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleDetailRoutingModule } from './article-detail-routing.module';
import { ArticleShowPageComponent } from './article-show-page/article-show-page.component';
import {ArticleUiModule} from "../../ui/article-ui/article-ui.module";
import {SpinnersModule} from "../../../shared/ui/spinners";


@NgModule({
  declarations: [
    ArticleShowPageComponent
  ],
    imports: [
        CommonModule,
        ArticleDetailRoutingModule,
        ArticleUiModule,
        SpinnersModule
    ]
})
export class ArticleDetailModule { }
