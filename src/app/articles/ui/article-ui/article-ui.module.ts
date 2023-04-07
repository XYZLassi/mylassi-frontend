import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleTeaserListComponent } from './article-teaser-list/article-teaser-list.component';



@NgModule({
    declarations: [
        ArticleTeaserListComponent
    ],
    exports: [
        ArticleTeaserListComponent
    ],
    imports: [
        CommonModule
    ]
})
export class ArticleUiModule { }
