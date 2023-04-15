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

import { IApiAppendArticleFileOptionsRestType } from '../models/i-api-append-article-file-options-rest-type';
import { IApiArticleContentOptionsRestType } from '../models/i-api-article-content-options-rest-type';
import { IApiArticleContentRestType } from '../models/i-api-article-content-rest-type';
import { IApiArticleFileOptionsRestType } from '../models/i-api-article-file-options-rest-type';
import { IApiArticleFileRestType } from '../models/i-api-article-file-rest-type';
import { IApiArticleOptionsRestType } from '../models/i-api-article-options-rest-type';
import { IApiArticleRestType } from '../models/i-api-article-rest-type';
import { IApiBodyAddCategoryToArticle } from '../models/i-api-body-add-category-to-article';
import { IApiBodyUploadFileToArticle } from '../models/i-api-body-upload-file-to-article';
import { IApiFilterDeletedItems } from '../models/i-api-filter-deleted-items';
import { IApiFullArticleRestType } from '../models/i-api-full-article-rest-type';
import { IApiOkayResultRestType } from '../models/i-api-okay-result-rest-type';
import { IApiPaginationResultRestTypeArticleRestType } from '../models/i-api-pagination-result-rest-type-article-rest-type';
import { IApiPaginationResultRestTypeFullArticleRestType } from '../models/i-api-pagination-result-rest-type-full-article-rest-type';

