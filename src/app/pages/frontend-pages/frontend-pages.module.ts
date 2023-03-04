import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FrontendPagesRoutingModule} from './frontend-pages-routing.module';
import {ArticleListPageComponent, ArticlePageComponent, LoginPageComponent} from "./_pages";
import {FormsModule} from "../../components/forms/forms.module";
import {ArticlesModule} from "../../components/articles/articles.module";


@NgModule({
  declarations: [
    LoginPageComponent,
    ArticlePageComponent,
    ArticleListPageComponent,
  ],
  imports: [
    CommonModule,
    FrontendPagesRoutingModule,
    FormsModule,
    ArticlesModule
  ]
})
export class FrontendPagesModule {
}
