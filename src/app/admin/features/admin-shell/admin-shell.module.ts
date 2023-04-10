import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminShellRoutingModule } from './admin-shell-routing.module';
import { AdminRouterOutletComponent } from './admin-router-outlet/admin-router-outlet.component';
import {LayoutsModule} from "../../../shared/ui/layouts/layouts.module";
import {AdminNavModule} from "../../ui/admin-nav";


@NgModule({
  declarations: [
    AdminRouterOutletComponent
  ],
  imports: [
    CommonModule,
    AdminShellRoutingModule,
    LayoutsModule,
    AdminNavModule
  ]
})
export class AdminShellModule { }
