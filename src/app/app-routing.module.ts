import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  ErrorPageNotFoundPageComponent
} from "./pages/_errors";
import {AdminPageLayoutComponent, SinglePageLayoutComponent} from "./layouts";

const routes: Routes = [
  {
    path: 'admin', component: AdminPageLayoutComponent,
    loadChildren: () => import('./pages/admin-pages/admin-pages.module').then(m => m.AdminPagesModule)
  },
  {
    path: '', component: SinglePageLayoutComponent,
    loadChildren: () => import('./pages/frontend-pages/frontend-pages.module').then(m => m.FrontendPagesModule)
  },
  {
    path: 'error', component: SinglePageLayoutComponent,
    children: [
      {path: '404', component: ErrorPageNotFoundPageComponent},
    ]
  },
  {path: '**', redirectTo: 'error/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
