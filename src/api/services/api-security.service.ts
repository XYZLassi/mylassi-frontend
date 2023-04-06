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

import { IApiBodyCreateNewToken } from '../models/i-api-body-create-new-token';
import { IApiTokenRestType } from '../models/i-api-token-rest-type';
import { IApiUserRestType } from '../models/i-api-user-rest-type';

@Injectable({
  providedIn: 'root',
})
export class ApiSecurityService extends BaseService {
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
    expire_time?: number;
    context?: HttpContext
    body: IApiBodyCreateNewToken
  }
): Observable<StrictHttpResponse<IApiTokenRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiSecurityService.CreateNewTokenPath, 'post');
    if (params) {
      rb.query('expire_time', params.expire_time, {});
      rb.body(params.body, 'application/x-www-form-urlencoded');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiTokenRestType>;
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
    expire_time?: number;
    context?: HttpContext
    body: IApiBodyCreateNewToken
  }
): Observable<IApiTokenRestType> {

    return this.createNewToken$Response(params).pipe(
      map((r: StrictHttpResponse<IApiTokenRestType>) => r.body as IApiTokenRestType)
    );
  }

  /**
   * Path part for operation refreshToken
   */
  static readonly RefreshTokenPath = '/token/refresh/';

  /**
   * Refresh Token.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `refreshToken()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshToken$Response(params?: {
    expire_time?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiTokenRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiSecurityService.RefreshTokenPath, 'post');
    if (params) {
      rb.query('expire_time', params.expire_time, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiTokenRestType>;
      })
    );
  }

  /**
   * Refresh Token.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `refreshToken$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  refreshToken(params?: {
    expire_time?: number;
    context?: HttpContext
  }
): Observable<IApiTokenRestType> {

    return this.refreshToken$Response(params).pipe(
      map((r: StrictHttpResponse<IApiTokenRestType>) => r.body as IApiTokenRestType)
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
): Observable<StrictHttpResponse<IApiUserRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiSecurityService.MePath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiUserRestType>;
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
): Observable<IApiUserRestType> {

    return this.me$Response(params).pipe(
      map((r: StrictHttpResponse<IApiUserRestType>) => r.body as IApiUserRestType)
    );
  }

}
