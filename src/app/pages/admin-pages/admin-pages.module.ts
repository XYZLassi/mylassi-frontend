import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ImagesModule} from "../../components/images";
import {ArticlesModule} from "../../components/articles";

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
import {
  AdminEditArticleContentPageComponent
} from './_pages';
import {ArticleContentEditFormComponent} from './_forms/article-content-edit-form/article-content-edit-form.component';
import {
  AdminCreateArticleContentPageComponent
} from './_pages';


@NgModule({
  declarations: [
    AdminIndexPageComponent,
    AdminCreateArticlePageComponent,
    AdminIndexArticlePageComponent,
    AdminEditArticlePageComponent,

    ApiImageUploaderComponent,
    ArticleEditFormComponent,
    AdminEditArticleContentPageComponent,
    ArticleContentEditFormComponent,
    AdminCreateArticleContentPageComponent,
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
