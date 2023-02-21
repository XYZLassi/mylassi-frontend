import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ArticlePageComponent} from "./pages/article-page/article-page.component";
import {ArticleListPageComponent} from "./pages/article-list-page/article-list-page.component";
import {
  ErrorPageNotFoundPageComponent
} from "./pages/_errors/error-page-not-found-page/error-page-not-found-page.component";
import {AdminIndexPageComponent} from "./pages/_admin/admin-index-page/admin-index-page.component";
import {AuthGuard} from "./guards/auth.guard";
import {
  AdminCreateArticlePageComponent
} from "./pages/_admin/_articles/admin-create-article-page/admin-create-article-page.component";
import {AdminIndexArticlePageComponent} from "./pages/_admin/_articles/admin-index-article-page/admin-index-article-page.component";

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'articles/:articleId', component: ArticlePageComponent},

  {path: 'admin', component: AdminIndexPageComponent, canActivate: [AuthGuard]},
  {path: 'admin/posts', component: AdminIndexArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'admin/posts/new', component: AdminCreateArticlePageComponent, canActivate: [AuthGuard]},

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
