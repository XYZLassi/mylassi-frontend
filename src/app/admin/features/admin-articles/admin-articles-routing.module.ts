import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminArticlesIndexPageComponent} from "./admin-articles-index-page/admin-articles-index-page.component";
import {AdminArticlesCreatePageComponent} from "./admin-articles-create-page/admin-articles-create-page.component";
import {AdminArticlesEditPageComponent} from "./admin-articles-edit-page/admin-articles-edit-page.component";

const routes: Routes = [
  {
    path: '',
    component: AdminArticlesIndexPageComponent
  },
  {
    path: 'create',
    component: AdminArticlesCreatePageComponent
  },
  {
    path: ':id',
    component: AdminArticlesEditPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminArticlesRoutingModule {
}
