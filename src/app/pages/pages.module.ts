import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexPageComponent} from './index-page/index-page.component';
import {LayoutsModule} from "../components/layouts/layouts.module";
import {ViewsModule} from "../views/views.module";
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "../general/forms/forms.module";
import {ArticlePageComponent} from './article-page/article-page.component';
import {ArticlesModule} from "../components/articles/articles.module";
import {ArticleListPageComponent} from './article-list-page/article-list-page.component';
import {ErrorPageNotFoundPageComponent} from './_errors/error-page-not-found-page/error-page-not-found-page.component';
import {AdminIndexPageComponent} from './_admin/admin-index-page/admin-index-page.component';
import {AdminCreateArticlePageComponent} from './_admin/_articles/admin-create-article-page/admin-create-article-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ImagesModule} from "../components/images/images.module";
import { AdminIndexArticlePageComponent } from './_admin/_articles/admin-index-article-page/admin-index-article-page.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { AdminEditArticlePageComponent } from './_admin/_articles/admin-edit-article-page/admin-edit-article-page.component';


@NgModule({
  declarations: [
    IndexPageComponent,
    LoginPageComponent,
    ArticlePageComponent,
    ArticleListPageComponent,
    ErrorPageNotFoundPageComponent,
    AdminIndexPageComponent,
    AdminCreateArticlePageComponent,
    AdminIndexArticlePageComponent,
    AdminEditArticlePageComponent
  ],
    imports: [
        CommonModule,
        LayoutsModule,
        ViewsModule,
        AppRoutingModule,
        FormsModule,
        ArticlesModule,
        ReactiveFormsModule,
        ImagesModule,
        FontAwesomeModule,
    ]
})
export class PagesModule {
}
