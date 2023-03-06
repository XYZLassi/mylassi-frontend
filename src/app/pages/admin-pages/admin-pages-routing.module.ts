import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import * as pages from "./_pages"

const routes: Routes = [
  {path: '', component: pages.AdminIndexArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'articles', component: pages.AdminIndexArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'articles/new', component: pages.AdminCreateArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'articles/:id', component: pages.AdminEditArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'articles/:id/createContent', component: pages.AdminCreateArticleContentPageComponent, canActivate: [AuthGuard]},
  {path: 'articles/:id/:contentId', component: pages.AdminEditArticleContentPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
