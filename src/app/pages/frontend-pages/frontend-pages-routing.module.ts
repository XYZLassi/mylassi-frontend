import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import * as pages from './_pages'
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const routes: Routes = [
  {
    path: '', component: pages.ArticleListPageComponent,
    data: {
      animation: 'IndexPage',
    }
  },
  {
    path: 'login', component: pages.LoginPageComponent,
    data: {
      animation: 'LoginPage',
    }
  },
  {
    path: 'articles/:articleId', component: pages.ArticlePageComponent,
    data: {
      animation: 'ArticleDetailPage',
    }
  },

  {
    path: ':category', component: pages.ArticleListPageComponent,
    data: {
      animation: 'ArticleListByCategoryPage',
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontendPagesRoutingModule {
}
