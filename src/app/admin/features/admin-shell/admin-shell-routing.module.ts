import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAuthenticationGuard} from "../../utils/guards";
import {AdminRouterOutletComponent} from "./admin-router-outlet/admin-router-outlet.component";

const routes: Routes = [
  {
    path: '',
    canActivate: [UserAuthenticationGuard],
    component: AdminRouterOutletComponent,
    loadChildren: () =>
      import('../admin-dashboard/admin-dashboard.module').then(
        m => m.AdminDashboardModule
      )
  },
  {
    path: 'articles',
    canActivate: [UserAuthenticationGuard],
    component: AdminRouterOutletComponent,
    loadChildren: () =>
      import('../admin-articles/admin-articles.module').then(
        m => m.AdminArticlesModule
      )
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../admin-login/admin-login.module').then(
        m => m.AdminLoginModule
      )
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminShellRoutingModule {
}
