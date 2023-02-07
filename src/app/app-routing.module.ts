import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ArticlePageComponent} from "./pages/article-page/article-page.component";
import {ArticleListPageComponent} from "./pages/article-list-page/article-list-page.component";
import {
  ErrorPageNotFoundPageComponent
} from "./pages/errors/error-page-not-found-page/error-page-not-found-page.component";

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'articles/:id', component: ArticlePageComponent},


  {path: ':category', component: ArticleListPageComponent},

  // 404
  {path: 'error/404', component: ErrorPageNotFoundPageComponent},
  {path: '**', pathMatch: 'full', component: ErrorPageNotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
