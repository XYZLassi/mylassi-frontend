import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ArticlePageComponent} from "./pages/article-page/article-page.component";
import {ArticleListPageComponent} from "./pages/article-list-page/article-list-page.component";
import {
  ErrorPageNotFoundPageComponent
} from "./pages/_errors/error-page-not-found-page/error-page-not-found-page.component";
import {AdminPageLayoutComponent, SinglePageLayoutComponent} from "./layouts";

const routes: Routes = [
  {
    path: 'admin', component: AdminPageLayoutComponent,
    loadChildren: () => import('./pages/admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
  },
  {
    path: '', component: SinglePageLayoutComponent,
    children: [
      {path: '', component: ArticleListPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: 'articles/:articleId', component: ArticlePageComponent},
      {path: ':category', component: ArticleListPageComponent},
    ]
  },
  {
    path: 'error', component: SinglePageLayoutComponent,
    children: [
      {path: '404', component: ErrorPageNotFoundPageComponent},
    ]
  },
  {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
