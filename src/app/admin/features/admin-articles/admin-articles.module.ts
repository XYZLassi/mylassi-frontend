import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminArticlesRoutingModule } from './admin-articles-routing.module';
import { AdminArticlesIndexPageComponent } from './admin-articles-index-page/admin-articles-index-page.component';


@NgModule({
  declarations: [
    AdminArticlesIndexPageComponent
  ],
  imports: [
    CommonModule,
    AdminArticlesRoutingModule
  ]
})
export class AdminArticlesModule { }
