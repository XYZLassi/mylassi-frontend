import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTeaserListComponent } from './article-teaser-list/article-teaser-list.component';
import { ArticleTeaserViewComponent } from './article-teaser-view/article-teaser-view.component';
import {ImagesModule} from "../../../shared/ui/images/images.module";
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        ArticleTeaserListComponent,
        ArticleTeaserViewComponent
    ],
    exports: [
        ArticleTeaserListComponent
    ],
    imports: [
        CommonModule,
        ImagesModule,
        RouterLink
    ]
})
export class ArticleUiModule { }
