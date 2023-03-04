import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import * as pages from './_pages'

const routes: Routes = [
  {path: '', component: pages.ArticleListPageComponent},
  {path: 'login', component: pages.LoginPageComponent},
  {path: 'articles/:articleId', component: pages.ArticlePageComponent},

  {path: ':category', component: pages.ArticleListPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendPagesRoutingModule {
}
