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

import { BodyLoginForAccessTokenTokenPost } from '../models/body-login-for-access-token-token-post';
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
   * Path part for operation loginForAccessTokenTokenPost
   */
  static readonly LoginForAccessTokenTokenPostPath = '/token';

  /**
   * Login For Access Token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `loginForAccessTokenTokenPost()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  loginForAccessTokenTokenPost$Response(params: {
    context?: HttpContext
    body: BodyLoginForAccessTokenTokenPost
  }
): Observable<StrictHttpResponse<TokenRestType>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.LoginForAccessTokenTokenPostPath, 'post');
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
   * To access the full response (for headers, for example), `loginForAccessTokenTokenPost$Response()` instead.
   *
   * This method sends `application/x-www-form-urlencoded` and handles request body of type `application/x-www-form-urlencoded`.
   */
  loginForAccessTokenTokenPost(params: {
    context?: HttpContext
    body: BodyLoginForAccessTokenTokenPost
  }
): Observable<TokenRestType> {

    return this.loginForAccessTokenTokenPost$Response(params).pipe(
      map((r: StrictHttpResponse<TokenRestType>) => r.body as TokenRestType)
    );
  }

  /**
   * Path part for operation readUsersMeUsersMeGet
   */
  static readonly ReadUsersMeUsersMeGetPath = '/users/me/';

  /**
   * Read Users Me.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `readUsersMeUsersMeGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUsersMeUsersMeGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<UserRestType>> {

    const rb = new RequestBuilder(this.rootUrl, SecurityService.ReadUsersMeUsersMeGetPath, 'get');
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
   * To access the full response (for headers, for example), `readUsersMeUsersMeGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  readUsersMeUsersMeGet(params?: {
    context?: HttpContext
  }
): Observable<UserRestType> {

    return this.readUsersMeUsersMeGet$Response(params).pipe(
      map((r: StrictHttpResponse<UserRestType>) => r.body as UserRestType)
    );
  }

}
