import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminArticlesListTableComponent } from './admin-articles-list-table/admin-articles-list-table.component';
import {ImagesModule} from "../../../shared/ui/images";
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        AdminArticlesListTableComponent
    ],
    exports: [
        AdminArticlesListTableComponent
    ],
    imports: [
        CommonModule,
        ImagesModule,
        RouterLink
    ]
})
export class AdminArticlesUiModule { }
