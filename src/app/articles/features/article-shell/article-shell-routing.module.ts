import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SinglePageLayoutComponent} from "../../../shared/ui/layouts";

const routes: Routes = [
  {
    path: '',
    component: SinglePageLayoutComponent,
    loadChildren: () => import('../article-list/article-list.module').then(m => m.ArticleListModule)
  },
  {
    path: 'article',
    component: SinglePageLayoutComponent,
    loadChildren: () => import('../article-detail/article-detail.module').then(m => m.ArticleDetailModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleShellRoutingModule {
}
