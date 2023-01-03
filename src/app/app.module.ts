import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsModule} from "./components/layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {ViewsModule} from "./views/views.module";

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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
