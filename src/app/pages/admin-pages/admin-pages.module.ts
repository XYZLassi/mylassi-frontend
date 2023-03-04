import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPagesRoutingModule} from './admin-pages-routing.module';
import {AdminIndexPageComponent} from "./admin-index-page/admin-index-page.component";
import {
  AdminCreateArticlePageComponent
} from "./_articles/admin-create-article-page/admin-create-article-page.component";
import {AdminIndexArticlePageComponent} from "./_articles/admin-index-article-page/admin-index-article-page.component";
import {AdminEditArticlePageComponent} from "./_articles/admin-edit-article-page/admin-edit-article-page.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ImagesModule} from "../../components/images/images.module";
import {ArticlesModule} from "../../components/articles/articles.module";


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
