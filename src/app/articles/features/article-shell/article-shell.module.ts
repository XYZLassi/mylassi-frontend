import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import {ArticleShellRoutingModule} from './article-shell-routing.module';
import {ArticleRouterOutletComponent} from './article-router-outlet/article-router-outlet.component';
import {LayoutsModule} from "../../../shared/ui/layouts/layouts.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    ArticleRouterOutletComponent
  ],
  imports: [
    CommonModule,
    ArticleShellRoutingModule,
    LayoutsModule,
    NgOptimizedImage,
  ]
})
export class ArticleShellModule {
}
