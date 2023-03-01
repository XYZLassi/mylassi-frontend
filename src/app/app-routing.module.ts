import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
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
import {
  AdminIndexArticlePageComponent
} from "./pages/_admin/_articles/admin-index-article-page/admin-index-article-page.component";
import {
  AdminEditArticlePageComponent
} from "./pages/_admin/_articles/admin-edit-article-page/admin-edit-article-page.component";

const routes: Routes = [
  {path: '', component: ArticleListPageComponent, data: {animation: 'Index'}},
  {path: 'login', component: LoginPageComponent, data: {animation: 'Login'}},
  {path: 'articles/:articleId', component: ArticlePageComponent, data: {animation: 'Article'}},

  {path: 'admin', component: AdminIndexPageComponent, canActivate: [AuthGuard]},
  {path: 'admin/articles', component: AdminIndexArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'admin/articles/new', component: AdminCreateArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'admin/articles/:id', component: AdminEditArticlePageComponent, canActivate: [AuthGuard]},


  {path: ':category', component: ArticleListPageComponent, data: {animation: 'Category'}},

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
