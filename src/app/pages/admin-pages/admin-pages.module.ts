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


@NgModule({
  declarations: [
    AdminIndexPageComponent,
    AdminCreateArticlePageComponent,
    AdminIndexArticlePageComponent,
    AdminEditArticlePageComponent
  ],
  imports: [
    CommonModule,
    AdminPagesRoutingModule,
    FontAwesomeModule,
    ImagesModule,
    ArticlesModule
  ]
})
export class AdminPagesModule {
}
