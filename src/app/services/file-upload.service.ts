import {Injectable} from '@angular/core';
import {ArticleFileUsage} from "../api/models/article-file-usage";
import {ArticleRestType} from "../api/models/article-rest-type";
import {FilesService} from "../api/services/files.service";
import {concatWith, EMPTY, Observable, Subject} from "rxjs";
import {ArticleFileRestType} from "../api/models/article-file-rest-type";
import {FileRestType} from "../api/models/file-rest-type";
import {ArticlesService} from "../api/services/articles.service";
import {AppendArticleFileOptionsRestType} from "../api/models/append-article-file-options-rest-type";
import {tap} from "rxjs/operators";

export interface ArticleFileUploadData {
  file: File | string;
  fileUsage: ArticleFileUsage | null;

}

export interface UploadResult {
  info: FileRestType;
  uploadInfo: ArticleFileUploadData;
}

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private filesService: FilesService, private articlesService: ArticlesService) {
  }

  private uploadFile(uploadInfo: ArticleFileUploadData): Observable<UploadResult> {
    const resultSubject = new Subject<UploadResult>();

    return resultSubject.pipe(tap({
      subscribe: () => {
        const uploadSub = this.filesService.uploadFile({
          body: {
            file: uploadInfo.file as File
          }
        }).subscribe({
          next: info => {
            resultSubject.next({info, uploadInfo});
            resultSubject.complete();
            uploadSub.unsubscribe();
          },
          error: err => {
            resultSubject.error(err);
            uploadSub.unsubscribe();
          },
          complete: () => {
            uploadSub.unsubscribe();
          }
        });
      },
    }));
  }

  private getFileInfo(uploadInfo: ArticleFileUploadData): Observable<UploadResult> {
    let resultSubject = new Subject<UploadResult>();
    //Todo: Exception

    return resultSubject.pipe(tap({
      subscribe: () => {
        const infoSub = this.filesService.getFileInfo({
          file: uploadInfo.file as string
        }).subscribe({
          next: info => {
            resultSubject.next({info, uploadInfo});
            resultSubject.complete();
            infoSub.unsubscribe();
          },
          error: err => {
            resultSubject.error(err);
            infoSub.unsubscribe();
          },
          complete: () => {
            infoSub.unsubscribe();
          }
        });
      }
    }));
  }

  uploadFilesOrGetInfo(...files: ArticleFileUploadData[]): Observable<UploadResult> {
    let uploadSubs: Observable<UploadResult>[] = []

    files.forEach(i => {
      if (i.file instanceof File) {
        uploadSubs.push(this.uploadFile(i));
      } else {
        uploadSubs.push(this.getFileInfo(i));
      }
    });

    return EMPTY.pipe(concatWith(...uploadSubs));
  }


  uploadFilesToArticle(value: ArticleRestType, files: ArticleFileUploadData[]): Observable<ArticleFileRestType> {
    let resultSubject = new Subject<ArticleFileRestType>();

    return resultSubject.pipe(tap({
      subscribe: () => {
        let results: AppendArticleFileOptionsRestType[] = [];
        const uploadSub = this.uploadFilesOrGetInfo(...files).subscribe({
          next: info => {
            results.push({
              fileId: info.info.id,
              fileUsage: info.uploadInfo.fileUsage || undefined,
            });
          },
          error: (err) => {
            resultSubject.error(err);
            uploadSub.unsubscribe();
          },
          complete: () => {
            uploadSub.unsubscribe();

            const updateSub = this.articlesService.addOrReplaceFilesToArticle({
              article: value.id,
              body: results
            }).subscribe({
              next: info => {
                info.forEach(i => resultSubject.next(i));
                resultSubject.complete();
                updateSub.unsubscribe();
              },
              error: err => {
                resultSubject.error(err);
                updateSub.unsubscribe();
              },
            });
          }
        });
      }
    }))
  }
}
