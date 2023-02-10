import {forwardRef, NgModule, OnInit, Provider} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule, Meta, MetaDefinition} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsModule} from "./components/layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {ViewsModule} from "./views/views.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./api/api.module";
import {ApiInterceptor} from "./api-interceptor.service";
import {GraphQLModule} from './graphql.module';
import {NavigationEnd, Router} from "@angular/router";

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
    ApiModule.forRoot({rootUrl: 'https://api.mylassi.xyz'}),
    GraphQLModule
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  private imageUrl = 'https://api.mylassi.xyz/files/75d0c531-6bf9-46c5-9766-2d6216855680/image';
  public tags: MetaDefinition[] = [
    {property: 'og:title', content: 'MyLassi.xyz'},
    {property: 'og:description', content: 'MyLassi.xyz'},
    {property: 'og:url', content: 'https://mylassi.xyz'},
    {property: 'og:site_name', content: 'MyLassi.xyz'},
    {property: 'og:type', content: 'article'},
    {property: 'og:image', content: this.imageUrl}
  ]

  constructor(private router: Router, private meta: Meta) {
    this.tags.forEach(tag => {
      const selector = `property='${tag.property}'`;
      let searchTag = this.meta.getTag(selector);
      if (searchTag)
        this.meta.updateTag(tag, selector);
      else
        this.meta.addTag(tag);
    });

    // For SSR
    this.meta.updateTag({property: 'og:url', content: `https://mylassi.xyz${this.router.url}`},)

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.tags.forEach(tag => this.meta.updateTag(tag,));
        this.meta.updateTag({property: 'og:url', content: `https://mylassi.xyz${this.router.url}`},)
      }
    })
  }
}
