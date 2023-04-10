import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminLoginRoutingModule} from './admin-login-routing.module';
import {AdminLoginPageComponent} from './admin-login-page/admin-login-page.component';
import {BaseElementsModule} from "../../../shared/ui/base-elements";
import {LayoutsModule} from "../../../shared/ui/layouts/layouts.module";
import {AdminFormsModule} from "../../ui/admin-forms";


@NgModule({
  declarations: [
    AdminLoginPageComponent
  ],
    imports: [
        CommonModule,
        AdminLoginRoutingModule,
        BaseElementsModule,
        LayoutsModule,
        AdminFormsModule,
    ]
})
export class AdminLoginModule {
}
