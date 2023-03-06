import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ImagesModule} from "../../components/images/images.module";
import {ArticlesModule} from "../../components/articles/articles.module";

import {
  AdminCreateArticlePageComponent,
  AdminEditArticlePageComponent,
  AdminIndexArticlePageComponent,
  AdminIndexPageComponent
} from "./_pages";
import {ApiImageUploaderComponent} from "./_components";
import {ShapesModule} from "../../components/shapes/shapes.module";
import {ArticleEditFormComponent} from "./_forms";
import {ReactiveFormsModule} from "@angular/forms";
import { AdminEditArticleContentPageComponent } from './_pages/_articles/admin-edit-article-content-page/admin-edit-article-content-page.component';


@NgModule({
  declarations: [
    AdminIndexPageComponent,
    AdminCreateArticlePageComponent,
    AdminIndexArticlePageComponent,
    AdminEditArticlePageComponent,

    ApiImageUploaderComponent,
    ArticleEditFormComponent,
    AdminEditArticleContentPageComponent,
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    FontAwesomeModule,
    ImagesModule,
    ArticlesModule,
    ShapesModule,
    ReactiveFormsModule
  ],
  exports: [
    ApiImageUploaderComponent,
    ArticleEditFormComponent
  ]
})
export class AdminPagesModule {
}
