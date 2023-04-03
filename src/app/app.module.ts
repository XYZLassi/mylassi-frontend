import {forwardRef, NgModule, OnInit, Provider, isDevMode} from '@angular/core';
import {BrowserModule, BrowserTransferStateModule, Meta, MetaDefinition, Title} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutsModule} from "./layouts/layouts.module";
import {PagesModule} from "./pages/pages.module";
import {ViewsModule} from "./views/views.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ApiModule} from "./api/api.module";
import {ApiInterceptor} from "./api-interceptor.service";
import {GraphQLModule} from './graphql.module';
import {NavigationEnd, Router} from "@angular/router";
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ServiceWorkerModule} from '@angular/service-worker';

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
    BrowserAnimationsModule,
    HttpClientModule,
    ApiModule.forRoot({rootUrl: './api'}),
    GraphQLModule,
    FontAwesomeModule,
    ServiceWorkerModule.register(isDevMode() ? 'api-worker.js' : 'custom-ngsw-worker.js', {
      enabled: true,//!isDevMode(),
      registrationStrategy: isDevMode() ? 'registerImmediately' : 'registerWhenStable:30000',
    }),
  ],
  providers: [
    ApiInterceptor,
    API_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  private imageUrl = 'https://mylassi.xyz/assets/preview.jpg';
  public tags: MetaDefinition[] = [
    {property: 'og:title', content: 'MyLassi.xyz'},
    {property: 'og:description', content: 'MyLassi.xyz'},
    {property: 'og:url', content: 'https://mylassi.xyz'},
    {property: 'og:site_name', content: 'MyLassi.xyz'},
    {property: 'og:type', content: 'article'},
    {property: 'og:image', content: this.imageUrl}
  ]

  constructor(private router: Router, private meta: Meta, private title: Title) {
    this.title.setTitle('MyLassi.xyz');

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
        this.title.setTitle('MyLassi.xyz');

        this.tags.forEach(tag => this.meta.updateTag(tag,));
        this.meta.updateTag({property: 'og:url', content: `https://mylassi.xyz${this.router.url}`},)
      }
    })
  }
}
