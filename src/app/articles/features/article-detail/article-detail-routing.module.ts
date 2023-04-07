import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArticleShowPageComponent} from "./article-show-page/article-show-page.component";

const routes: Routes = [
  {
    path: ':id',
    component: ArticleShowPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleDetailRoutingModule {
}
