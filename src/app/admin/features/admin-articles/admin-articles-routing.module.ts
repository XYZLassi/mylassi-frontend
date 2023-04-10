import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminArticlesIndexPageComponent} from "./admin-articles-index-page/admin-articles-index-page.component";
import {AdminArticlesCreatePageComponent} from "./admin-articles-create-page/admin-articles-create-page.component";

const routes: Routes = [{
  path: '',
  component: AdminArticlesIndexPageComponent
}, {
  path: 'create',
  component: AdminArticlesCreatePageComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminArticlesRoutingModule {
}
