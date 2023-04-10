import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AdminLeftNavbarComponent } from './admin-left-navbar/admin-left-navbar.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import {IconsModule} from "../../../shared/ui/icons";



@NgModule({
    declarations: [
        AdminLeftNavbarComponent
    ],
    exports: [
        AdminLeftNavbarComponent
    ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    RouterLinkActive,
    IconsModule
  ]
})
export class AdminNavModule { }
