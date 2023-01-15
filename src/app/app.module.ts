import {forwardRef, NgModule, Provider} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsModule} from "./components/layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {ViewsModule} from "./views/views.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./api/api.module";
import {ApiInterceptor} from "./api-interceptor.service";

export const API_INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useExisting: forwardRef(() => ApiInterceptor),
  multi: true
};

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
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
