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

import { BodyCreateNewPostPostsPost } from '../models/body-create-new-post-posts-post';
import { BodyUpdatePostPostsPostIdPut } from '../models/body-update-post-posts-post-id-put';
import { PostRestType } from '../models/post-rest-type';

@Injectable({
  providedIn: 'root',
})
export class PostsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation getPostsPostsGet
   */
  static readonly GetPostsPostsGetPath = '/posts/';

  /**
   * Get Posts.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPostsPostsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostsPostsGet$Response(params?: {
    context?: HttpContext
  }
): Observable<StrictHttpResponse<Array<PostRestType>>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.GetPostsPostsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PostRestType>>;
      })
    );
  }

  /**
   * Get Posts.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getPostsPostsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPostsPostsGet(params?: {
    context?: HttpContext
  }
): Observable<Array<PostRestType>> {

    return this.getPostsPostsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PostRestType>>) => r.body as Array<PostRestType>)
    );
  }

  /**
   * Path part for operation createNewPostPostsPost
   */
  static readonly CreateNewPostPostsPostPath = '/posts/';

  /**
   * Create New Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createNewPostPostsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewPostPostsPost$Response(params: {
    context?: HttpContext
    body: BodyCreateNewPostPostsPost
  }
): Observable<StrictHttpResponse<PostRestType>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.CreateNewPostPostsPostPath, 'post');
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
        return r as StrictHttpResponse<PostRestType>;
      })
    );
  }

  /**
   * Create New Post.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `createNewPostPostsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createNewPostPostsPost(params: {
    context?: HttpContext
    body: BodyCreateNewPostPostsPost
  }
): Observable<PostRestType> {

    return this.createNewPostPostsPost$Response(params).pipe(
      map((r: StrictHttpResponse<PostRestType>) => r.body as PostRestType)
    );
  }

  /**
   * Path part for operation updatePostPostsPostIdPut
   */
  static readonly UpdatePostPostsPostIdPutPath = '/posts/{post_id}';

  /**
   * Update Post.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updatePostPostsPostIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePostPostsPostIdPut$Response(params: {
    post_id: number;
    context?: HttpContext
    body: BodyUpdatePostPostsPostIdPut
  }
): Observable<StrictHttpResponse<PostRestType>> {

    const rb = new RequestBuilder(this.rootUrl, PostsService.UpdatePostPostsPostIdPutPath, 'put');
    if (params) {
      rb.path('post_id', params.post_id, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<PostRestType>;
      })
    );
  }

  /**
   * Update Post.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `updatePostPostsPostIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updatePostPostsPostIdPut(params: {
    post_id: number;
    context?: HttpContext
    body: BodyUpdatePostPostsPostIdPut
  }
): Observable<PostRestType> {

    return this.updatePostPostsPostIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<PostRestType>) => r.body as PostRestType)
    );
  }

}
