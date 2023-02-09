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

import { BodyUploadFileToFilesystemFilesPost } from '../models/body-upload-file-to-filesystem-files-post';
import { FileRestType } from '../models/file-rest-type';

@Injectable({
  providedIn: 'root',
})
export class FilesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation uploadFileToFilesystemFilesPost
   */
  static readonly UploadFileToFilesystemFilesPostPath = '/files';

  /**
   * Upload File To Filesystem.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFileToFilesystemFilesPost()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFileToFilesystemFilesPost$Response(params: {
    context?: HttpContext
    body: BodyUploadFileToFilesystemFilesPost
  }
): Observable<StrictHttpResponse<FileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.UploadFileToFilesystemFilesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'multipart/form-data');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileRestType>;
      })
    );
  }

  /**
   * Upload File To Filesystem.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `uploadFileToFilesystemFilesPost$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFileToFilesystemFilesPost(params: {
    context?: HttpContext
    body: BodyUploadFileToFilesystemFilesPost
  }
): Observable<FileRestType> {

    return this.uploadFileToFilesystemFilesPost$Response(params).pipe(
      map((r: StrictHttpResponse<FileRestType>) => r.body as FileRestType)
    );
  }

  /**
   * Path part for operation getFileInfoFilesFileInfoGet
   */
  static readonly GetFileInfoFilesFileInfoGetPath = '/files/{file}/info';

  /**
   * Get File Info.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileInfoFilesFileInfoGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileInfoFilesFileInfoGet$Response(params: {
    file: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<FileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.GetFileInfoFilesFileInfoGetPath, 'get');
    if (params) {
      rb.path('file', params.file, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FileRestType>;
      })
    );
  }

  /**
   * Get File Info.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `getFileInfoFilesFileInfoGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileInfoFilesFileInfoGet(params: {
    file: string;
    context?: HttpContext
  }
): Observable<FileRestType> {

    return this.getFileInfoFilesFileInfoGet$Response(params).pipe(
      map((r: StrictHttpResponse<FileRestType>) => r.body as FileRestType)
    );
  }

  /**
   * Path part for operation downloadFileFilesFileGet
   */
  static readonly DownloadFileFilesFileGetPath = '/files/{file}';

  /**
   * Download File.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFileFilesFileGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFileFilesFileGet$Response(params: {
    file: string;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.DownloadFileFilesFileGetPath, 'get');
    if (params) {
      rb.path('file', params.file, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Download File.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadFileFilesFileGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFileFilesFileGet(params: {
    file: string;
    context?: HttpContext
  }
): Observable<void> {

    return this.downloadFileFilesFileGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation downloadImageFilesFileImageGet
   */
  static readonly DownloadImageFilesFileImageGetPath = '/files/{file}/image';

  /**
   * Download Image.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadImageFilesFileImageGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImageFilesFileImageGet$Response(params: {
    file: string;
    width?: number;
    height?: number;
    context?: HttpContext
  }
): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.DownloadImageFilesFileImageGetPath, 'get');
    if (params) {
      rb.path('file', params.file, {});
      rb.query('width', params.width, {});
      rb.query('height', params.height, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: params?.context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Download Image.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadImageFilesFileImageGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImageFilesFileImageGet(params: {
    file: string;
    width?: number;
    height?: number;
    context?: HttpContext
  }
): Observable<void> {

    return this.downloadImageFilesFileImageGet$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
