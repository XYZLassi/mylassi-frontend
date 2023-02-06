import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IndexPageComponent} from './index-page/index-page.component';
import {LayoutsModule} from "../components/layouts/layouts.module";
import {ViewsModule} from "../views/views.module";
import {LoginPageComponent} from './login-page/login-page.component';
import {AppRoutingModule} from "../app-routing.module";
import {FormsModule} from "../components/forms/forms.module";
import { ArticlePageComponent } from './article-page/article-page.component';
import {ArticlesModule} from "../components/articles/articles.module";


@NgModule({
  declarations: [
    IndexPageComponent,
    LoginPageComponent,
    ArticlePageComponent
  ],
    imports: [
        CommonModule,
        LayoutsModule,
        ViewsModule,
        AppRoutingModule,
        FormsModule,
        ArticlesModule,
    ]
})
export class PagesModule {
}
