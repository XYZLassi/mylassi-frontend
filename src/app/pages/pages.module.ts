import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutsModule} from "../layouts/layouts.module";
import {ViewsModule} from "../views/views.module";
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "../components/forms/forms.module";
import {ArticlePageComponent} from './article-page/article-page.component';
import {ArticlesModule} from "../components/articles/articles.module";
import {ArticleListPageComponent} from './article-list-page/article-list-page.component';
import {ErrorPageNotFoundPageComponent} from './_errors/error-page-not-found-page/error-page-not-found-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ImagesModule} from "../components/images/images.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";


@NgModule({
  declarations: [
    LoginPageComponent,
    ArticlePageComponent,
    ArticleListPageComponent,
    ErrorPageNotFoundPageComponent,

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
