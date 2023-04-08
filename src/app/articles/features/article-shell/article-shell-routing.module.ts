import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleRouterOutletComponent} from "./article-router-outlet/article-router-outlet.component";

const routes: Routes = [
  {
    path: '',
    component: ArticleRouterOutletComponent,
    loadChildren: () => import('../article-list/article-list.module').then(m => m.ArticleListModule)
  },
  {
    path: 'article',
    component: ArticleRouterOutletComponent,
    loadChildren: () => import('../article-detail/article-detail.module').then(m => m.ArticleDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleShellRoutingModule {
}
