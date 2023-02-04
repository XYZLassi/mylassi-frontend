/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AuthorRestType } from '../models/author-rest-type';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAuthorsAuthorsGet
   */
  static readonly GetAuthorsAuthorsGetPath = '/authors/';

  /**
   * Get Authors.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAuthorsAuthorsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthorsAuthorsGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<AuthorRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, AuthorsService.GetAuthorsAuthorsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<AuthorRestType>>;
      })
    );
  }

  /**
   * Get Authors.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAuthorsAuthorsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthorsAuthorsGet(params?: {
    context?: HttpContext
  }
): Observable<Array<AuthorRestType>> {

    return this.getAuthorsAuthorsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<AuthorRestType>>) => r.body as Array<AuthorRestType>)
    );
  }

}
