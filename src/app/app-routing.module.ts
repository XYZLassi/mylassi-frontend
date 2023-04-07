import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./articles/features/article-shell/article-shell.module').then(
        m => m.ArticleShellModule
      )
  },
  {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
