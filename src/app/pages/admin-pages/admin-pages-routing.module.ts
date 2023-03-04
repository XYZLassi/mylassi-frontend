import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "../../guards/auth.guard";
import {AdminIndexPageComponent} from "./admin-index-page/admin-index-page.component";
import {AdminIndexArticlePageComponent} from "./_articles/admin-index-article-page/admin-index-article-page.component";
import {
  AdminCreateArticlePageComponent
} from "./_articles/admin-create-article-page/admin-create-article-page.component";
import {AdminEditArticlePageComponent} from "./_articles/admin-edit-article-page/admin-edit-article-page.component";

const routes: Routes = [
  {path: '', component: AdminIndexPageComponent, canActivate: [AuthGuard]},
  {path: 'articles', component: AdminIndexArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'articles/new', component: AdminCreateArticlePageComponent, canActivate: [AuthGuard]},
  {path: 'articles/:id', component: AdminEditArticlePageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPagesRoutingModule {
}
