import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsModule} from "./components/layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {ViewsModule} from "./views/views.module";
import {HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./api/api.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    LayoutsModule,
    PagesModule,
    ViewsModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: 'https://api.mylassi.xyz'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
