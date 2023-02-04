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

import { ArticleFileRestType } from '../models/article-file-rest-type';
import { ArticleRestType } from '../models/article-rest-type';
import { BodyAddCategoryToArticleArticlesArticleCategoryPost } from '../models/body-add-category-to-article-articles-article-category-post';
import { BodyCreateNewArticleArticlesPost } from '../models/body-create-new-article-articles-post';
import { BodyReplaceCategoryToArticleArticlesArticleCategoryPut } from '../models/body-replace-category-to-article-articles-article-category-put';
import { BodyUpdateArticleArticlesArticlePut } from '../models/body-update-article-articles-article-put';
import { BodyUpdateArticleFileArticlesArticleFilesArticleFilePut } from '../models/body-update-article-file-articles-article-files-article-file-put';
import { BodyUploadFileToArticleArticlesArticleUploadFilePost } from '../models/body-upload-file-to-article-articles-article-upload-file-post';

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
   * Path part for operation getArticlesArticlesGet
   */
  static readonly GetArticlesArticlesGetPath = '/articles/';

  /**
   * Get Articles.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticlesArticlesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesArticlesGet$Response(params?: {
    category?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ArticleRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticlesArticlesGetPath, 'get');
    if (params) {
      rb.query('category', params.category, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<ArticleRestType>>;
      })
    );
  }

  /**
   * Get Articles.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getArticlesArticlesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticlesArticlesGet(params?: {
    category?: number;
    context?: HttpContext
  }
): Observable<Array<ArticleRestType>> {

    return this.getArticlesArticlesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleRestType>>) => r.body as Array<ArticleRestType>)
    );
  }

  /**
   * Path part for operation createNewArticleArticlesPost
   */
  static readonly CreateNewArticleArticlesPostPath = '/articles/';

  /**
   * Create New Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewArticleArticlesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewArticleArticlesPost$Response(params: {
    context?: HttpContext
    body: BodyCreateNewArticleArticlesPost
  }
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.CreateNewArticleArticlesPostPath, 'post');
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
   * To access the full response (for headers, for example), `createNewArticleArticlesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewArticleArticlesPost(params: {
    context?: HttpContext
    body: BodyCreateNewArticleArticlesPost
  }
): Observable<ArticleRestType> {

    return this.createNewArticleArticlesPost$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
    );
  }

  /**
   * Path part for operation updateArticleArticlesArticlePut
   */
  static readonly UpdateArticleArticlesArticlePutPath = '/articles/{article}';

  /**
   * Update Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticleArticlesArticlePut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleArticlesArticlePut$Response(params: {
    article: number;
    context?: HttpContext
    body: BodyUpdateArticleArticlesArticlePut
  }
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateArticleArticlesArticlePutPath, 'put');
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
   * Update Article.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updateArticleArticlesArticlePut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleArticlesArticlePut(params: {
    article: number;
    context?: HttpContext
    body: BodyUpdateArticleArticlesArticlePut
  }
): Observable<ArticleRestType> {

    return this.updateArticleArticlesArticlePut$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
    );
  }

  /**
   * Path part for operation replaceCategoryToArticleArticlesArticleCategoryPut
   */
  static readonly ReplaceCategoryToArticleArticlesArticleCategoryPutPath = '/articles/{article}/category';

  /**
   * Replace Category To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `replaceCategoryToArticleArticlesArticleCategoryPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceCategoryToArticleArticlesArticleCategoryPut$Response(params: {
    article: number;
    context?: HttpContext
    body: BodyReplaceCategoryToArticleArticlesArticleCategoryPut
  }
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.ReplaceCategoryToArticleArticlesArticleCategoryPutPath, 'put');
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
   * To access the full response (for headers, for example), `replaceCategoryToArticleArticlesArticleCategoryPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  replaceCategoryToArticleArticlesArticleCategoryPut(params: {
    article: number;
    context?: HttpContext
    body: BodyReplaceCategoryToArticleArticlesArticleCategoryPut
  }
): Observable<ArticleRestType> {

    return this.replaceCategoryToArticleArticlesArticleCategoryPut$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
    );
  }

  /**
   * Path part for operation addCategoryToArticleArticlesArticleCategoryPost
   */
  static readonly AddCategoryToArticleArticlesArticleCategoryPostPath = '/articles/{article}/category';

  /**
   * Add Category To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCategoryToArticleArticlesArticleCategoryPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategoryToArticleArticlesArticleCategoryPost$Response(params: {
    article: number;
    context?: HttpContext
    body: BodyAddCategoryToArticleArticlesArticleCategoryPost
  }
): Observable<StrictHttpResponse<ArticleRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.AddCategoryToArticleArticlesArticleCategoryPostPath, 'post');
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
   * To access the full response (for headers, for example), `addCategoryToArticleArticlesArticleCategoryPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCategoryToArticleArticlesArticleCategoryPost(params: {
    article: number;
    context?: HttpContext
    body: BodyAddCategoryToArticleArticlesArticleCategoryPost
  }
): Observable<ArticleRestType> {

    return this.addCategoryToArticleArticlesArticleCategoryPost$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleRestType>) => r.body as ArticleRestType)
    );
  }

  /**
   * Path part for operation uploadFileToArticleArticlesArticleUploadFilePost
   */
  static readonly UploadFileToArticleArticlesArticleUploadFilePostPath = '/articles/{article}/uploadFile';

  /**
   * Upload File To Article.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFileToArticleArticlesArticleUploadFilePost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFileToArticleArticlesArticleUploadFilePost$Response(params: {
    article: number;
    context?: HttpContext
    body: BodyUploadFileToArticleArticlesArticleUploadFilePost
  }
): Observable<StrictHttpResponse<ArticleFileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UploadFileToArticleArticlesArticleUploadFilePostPath, 'post');
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
   * To access the full response (for headers, for example), `uploadFileToArticleArticlesArticleUploadFilePost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFileToArticleArticlesArticleUploadFilePost(params: {
    article: number;
    context?: HttpContext
    body: BodyUploadFileToArticleArticlesArticleUploadFilePost
  }
): Observable<ArticleFileRestType> {

    return this.uploadFileToArticleArticlesArticleUploadFilePost$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleFileRestType>) => r.body as ArticleFileRestType)
    );
  }

  /**
   * Path part for operation getArticleFilesArticlesArticleFilesGet
   */
  static readonly GetArticleFilesArticlesArticleFilesGetPath = '/articles/{article}/files';

  /**
   * Get Article Files.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getArticleFilesArticlesArticleFilesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleFilesArticlesArticleFilesGet$Response(params: {
    article: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<ArticleFileRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.GetArticleFilesArticlesArticleFilesGetPath, 'get');
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
   * To access the full response (for headers, for example), `getArticleFilesArticlesArticleFilesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getArticleFilesArticlesArticleFilesGet(params: {
    article: number;
    context?: HttpContext
  }
): Observable<Array<ArticleFileRestType>> {

    return this.getArticleFilesArticlesArticleFilesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<ArticleFileRestType>>) => r.body as Array<ArticleFileRestType>)
    );
  }

  /**
   * Path part for operation updateArticleFileArticlesArticleFilesArticleFilePut
   */
  static readonly UpdateArticleFileArticlesArticleFilesArticleFilePutPath = '/articles/{article}/files/{article_file}';

  /**
   * Update Article File.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateArticleFileArticlesArticleFilesArticleFilePut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleFileArticlesArticleFilesArticleFilePut$Response(params: {
    article: number;
    article_file: number;
    context?: HttpContext
    body: BodyUpdateArticleFileArticlesArticleFilesArticleFilePut
  }
): Observable<StrictHttpResponse<ArticleFileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, ArticlesService.UpdateArticleFileArticlesArticleFilesArticleFilePutPath, 'put');
    if (params) {
      rb.path('article', params.article, {});
      rb.path('article_file', params.article_file, {});
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
   * To access the full response (for headers, for example), `updateArticleFileArticlesArticleFilesArticleFilePut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateArticleFileArticlesArticleFilesArticleFilePut(params: {
    article: number;
    article_file: number;
    context?: HttpContext
    body: BodyUpdateArticleFileArticlesArticleFilesArticleFilePut
  }
): Observable<ArticleFileRestType> {

    return this.updateArticleFileArticlesArticleFilesArticleFilePut$Response(params).pipe(
      map((r: StrictHttpResponse<ArticleFileRestType>) => r.body as ArticleFileRestType)
    );
  }

}
