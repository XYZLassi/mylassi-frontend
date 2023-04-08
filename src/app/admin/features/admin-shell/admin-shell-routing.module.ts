import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserAuthenticationGuard} from "../../utils/guards";

const routes: Routes = [
  {
    path: '',
    canActivate: [UserAuthenticationGuard],
    loadChildren: () =>
      import('../admin-dashboard/admin-dashboard.module').then(
        m => m.AdminDashboardModule
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
