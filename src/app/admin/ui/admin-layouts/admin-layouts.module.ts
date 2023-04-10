import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminInsideLayoutComponent } from './admin-inside-layout/admin-inside-layout.component';



@NgModule({
    declarations: [
        AdminInsideLayoutComponent
    ],
    exports: [
        AdminInsideLayoutComponent
    ],
    imports: [
        CommonModule
    ]
})
export class AdminLayoutsModule { }