@Injectable({
  providedIn: 'root',
})
export class ApiArticlesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getArticles
   */
  static readonly GetArticlesPath = '/articles/';

  /**
   * Get Articles.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles$Response(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiPaginationResultRestTypeArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetArticlesPath, 'get');
    if (params) {
      rb.query('category', params.category, {});
      rb.query('cursor', params.cursor, {});
      rb.query('size', params.size, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiPaginationResultRestTypeArticleRestType>;
      })
    );
  }

  /**
   * Get Articles.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticles(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    context?: HttpContext
  }
): Observable<IApiPaginationResultRestTypeArticleRestType> {

    return this.getArticles$Response(params).pipe(
      map((r: StrictHttpResponse<IApiPaginationResultRestTypeArticleRestType>) => r.body as IApiPaginationResultRestTypeArticleRestType)
    );
  }

  /**
   * Path part for operation createArticle
   */
  static readonly CreateArticlePath = '/articles/';

  /**
   * Create New Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle$Response(params: {
    context?: HttpContext
    body: IApiArticleOptionsRestType
  }
): Observable<StrictHttpResponse<IApiArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.CreateArticlePath, 'post');
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
        return r as StrictHttpResponse<IApiArticleRestType>;
      })
    );
  }

  /**
   * Create New Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createArticle(params: {
    context?: HttpContext
    body: IApiArticleOptionsRestType
  }
): Observable<IApiArticleRestType> {

    return this.createArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleRestType>) => r.body as IApiArticleRestType)
    );
  }

  /**
   * Path part for operation getArticlesFull
   */
  static readonly GetArticlesFullPath = '/articles/full';

  /**
   * Get All Articles.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticlesFull()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesFull$Response(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    filter_deleted?: IApiFilterDeletedItems;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiPaginationResultRestTypeFullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetArticlesFullPath, 'get');
    if (params) {
      rb.query('category', params.category, {});
      rb.query('cursor', params.cursor, {});
      rb.query('size', params.size, {});
      rb.query('filter_deleted', params.filter_deleted, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiPaginationResultRestTypeFullArticleRestType>;
      })
    );
  }

  /**
   * Get All Articles.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticlesFull$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesFull(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    filter_deleted?: IApiFilterDeletedItems;
    context?: HttpContext
  }
): Observable<IApiPaginationResultRestTypeFullArticleRestType> {

    return this.getArticlesFull$Response(params).pipe(
      map((r: StrictHttpResponse<IApiPaginationResultRestTypeFullArticleRestType>) => r.body as IApiPaginationResultRestTypeFullArticleRestType)
    );
  }

  /**
   * Path part for operation getAllArticlesArticlesAllGet
   */
  static readonly GetAllArticlesArticlesAllGetPath = '/articles/all';

  /**
   * Get All Articles.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArticlesArticlesAllGet()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAllArticlesArticlesAllGet$Response(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    filter_deleted?: IApiFilterDeletedItems;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiPaginationResultRestTypeFullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetAllArticlesArticlesAllGetPath, 'get');
    if (params) {
      rb.query('category', params.category, {});
      rb.query('cursor', params.cursor, {});
      rb.query('size', params.size, {});
      rb.query('filter_deleted', params.filter_deleted, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiPaginationResultRestTypeFullArticleRestType>;
      })
    );
  }

  /**
   * Get All Articles.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllArticlesArticlesAllGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   *
   * @deprecated
   */
  getAllArticlesArticlesAllGet(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    filter_deleted?: IApiFilterDeletedItems;
    context?: HttpContext
  }
): Observable<IApiPaginationResultRestTypeFullArticleRestType> {

    return this.getAllArticlesArticlesAllGet$Response(params).pipe(
      map((r: StrictHttpResponse<IApiPaginationResultRestTypeFullArticleRestType>) => r.body as IApiPaginationResultRestTypeFullArticleRestType)
    );
  }

  /**
   * Path part for operation getArticle
   */
  static readonly GetArticlePath = '/articles/{article}';

  /**
   * Get Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticle$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetArticlePath, 'get');
    if (params) {
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleRestType>;
      })
    );
  }

  /**
   * Get Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticle(params: {
    article: number;
    context?: HttpContext
  }
): Observable<IApiArticleRestType> {

    return this.getArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleRestType>) => r.body as IApiArticleRestType)
    );
  }

  /**
   * Path part for operation updateArticle
   */
  static readonly UpdateArticlePath = '/articles/{article}';

  /**
   * Update Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle$Response(params: {
    article: number;
    context?: HttpContext
    body: IApiArticleOptionsRestType
  }
): Observable<StrictHttpResponse<IApiFullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.UpdateArticlePath, 'put');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiFullArticleRestType>;
      })
    );
  }

  /**
   * Update Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticle(params: {
    article: number;
    context?: HttpContext
    body: IApiArticleOptionsRestType
  }
): Observable<IApiFullArticleRestType> {

    return this.updateArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiFullArticleRestType>) => r.body as IApiFullArticleRestType)
    );
  }

  /**
   * Path part for operation deleteArticle
   */
  static readonly DeleteArticlePath = '/articles/{article}';

  /**
   * Delete Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiOkayResultRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.DeleteArticlePath, 'delete');
    if (params) {
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiOkayResultRestType>;
      })
    );
  }

  /**
   * Delete Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteArticle(params: {
    article: number;
    context?: HttpContext
  }
): Observable<IApiOkayResultRestType> {

    return this.deleteArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiOkayResultRestType>) => r.body as IApiOkayResultRestType)
    );
  }

  /**
   * Path part for operation getArticleFull
   */
  static readonly GetArticleFullPath = '/articles/{article}/full';

  /**
   * Get Full Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleFull()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleFull$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiFullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetArticleFullPath, 'get');
    if (params) {
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiFullArticleRestType>;
      })
    );
  }

  /**
   * Get Full Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticleFull$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleFull(params: {
    article: number;
    context?: HttpContext
  }
): Observable<IApiFullArticleRestType> {

    return this.getArticleFull$Response(params).pipe(
      map((r: StrictHttpResponse<IApiFullArticleRestType>) => r.body as IApiFullArticleRestType)
    );
  }

  /**
   * Path part for operation restoreArticle
   */
  static readonly RestoreArticlePath = '/articles/{article}/restore';

  /**
   * Restore Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `restoreArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  restoreArticle$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiFullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.RestoreArticlePath, 'post');
    if (params) {
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiFullArticleRestType>;
      })
    );
  }

  /**
   * Restore Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `restoreArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  restoreArticle(params: {
    article: number;
    context?: HttpContext
  }
): Observable<IApiFullArticleRestType> {

    return this.restoreArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiFullArticleRestType>) => r.body as IApiFullArticleRestType)
    );
  }

  /**
   * Path part for operation uploadFileToArticle
   */
  static readonly UploadFileToArticlePath = '/articles/{article}/uploadFile';

  /**
   * Upload File To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFileToArticle()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFileToArticle$Response(params: {
    article: number;
    context?: HttpContext
    body: IApiBodyUploadFileToArticle
  }
): Observable<StrictHttpResponse<IApiArticleFileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.UploadFileToArticlePath, 'post');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleFileRestType>;
      })
    );
  }

  /**
   * Upload File To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFileToArticle$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFileToArticle(params: {
    article: number;
    context?: HttpContext
    body: IApiBodyUploadFileToArticle
  }
): Observable<IApiArticleFileRestType> {

    return this.uploadFileToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleFileRestType>) => r.body as IApiArticleFileRestType)
    );
  }

  /**
   * Path part for operation getArticleFiles
   */
  static readonly GetArticleFilesPath = '/articles/{article}/files';

  /**
   * Get Article Files.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleFiles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleFiles$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IApiArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetArticleFilesPath, 'get');
    if (params) {
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiArticleFileRestType>>;
      })
    );
  }

  /**
   * Get Article Files.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticleFiles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleFiles(params: {
    article: number;
    context?: HttpContext
  }
): Observable<Array<IApiArticleFileRestType>> {

    return this.getArticleFiles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiArticleFileRestType>>) => r.body as Array<IApiArticleFileRestType>)
    );
  }

  /**
   * Path part for operation addOrReplaceFilesToArticle
   */
  static readonly AddOrReplaceFilesToArticlePath = '/articles/{article}/files';

  /**
   * Add Or Replace Files To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addOrReplaceFilesToArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOrReplaceFilesToArticle$Response(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiAppendArticleFileOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<IApiArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.AddOrReplaceFilesToArticlePath, 'put');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiArticleFileRestType>>;
      })
    );
  }

  /**
   * Add Or Replace Files To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addOrReplaceFilesToArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addOrReplaceFilesToArticle(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiAppendArticleFileOptionsRestType>
  }
): Observable<Array<IApiArticleFileRestType>> {

    return this.addOrReplaceFilesToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiArticleFileRestType>>) => r.body as Array<IApiArticleFileRestType>)
    );
  }

  /**
   * Path part for operation addFileToArticle
   */
  static readonly AddFileToArticlePath = '/articles/{article}/files';

  /**
   * Add Files To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addFileToArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFileToArticle$Response(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiAppendArticleFileOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<IApiArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.AddFileToArticlePath, 'post');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiArticleFileRestType>>;
      })
    );
  }

  /**
   * Add Files To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addFileToArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addFileToArticle(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiAppendArticleFileOptionsRestType>
  }
): Observable<Array<IApiArticleFileRestType>> {

    return this.addFileToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiArticleFileRestType>>) => r.body as Array<IApiArticleFileRestType>)
    );
  }

  /**
   * Path part for operation updateArticleFile
   */
  static readonly UpdateArticleFilePath = '/articles/{article}/files/{article_file}';

  /**
   * Update Article File.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticleFile()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleFile$Response(params: {
    article_file: number;
    article: number;
    context?: HttpContext
    body: IApiArticleFileOptionsRestType
  }
): Observable<StrictHttpResponse<IApiArticleFileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.UpdateArticleFilePath, 'put');
    if (params) {
      rb.path('article_file', params.article_file, {});
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleFileRestType>;
      })
    );
  }

  /**
   * Update Article File.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArticleFile$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleFile(params: {
    article_file: number;
    article: number;
    context?: HttpContext
    body: IApiArticleFileOptionsRestType
  }
): Observable<IApiArticleFileRestType> {

    return this.updateArticleFile$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleFileRestType>) => r.body as IApiArticleFileRestType)
    );
  }

  /**
   * Path part for operation getContentsFromArticle
   */
  static readonly GetContentsFromArticlePath = '/articles/{article}/content';

  /**
   * Get All Contents From Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContentsFromArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContentsFromArticle$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<IApiArticleContentRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetContentsFromArticlePath, 'get');
    if (params) {
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiArticleContentRestType>>;
      })
    );
  }

  /**
   * Get All Contents From Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getContentsFromArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContentsFromArticle(params: {
    article: number;
    context?: HttpContext
  }
): Observable<Array<IApiArticleContentRestType>> {

    return this.getContentsFromArticle$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiArticleContentRestType>>) => r.body as Array<IApiArticleContentRestType>)
    );
  }

  /**
   * Path part for operation getContentFromArticle
   */
  static readonly GetContentFromArticlePath = '/articles/{article}/content/{content}';

  /**
   * Get Article Content.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getContentFromArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContentFromArticle$Response(params: {
    content: number;
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiArticleContentRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.GetContentFromArticlePath, 'get');
    if (params) {
      rb.path('content', params.content, {});
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleContentRestType>;
      })
    );
  }

  /**
   * Get Article Content.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getContentFromArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getContentFromArticle(params: {
    content: number;
    article: number;
    context?: HttpContext
  }
): Observable<IApiArticleContentRestType> {

    return this.getContentFromArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleContentRestType>) => r.body as IApiArticleContentRestType)
    );
  }

  /**
   * Path part for operation updateArticleContent
   */
  static readonly UpdateArticleContentPath = '/articles/{article}/content/{content}';

  /**
   * Update Article Content.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticleContent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleContent$Response(params: {
    content: number;
    article: number;
    context?: HttpContext
    body: IApiArticleContentOptionsRestType
  }
): Observable<StrictHttpResponse<IApiArticleContentRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.UpdateArticleContentPath, 'post');
    if (params) {
      rb.path('content', params.content, {});
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleContentRestType>;
      })
    );
  }

  /**
   * Update Article Content.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArticleContent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleContent(params: {
    content: number;
    article: number;
    context?: HttpContext
    body: IApiArticleContentOptionsRestType
  }
): Observable<IApiArticleContentRestType> {

    return this.updateArticleContent$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleContentRestType>) => r.body as IApiArticleContentRestType)
    );
  }

  /**
   * Path part for operation deleteContent
   */
  static readonly DeleteContentPath = '/articles/{article}/content/{content}';

  /**
   * Remove Article Content.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteContent()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteContent$Response(params: {
    content: number;
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<IApiOkayResultRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.DeleteContentPath, 'delete');
    if (params) {
      rb.path('content', params.content, {});
      rb.path('article', params.article, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiOkayResultRestType>;
      })
    );
  }

  /**
   * Remove Article Content.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `deleteContent$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteContent(params: {
    content: number;
    article: number;
    context?: HttpContext
  }
): Observable<IApiOkayResultRestType> {

    return this.deleteContent$Response(params).pipe(
      map((r: StrictHttpResponse<IApiOkayResultRestType>) => r.body as IApiOkayResultRestType)
    );
  }

  /**
   * Path part for operation replaceContent
   */
  static readonly ReplaceContentPath = '/articles/{article}/content/';

  /**
   * Replace Contents To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceContent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceContent$Response(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiArticleContentOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<IApiArticleContentRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.ReplaceContentPath, 'put');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiArticleContentRestType>>;
      })
    );
  }

  /**
   * Replace Contents To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `replaceContent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceContent(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiArticleContentOptionsRestType>
  }
): Observable<Array<IApiArticleContentRestType>> {

    return this.replaceContent$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiArticleContentRestType>>) => r.body as Array<IApiArticleContentRestType>)
    );
  }

  /**
   * Path part for operation addArticleContent
   */
  static readonly AddArticleContentPath = '/articles/{article}/content/';

  /**
   * Add Contents To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addArticleContent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addArticleContent$Response(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiArticleContentOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<IApiArticleContentRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.AddArticleContentPath, 'post');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<IApiArticleContentRestType>>;
      })
    );
  }

  /**
   * Add Contents To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addArticleContent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addArticleContent(params: {
    article: number;
    context?: HttpContext
    body: Array<IApiArticleContentOptionsRestType>
  }
): Observable<Array<IApiArticleContentRestType>> {

    return this.addArticleContent$Response(params).pipe(
      map((r: StrictHttpResponse<Array<IApiArticleContentRestType>>) => r.body as Array<IApiArticleContentRestType>)
    );
  }

  /**
   * Path part for operation replaceCategoryToArticle
   */
  static readonly ReplaceCategoryToArticlePath = '/articles/{article}/category';

  /**
   * Replace Category To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceCategoryToArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceCategoryToArticle$Response(params: {
    article: number;
    context?: HttpContext
    body: (number | Array<number>)
  }
): Observable<StrictHttpResponse<IApiArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.ReplaceCategoryToArticlePath, 'put');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleRestType>;
      })
    );
  }

  /**
   * Replace Category To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `replaceCategoryToArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceCategoryToArticle(params: {
    article: number;
    context?: HttpContext
    body: (number | Array<number>)
  }
): Observable<IApiArticleRestType> {

    return this.replaceCategoryToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleRestType>) => r.body as IApiArticleRestType)
    );
  }

  /**
   * Path part for operation addCategoryToArticle
   */
  static readonly AddCategoryToArticlePath = '/articles/{article}/category';

  /**
   * Add Category To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCategoryToArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategoryToArticle$Response(params: {
    article: number;
    context?: HttpContext
    body: IApiBodyAddCategoryToArticle
  }
): Observable<StrictHttpResponse<IApiArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ApiArticlesService.AddCategoryToArticlePath, 'post');
    if (params) {
      rb.path('article', params.article, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<IApiArticleRestType>;
      })
    );
  }

  /**
   * Add Category To Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `addCategoryToArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategoryToArticle(params: {
    article: number;
    context?: HttpContext
    body: IApiBodyAddCategoryToArticle
  }
): Observable<IApiArticleRestType> {

    return this.addCategoryToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<IApiArticleRestType>) => r.body as IApiArticleRestType)
    );
  }

}
