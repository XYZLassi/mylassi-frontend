import {Inject, Injectable, isDevMode, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

import {ArticleContentModel, ArticleFileModel, ArticleModel} from "../../models";
import {concat, concatWith, EMPTY, mergeMap, Observable, of, take} from "rxjs";
import {ItemDataSource, ItemTransferState} from "../interfaces";
import {TransferState} from "@angular/platform-browser";
import {Apollo} from "apollo-angular";

import {LoadArticleGQL} from "../../../generated/graphql";
import {filter, map, tap} from "rxjs/operators";
import {ArticleContentType} from "../../api/models/article-content-type";

import {
  addInCache,
  createDbTransaction,
  createDbTransactionWithItem,
  deleteDbItem,
  existsDbItem,
  getDatabase,
  getDbItem,
  injectDatabase,
  IPutInCacheItem,
  isNotNullOrUndefined,
  mapDbItem,
  putDbItem,
  putInCache,
  restoreFromSession,
  restoreFromState,
  saveInSession,
  saveInState
} from "../../rx";
import {HttpClient, HttpResponse} from "@angular/common/http";

const DBName = 'ArticleCache';
const DBTableArticles = 'Articles';
const DBTableArticleFiles = 'ArticleFiles';


@Injectable({
  providedIn: 'root'
})
export class FullArticleService {

  private db!: IDBDatabase;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private http: HttpClient,
              private apollo: Apollo,
              private state: TransferState) {
    if (!isPlatformBrowser(this.platformId))
      return

    const openDB = indexedDB.open(DBName, 2);

    openDB.onupgradeneeded = (event) => {
      this.migrate_db(openDB.result, event.oldVersion);
    };

    openDB.onsuccess = _ => {
      if (isDevMode())
        console.log(`Open DB: ${DBName}`);
      this.db = openDB.result;
    };
  }

  getArticle(articleId: number): Observable<ItemTransferState<ArticleModel>> {
    const itemKey = this.getArticleKey(articleId);


    let sessionSub: Observable<ItemTransferState<ArticleModel>> = EMPTY;
    if (isPlatformBrowser(this.platformId)) {
      sessionSub = sessionSub.pipe(
        concatWith(
          restoreFromSession<ArticleModel>(itemKey),
          restoreFromState<ArticleModel>(itemKey, this.state),
        ),
        take(1),
      );
    }

    let cacheSub: Observable<ItemTransferState<ArticleModel>> = EMPTY;
    if (isPlatformBrowser(this.platformId)) {
      cacheSub = getDatabase(() => this.db).pipe(
        createDbTransaction(DBTableArticles),
        getDbItem<ArticleModel>(articleId),
        map(i => {
          return {
            source: ItemDataSource.Cache,
            item: i.item
          }
        })
      );
    }

    let apolloSub = this.getApolloArticle(articleId);
    //Caching
    if (isPlatformBrowser(this.platformId)) {
      apolloSub = apolloSub.pipe(
        saveInSession(i => this.getArticleKey(i.item)),
        //Save in DB
        injectDatabase(() => this.db),
        createDbTransactionWithItem(DBTableArticles, "readwrite"),
        existsDbItem(i => i.item.item.id,
          mergeMap(i => {
            return this.putArticleInCache(i.item.item).pipe(map(j => i.item));
          }), map(i => i.item)),
      )
    } else {
      apolloSub = apolloSub.pipe(
        saveInState(i => itemKey, this.state, i => i.item),
      )
    }


    let resultSub = concat(sessionSub, cacheSub, apolloSub);

    resultSub = resultSub.pipe(tap({
      error: err => {
        if (isDevMode())
          console.error(err);
      }
    }))

    return resultSub;
  }

  public putArticleInCache(article: ArticleModel) {
    return of(article).pipe(
      injectDatabase(() => this.db),
      createDbTransactionWithItem(DBTableArticles, 'readwrite'),
      putDbItem(),
      mapDbItem(),
      mergeMap(a => {
        return of(...a.files).pipe(
          mergeMap(f => {
            return of(f.url).pipe(
              addInCache('ArticleImageCache'),
              map(_ => f),
            )
          }),
          injectDatabase(() => this.db),
          createDbTransactionWithItem(DBTableArticleFiles, 'readwrite'),
          putDbItem(),
          mapDbItem(),
        )
      })
    )
  }

  public removeArticleFormCache(article: ArticleModel) {
    return of(article).pipe(
      injectDatabase(() => this.db),
      createDbTransactionWithItem(DBTableArticles, 'readwrite'),
      deleteDbItem(i => i.id),
      mapDbItem(),
    )
  }

  private getApolloArticle(articleId: number): Observable<ItemTransferState<ArticleModel>> {
    const qgl = new LoadArticleGQL(this.apollo);
    const sub = qgl.watch({
      articleId: articleId
    }).valueChanges.pipe(
      map(i => i.data.article),
      isNotNullOrUndefined()
    );

    return sub.pipe(map(i => {
      const contents: ArticleContentModel[] = [];
      const files: ArticleFileModel[] = [];

      i.contents.forEach(content => {
        contents.push({
          position: content.position,
          contentType: content.contentType as ArticleContentType,
          header: content.header,
        });
      });

      i.files.forEach(file => {
        files.push({
          fileId: file.fileId,
          url: file.url,
        })
      });


      return {
        source: ItemDataSource.API,
        item: {
          id: i.id,
          title: i.title,
          teaser: i.teaser || undefined,
          contents: contents,
          files: files,
        }
      }
    }));
  }


  private getArticleKey(article: number | ArticleModel): string {
    const model = article as ArticleModel;
    if (model.id) {
      return `Article-${model.id}`;
    }
    return `Article-${article}`;
  }

  private migrate_db(result: IDBDatabase, version: number) {
    if (version < 1) {
      if (result.objectStoreNames.contains(DBTableArticles))
        result.deleteObjectStore(DBTableArticles);

      result.createObjectStore(DBTableArticles, {
        keyPath: 'id',
      });
    }

    if (version < 2) {
      if (result.objectStoreNames.contains(DBTableArticleFiles))
        result.deleteObjectStore(DBTableArticleFiles)

      result.createObjectStore(DBTableArticleFiles, {
        keyPath: 'fileId',
      });
    }
  }
}
