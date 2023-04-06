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

import { IApiCategoryOptionRestType } from '../models/i-api-category-option-rest-type';
import { IApiCategoryRestType } from '../models/i-api-category-rest-type';

@Injectable({
  providedIn: 'root',
})
export class ApiCategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCategories
   */
  static readonly GetCategoriesPath = '/categories/';

  /**
   * Get Categories.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategories()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IApiCategoryRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiCategoriesService.GetCategoriesPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiCategoryRestType>>;
      })
    );
  }

  /**
   * Get Categories.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategories$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategories(params?: {
    context?: HttpContext
  }
): Observable<Array<IApiCategoryRestType>> {

    return this.getCategories$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiCategoryRestType>>) => r.body as Array<IApiCategoryRestType>)
    );
  }

  /**
   * Path part for operation createCategory
   */
  static readonly CreateCategoryPath = '/categories/';

  /**
   * Create Category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory$Response(params: {
    context?: HttpContext
    body: IApiCategoryOptionRestType
  }
): Observable<StrictHttpResponse<IApiCategoryRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiCategoriesService.CreateCategoryPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiCategoryRestType>;
      })
    );
  }

  /**
   * Create Category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategory(params: {
    context?: HttpContext
    body: IApiCategoryOptionRestType
  }
): Observable<IApiCategoryRestType> {

    return this.createCategory$Response(params).pipe(
      map((r: StrictHttpResponse<IApiCategoryRestType>) => r.body as IApiCategoryRestType)
    );
  }

  /**
   * Path part for operation getCategory
   */
  static readonly GetCategoryPath = '/categories/{category}';

  /**
   * Get Category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategory()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory$Response(params: {
    category: (number | string);
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiCategoryRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiCategoriesService.GetCategoryPath, 'get');
    if (params) {
      rb.path('category', params.category, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiCategoryRestType>;
      })
    );
  }

  /**
   * Get Category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategory$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategory(params: {
    category: (number | string);
    context?: HttpContext
  }
): Observable<IApiCategoryRestType> {

    return this.getCategory$Response(params).pipe(
      map((r: StrictHttpResponse<IApiCategoryRestType>) => r.body as IApiCategoryRestType)
    );
  }

  /**
   * Path part for operation updateCategory
   */
  static readonly UpdateCategoryPath = '/categories/{category}';

  /**
   * Update Category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCategory()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory$Response(params: {
    category: number;
    context?: HttpContext
    body: IApiCategoryOptionRestType
  }
): Observable<StrictHttpResponse<IApiCategoryRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiCategoriesService.UpdateCategoryPath, 'put');
    if (params) {
      rb.path('category', params.category, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiCategoryRestType>;
      })
    );
  }

  /**
   * Update Category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCategory$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategory(params: {
    category: number;
    context?: HttpContext
    body: IApiCategoryOptionRestType
  }
): Observable<IApiCategoryRestType> {

    return this.updateCategory$Response(params).pipe(
      map((r: StrictHttpResponse<IApiCategoryRestType>) => r.body as IApiCategoryRestType)
    );
  }

}
