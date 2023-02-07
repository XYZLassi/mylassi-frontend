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

import { BodyCreateCategoryCategoriesPost } from '../models/body-create-category-categories-post';
import { BodyUpdateCategoryCategoriesCategoryPut } from '../models/body-update-category-categories-category-put';
import { CategoryRestType } from '../models/category-rest-type';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getCategoriesCategoriesGet
   */
  static readonly GetCategoriesCategoriesGetPath = '/categories/';

  /**
   * Get Categories.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategoriesCategoriesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoriesCategoriesGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<CategoryRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.GetCategoriesCategoriesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CategoryRestType>>;
      })
    );
  }

  /**
   * Get Categories.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategoriesCategoriesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoriesCategoriesGet(params?: {
    context?: HttpContext
  }
): Observable<Array<CategoryRestType>> {

    return this.getCategoriesCategoriesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CategoryRestType>>) => r.body as Array<CategoryRestType>)
    );
  }

  /**
   * Path part for operation createCategoryCategoriesPost
   */
  static readonly CreateCategoryCategoriesPostPath = '/categories/';

  /**
   * Create Category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCategoryCategoriesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategoryCategoriesPost$Response(params: {
    context?: HttpContext
    body: BodyCreateCategoryCategoriesPost
  }
): Observable<StrictHttpResponse<CategoryRestType>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.CreateCategoryCategoriesPostPath, 'post');
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
        return r as StrictHttpResponse<CategoryRestType>;
      })
    );
  }

  /**
   * Create Category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createCategoryCategoriesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCategoryCategoriesPost(params: {
    context?: HttpContext
    body: BodyCreateCategoryCategoriesPost
  }
): Observable<CategoryRestType> {

    return this.createCategoryCategoriesPost$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryRestType>) => r.body as CategoryRestType)
    );
  }

  /**
   * Path part for operation getCategoryCategoriesCategoryGet
   */
  static readonly GetCategoryCategoriesCategoryGetPath = '/categories/{category}';

  /**
   * Get Category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCategoryCategoriesCategoryGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryCategoriesCategoryGet$Response(params: {
    category: (number | string);
    context?: HttpContext
  }
): Observable<StrictHttpResponse<CategoryRestType>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.GetCategoryCategoriesCategoryGetPath, 'get');
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
        return r as StrictHttpResponse<CategoryRestType>;
      })
    );
  }

  /**
   * Get Category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getCategoryCategoriesCategoryGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCategoryCategoriesCategoryGet(params: {
    category: (number | string);
    context?: HttpContext
  }
): Observable<CategoryRestType> {

    return this.getCategoryCategoriesCategoryGet$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryRestType>) => r.body as CategoryRestType)
    );
  }

  /**
   * Path part for operation updateCategoryCategoriesCategoryPut
   */
  static readonly UpdateCategoryCategoriesCategoryPutPath = '/categories/{category}';

  /**
   * Update Category.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCategoryCategoriesCategoryPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategoryCategoriesCategoryPut$Response(params: {
    category: number;
    context?: HttpContext
    body: BodyUpdateCategoryCategoriesCategoryPut
  }
): Observable<StrictHttpResponse<CategoryRestType>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.UpdateCategoryCategoriesCategoryPutPath, 'put');
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
        return r as StrictHttpResponse<CategoryRestType>;
      })
    );
  }

  /**
   * Update Category.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateCategoryCategoriesCategoryPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCategoryCategoriesCategoryPut(params: {
    category: number;
    context?: HttpContext
    body: BodyUpdateCategoryCategoriesCategoryPut
  }
): Observable<CategoryRestType> {

    return this.updateCategoryCategoriesCategoryPut$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryRestType>) => r.body as CategoryRestType)
    );
  }

}
