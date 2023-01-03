import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexPageComponent } from './index-page/index-page.component';
import {LayoutsModule} from "../components/layouts/layouts.module";
import {ViewsModule} from "../views/views.module";



@NgModule({
  declarations: [
    IndexPageComponent
  ],
    imports: [
        CommonModule,
        LayoutsModule,
        ViewsModule
    ]
})
export class PagesModule { }
