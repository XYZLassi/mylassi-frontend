import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminArticlesIndexPageComponent} from "./admin-articles-index-page/admin-articles-index-page.component";

const routes: Routes = [{
  path: '',
  component: AdminArticlesIndexPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminArticlesRoutingModule {
}
