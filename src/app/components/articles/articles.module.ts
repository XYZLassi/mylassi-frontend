import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ArticleListComponent} from './article-list/article-list.component';
import {RouterLink} from "@angular/router";
import {ImagesModule} from "../images/images.module";
import { ArticleEditFormComponent } from './article-edit-form/article-edit-form.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleEditFormComponent,
  ],
    exports: [
        ArticleListComponent,
        ArticleEditFormComponent,
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
