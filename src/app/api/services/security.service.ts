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

import { BodyCreateNewToken } from '../models/body-create-new-token';
import { TokenRestType } from '../models/token-rest-type';
import { UserRestType } from '../models/user-rest-type';

@Injectable({
  providedIn: 'root',
})
export class SecurityService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation createNewToken
   */
  static readonly CreateNewTokenPath = '/token';

  /**
   * Login For Access Token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewToken()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  createNewToken$Response(params: {
    context?: HttpContext
    body: BodyCreateNewToken
  }
): Observable<StrictHttpResponse<TokenRestType>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.CreateNewTokenPath, 'post');
    if (params) {
      rb.body(params.body, 'application/x-www-form-urlencoded');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TokenRestType>;
      })
    );
  }

  /**
   * Login For Access Token.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNewToken$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  createNewToken(params: {
    context?: HttpContext
    body: BodyCreateNewToken
  }
): Observable<TokenRestType> {

    return this.createNewToken$Response(params).pipe(
      map((r: StrictHttpResponse<TokenRestType>) => r.body as TokenRestType)
    );
  }

  /**
   * Path part for operation me
   */
  static readonly MePath = '/users/me/';

  /**
   * Read Users Me.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `me()` instead.
   *
   * This method doesn't expect any request body.
   */
  me$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserRestType>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.MePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<UserRestType>;
      })
    );
  }

  /**
   * Read Users Me.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `me$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  me(params?: {
    context?: HttpContext
  }
): Observable<UserRestType> {

    return this.me$Response(params).pipe(
      map((r: StrictHttpResponse<UserRestType>) => r.body as UserRestType)
    );
  }

}
