/* tslint:disable */
/* eslint-disable */
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse, HttpContext} from '@angular/common/http';
import {BaseService} from '../base-service';
import {ApiConfiguration} from '../api-configuration';
import {StrictHttpResponse} from '../strict-http-response';
import {RequestBuilder} from '../request-builder';
import {Observable} from 'rxjs';
import {map, filter} from 'rxjs/operators';

import {BodyUploadFile} from '../models/body-upload-file';
import {FileRestType} from '../models/file-rest-type';

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
   * Path part for operation uploadFile
   */
  static readonly UploadFilePath = '/files';

  /**
   * Upload File To Filesystem.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `uploadFile()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile$Response(params: {
                        context?: HttpContext
                        body: BodyUploadFile
                      }
  ): Observable<StrictHttpResponse<FileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.UploadFilePath, 'post');
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
   * To access the full response (for headers, for example), `uploadFile$Response()` instead.
   *
   * This method sends `multipart/form-data` and handles request body of type `multipart/form-data`.
   */
  uploadFile(params: {
               context?: HttpContext
               body: BodyUploadFile
             }
  ): Observable<FileRestType> {

    return this.uploadFile$Response(params).pipe(
      map((r: StrictHttpResponse<FileRestType>) => r.body as FileRestType)
    );
  }

  /**
   * Path part for operation getFileInfo
   */
  static readonly GetFileInfoPath = '/files/{file}/info';

  /**
   * Get File Info.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getFileInfo()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileInfo$Response(params: {
                         file: string;
                         context?: HttpContext
                       }
  ): Observable<StrictHttpResponse<FileRestType>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.GetFileInfoPath, 'get');
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
   * To access the full response (for headers, for example), `getFileInfo$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getFileInfo(params: {
                file: string;
                context?: HttpContext
              }
  ): Observable<FileRestType> {

    return this.getFileInfo$Response(params).pipe(
      map((r: StrictHttpResponse<FileRestType>) => r.body as FileRestType)
    );
  }

  /**
   * Path part for operation downloadFile
   */
  static readonly DownloadFilePath = '/files/{file}';

  /**
   * Download File.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadFile()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFile$Response(params: {
                          file: string;
                          context?: HttpContext
                        }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.DownloadFilePath, 'get');
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
        return (r as HttpResponse<any>).clone({body: undefined}) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Download File.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadFile$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadFile(params: {
                 file: string;
                 context?: HttpContext
               }
  ): Observable<void> {

    return this.downloadFile$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation downloadImage
   */
  static readonly DownloadImagePath = '/files/{file}/image';

  /**
   * Download Image.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `downloadImage()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImage$Response(params: {
                           file: string;
                           width?: number;
                           height?: number;
                           context?: HttpContext
                         }
  ): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, FilesService.DownloadImagePath, 'get');
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
        return (r as HttpResponse<any>).clone({body: undefined}) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Download Image.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `downloadImage$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  downloadImage(params: {
                  file: string;
                  width?: number;
                  height?: number;
                  context?: HttpContext
                }
  ): Observable<void> {

    return this.downloadImage$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
