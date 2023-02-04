import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {IndexPageComponent} from "./pages/index-page/index-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ArticlePageComponent} from "./pages/article-page/article-page.component";

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'login', component: LoginPageComponent},
  {path: 'articles/:id', component: ArticlePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
