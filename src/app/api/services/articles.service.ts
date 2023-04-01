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

import { AppendArticleFileOptionsRestType } from '../models/append-article-file-options-rest-type';
import { ArticleContentOptionsRestType } from '../models/article-content-options-rest-type';
import { ArticleContentRestType } from '../models/article-content-rest-type';
import { ArticleFileOptionsRestType } from '../models/article-file-options-rest-type';
import { ArticleFileRestType } from '../models/article-file-rest-type';
import { ArticleOptionsRestType } from '../models/article-options-rest-type';
import { ArticleRestType } from '../models/article-rest-type';
import { BodyAddCategoryToArticle } from '../models/body-add-category-to-article';
import { BodyUploadFileToArticle } from '../models/body-upload-file-to-article';
import { FilterDeletedItems } from '../models/filter-deleted-items';
import { FullArticleRestType } from '../models/full-article-rest-type';
import { OkayResultRestType } from '../models/okay-result-rest-type';
import { PaginationResultRestTypeArticleRestType } from '../models/pagination-result-rest-type-article-rest-type';
import { PaginationResultRestTypeFullArticleRestType } from '../models/pagination-result-rest-type-full-article-rest-type';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService extends BaseService {
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
): Observable<StrictHttpResponse<PaginationResultRestTypeArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticlesPath, 'get');
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
        return r as StrictHttpResponse<PaginationResultRestTypeArticleRestType>;
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
): Observable<PaginationResultRestTypeArticleRestType> {

    return this.getArticles$Response(params).pipe(
      map((r: StrictHttpResponse<PaginationResultRestTypeArticleRestType>) => r.body as PaginationResultRestTypeArticleRestType)
    );
  }

  /**
   * Path part for operation createNewArticle
   */
  static readonly CreateNewArticlePath = '/articles/';

  /**
   * Create New Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewArticle()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewArticle$Response(params: {
    context?: HttpContext
    body: ArticleOptionsRestType
  }
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.CreateNewArticlePath, 'post');
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
        return r as StrictHttpResponse<ArticleRestType>;
      })
    );
  }

  /**
   * Create New Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNewArticle$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewArticle(params: {
    context?: HttpContext
    body: ArticleOptionsRestType
  }
): Observable<ArticleRestType> {

    return this.createNewArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
    );
  }

  /**
   * Path part for operation getAllArticles
   */
  static readonly GetAllArticlesPath = '/articles/all';

  /**
   * Get All Articles.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllArticles()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticles$Response(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    filter_deleted?: FilterDeletedItems;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<PaginationResultRestTypeFullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetAllArticlesPath, 'get');
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
        return r as StrictHttpResponse<PaginationResultRestTypeFullArticleRestType>;
      })
    );
  }

  /**
   * Get All Articles.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getAllArticles$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllArticles(params?: {
    category?: number;
    cursor?: string;
    size?: number;
    filter_deleted?: FilterDeletedItems;
    context?: HttpContext
  }
): Observable<PaginationResultRestTypeFullArticleRestType> {

    return this.getAllArticles$Response(params).pipe(
      map((r: StrictHttpResponse<PaginationResultRestTypeFullArticleRestType>) => r.body as PaginationResultRestTypeFullArticleRestType)
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
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticlePath, 'get');
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
        return r as StrictHttpResponse<ArticleRestType>;
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
): Observable<ArticleRestType> {

    return this.getArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
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
    body: ArticleOptionsRestType
  }
): Observable<StrictHttpResponse<FullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateArticlePath, 'put');
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
        return r as StrictHttpResponse<FullArticleRestType>;
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
    body: ArticleOptionsRestType
  }
): Observable<FullArticleRestType> {

    return this.updateArticle$Response(params).pipe(
      map((r: StrictHttpResponse<FullArticleRestType>) => r.body as FullArticleRestType)
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
): Observable<StrictHttpResponse<OkayResultRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.DeleteArticlePath, 'delete');
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
        return r as StrictHttpResponse<OkayResultRestType>;
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
): Observable<OkayResultRestType> {

    return this.deleteArticle$Response(params).pipe(
      map((r: StrictHttpResponse<OkayResultRestType>) => r.body as OkayResultRestType)
    );
  }

  /**
   * Path part for operation getFullArticle
   */
  static readonly GetFullArticlePath = '/articles/{article}/full';

  /**
   * Get Full Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFullArticle()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFullArticle$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetFullArticlePath, 'get');
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
        return r as StrictHttpResponse<FullArticleRestType>;
      })
    );
  }

  /**
   * Get Full Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFullArticle$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFullArticle(params: {
    article: number;
    context?: HttpContext
  }
): Observable<FullArticleRestType> {

    return this.getFullArticle$Response(params).pipe(
      map((r: StrictHttpResponse<FullArticleRestType>) => r.body as FullArticleRestType)
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
): Observable<StrictHttpResponse<FullArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.RestoreArticlePath, 'post');
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
        return r as StrictHttpResponse<FullArticleRestType>;
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
): Observable<FullArticleRestType> {

    return this.restoreArticle$Response(params).pipe(
      map((r: StrictHttpResponse<FullArticleRestType>) => r.body as FullArticleRestType)
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
    body: BodyUploadFileToArticle
  }
): Observable<StrictHttpResponse<ArticleFileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UploadFileToArticlePath, 'post');
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
        return r as StrictHttpResponse<ArticleFileRestType>;
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
    body: BodyUploadFileToArticle
  }
): Observable<ArticleFileRestType> {

    return this.uploadFileToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleFileRestType>) => r.body as ArticleFileRestType)
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
): Observable<StrictHttpResponse<Array<ArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticleFilesPath, 'get');
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
        return r as StrictHttpResponse<Array<ArticleFileRestType>>;
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
): Observable<Array<ArticleFileRestType>> {

    return this.getArticleFiles$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleFileRestType>>) => r.body as Array<ArticleFileRestType>)
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
    body: Array<AppendArticleFileOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<ArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.AddOrReplaceFilesToArticlePath, 'put');
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
        return r as StrictHttpResponse<Array<ArticleFileRestType>>;
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
    body: Array<AppendArticleFileOptionsRestType>
  }
): Observable<Array<ArticleFileRestType>> {

    return this.addOrReplaceFilesToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleFileRestType>>) => r.body as Array<ArticleFileRestType>)
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
    body: Array<AppendArticleFileOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<ArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.AddFileToArticlePath, 'post');
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
        return r as StrictHttpResponse<Array<ArticleFileRestType>>;
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
    body: Array<AppendArticleFileOptionsRestType>
  }
): Observable<Array<ArticleFileRestType>> {

    return this.addFileToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleFileRestType>>) => r.body as Array<ArticleFileRestType>)
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
    body: ArticleFileOptionsRestType
  }
): Observable<StrictHttpResponse<ArticleFileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateArticleFilePath, 'put');
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
        return r as StrictHttpResponse<ArticleFileRestType>;
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
    body: ArticleFileOptionsRestType
  }
): Observable<ArticleFileRestType> {

    return this.updateArticleFile$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleFileRestType>) => r.body as ArticleFileRestType)
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
): Observable<StrictHttpResponse<Array<ArticleContentRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetContentsFromArticlePath, 'get');
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
        return r as StrictHttpResponse<Array<ArticleContentRestType>>;
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
): Observable<Array<ArticleContentRestType>> {

    return this.getContentsFromArticle$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleContentRestType>>) => r.body as Array<ArticleContentRestType>)
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
): Observable<StrictHttpResponse<ArticleContentRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetContentFromArticlePath, 'get');
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
        return r as StrictHttpResponse<ArticleContentRestType>;
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
): Observable<ArticleContentRestType> {

    return this.getContentFromArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleContentRestType>) => r.body as ArticleContentRestType)
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
    body: ArticleContentOptionsRestType
  }
): Observable<StrictHttpResponse<ArticleContentRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateArticleContentPath, 'post');
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
        return r as StrictHttpResponse<ArticleContentRestType>;
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
    body: ArticleContentOptionsRestType
  }
): Observable<ArticleContentRestType> {

    return this.updateArticleContent$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleContentRestType>) => r.body as ArticleContentRestType)
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
): Observable<StrictHttpResponse<OkayResultRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.DeleteContentPath, 'delete');
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
        return r as StrictHttpResponse<OkayResultRestType>;
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
): Observable<OkayResultRestType> {

    return this.deleteContent$Response(params).pipe(
      map((r: StrictHttpResponse<OkayResultRestType>) => r.body as OkayResultRestType)
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
    body: Array<ArticleContentOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<ArticleContentRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.ReplaceContentPath, 'put');
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
        return r as StrictHttpResponse<Array<ArticleContentRestType>>;
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
    body: Array<ArticleContentOptionsRestType>
  }
): Observable<Array<ArticleContentRestType>> {

    return this.replaceContent$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleContentRestType>>) => r.body as Array<ArticleContentRestType>)
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
    body: Array<ArticleContentOptionsRestType>
  }
): Observable<StrictHttpResponse<Array<ArticleContentRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.AddArticleContentPath, 'post');
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
        return r as StrictHttpResponse<Array<ArticleContentRestType>>;
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
    body: Array<ArticleContentOptionsRestType>
  }
): Observable<Array<ArticleContentRestType>> {

    return this.addArticleContent$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleContentRestType>>) => r.body as Array<ArticleContentRestType>)
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
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.ReplaceCategoryToArticlePath, 'put');
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
        return r as StrictHttpResponse<ArticleRestType>;
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
): Observable<ArticleRestType> {

    return this.replaceCategoryToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
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
    body: BodyAddCategoryToArticle
  }
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.AddCategoryToArticlePath, 'post');
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
        return r as StrictHttpResponse<ArticleRestType>;
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
    body: BodyAddCategoryToArticle
  }
): Observable<ArticleRestType> {

    return this.addCategoryToArticle$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
    );
  }

}
