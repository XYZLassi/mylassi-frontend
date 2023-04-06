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

import { IApiAuthorRestType } from '../models/i-api-author-rest-type';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthorsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getAuthors
   */
  static readonly GetAuthorsPath = '/authors/';

  /**
   * Get Authors.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAuthors()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthors$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IApiAuthorRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiAuthorsService.GetAuthorsPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiAuthorRestType>>;
      })
    );
  }

  /**
   * Get Authors.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAuthors$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAuthors(params?: {
    context?: HttpContext
  }
): Observable<Array<IApiAuthorRestType>> {

    return this.getAuthors$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiAuthorRestType>>) => r.body as Array<IApiAuthorRestType>)
    );
  }

}
