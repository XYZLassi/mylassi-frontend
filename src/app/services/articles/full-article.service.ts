import {Inject, Injectable, isDevMode, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";

import {ArticleContentModel, ArticleFileModel, ArticleModel} from "../../models";
import {concatWith, EMPTY, Observable, of, Subject} from "rxjs";
import {ItemDataSource, ItemTransferState} from "../interfaces";
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {Apollo} from "apollo-angular";

import {LoadArticleGQL} from "../../../generated/graphql";
import {filter, map, tap} from "rxjs/operators";
import {ArticleContentType} from "../../api/models/article-content-type";
import {ArticleFileCacheModel} from "./_interfaces";

const DBName = 'ArticleCache';
const DBTableArticles = 'Articles';
const DBTableArticleFiles = 'ArticleFiles';

function inputIsNotNullOrUndefined<T>(input: null | undefined | T): input is T {
  return input !== null && input !== undefined;
}

export function isNotNullOrUndefined<T>() {
  return (source$: Observable<null | undefined | T>) =>
    source$.pipe(
      filter(inputIsNotNullOrUndefined)
    );
}

@Injectable({
  providedIn: 'root'
})
export class FullArticleService {

  private db!: IDBDatabase;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
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
    const loadItem = this.getSessionArticle(articleId) || this.getStateArticle(articleId);
    const baseSub = loadItem ? of(loadItem) : EMPTY;

    const cacheSub = this.getCacheArticle(articleId);

    const apolloSub = this.getApolloArticle(articleId).pipe(
      tap(value => {
        this.saveInState(value.item);
        this.saveInSession(value.item);
        this.cacheUpdateIfExistsArticle(value.item);
      })
    );

    let resultSub = baseSub.pipe(concatWith(cacheSub, apolloSub));

    resultSub = resultSub.pipe(tap({
      error: err => {
        if (isDevMode())
          console.error(err);
      }
    }))

    return resultSub;
  }

  async cachePutArticle(article: ArticleModel) {
    if (!isPlatformBrowser(this.platformId))
      return;

    const db = await this.getDatabase();
    const transaction = db.transaction([DBTableArticles], "readwrite");
    const articleStore = transaction.objectStore(DBTableArticles);

    const request = articleStore.put(article);

    request.onsuccess = (ev) => {
      article.files.forEach(f => this.updateArticleFile(f, article));
    }
  }

  async updateArticleFile(articleFile: ArticleFileModel, article: ArticleModel): Promise<ArticleFileCacheModel> {
    return new Promise<ArticleFileCacheModel>(async (resolve, reject) => {
      const db = await this.getDatabase();
      const transaction = db.transaction([DBTableArticleFiles], "readonly");

      const fileStore = transaction.objectStore(DBTableArticleFiles);


      const getRequest = fileStore.get(articleFile.fileId);
      getRequest.onsuccess = (ev) => {
        const cacheItem = getRequest.result as ArticleFileCacheModel


        if (cacheItem) {
          if (!cacheItem.articles.includes(article.id)) {
            cacheItem.articles.push(article.id);

            const transaction = db.transaction([DBTableArticleFiles], "readwrite");
            const fileStore = transaction.objectStore(DBTableArticleFiles);
            const putRequest = fileStore.put(cacheItem);

            putRequest.onsuccess = () => {
              resolve(cacheItem)
            }
          } else {
            resolve(cacheItem)
          }
        } else {
          caches.open('ArticleImageCache').then(cache => {
            cache.add(articleFile.url).then(() => {
              const newCacheItem: ArticleFileCacheModel = {
                fileId: articleFile.fileId,
                url: articleFile.url,
                articles: [article.id],
              }


              const transaction = db.transaction([DBTableArticleFiles], "readwrite");
              const fileStore = transaction.objectStore(DBTableArticleFiles);
              const putRequest = fileStore.put(newCacheItem);
              putRequest.onsuccess = () => {
                resolve(newCacheItem);
              }
            })
          });
        }
      };
    });
  }

  async cacheUpdateIfExistsArticle(article: ArticleModel) {
    if (!isPlatformBrowser(this.platformId))
      return;

    const db = await this.getDatabase();
    const transaction = db.transaction(DBTableArticles, "readwrite");
    const store = transaction.objectStore(DBTableArticles);

    const getRequest = store.get(article.id);
    getRequest.onsuccess = (event) => {
      if (getRequest.result)
        this.cachePutArticle(article);
    }
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

  private getCacheArticle(articleId: number): Observable<ItemTransferState<ArticleModel>> {
    const subject = new Subject<ItemTransferState<ArticleModel>>;

    const sub = subject.pipe(tap({
      subscribe: async () => {
        const db = await this.getDatabase();

        const transaction = db.transaction(DBTableArticles, "readonly");
        transaction.onerror = err => {
          subject.error(err);
        };
        transaction.oncomplete = () => {
          subject.complete();
        };

        const store = transaction.objectStore(DBTableArticles);

        const dbRequest = store.get(articleId);
        dbRequest.onsuccess = (ev) => {
          const result = dbRequest.result as ArticleModel;

          if (result) {
            subject.next({
              source: ItemDataSource.Cache,
              item: result,
            });
          }
          subject.complete();
        };
      }
    }));

    return sub;
  }

  private getSessionArticle(articleId: number): ItemTransferState<ArticleModel> | undefined {
    if (!isPlatformBrowser(this.platformId))
      return;

    const key = this.getArticleKey(articleId);
    try {
      const itemString = sessionStorage.getItem(key);
      if (itemString) {
        return {
          source: ItemDataSource.Session,
          item: JSON.parse(itemString) as ArticleModel,
        }
      }
    } catch {
      sessionStorage.removeItem(key);
    }
    return;
  }

  private getStateArticle(articleId: number): ItemTransferState<ArticleModel> | undefined {
    if (!isPlatformBrowser(this.platformId))
      return;

    const key = this.getArticleKey(articleId);
    const STATE_KEY_QUERY = makeStateKey<ArticleModel>(key);

    const result = this.state.get(STATE_KEY_QUERY, undefined);
    if (result) {
      return {
        source: ItemDataSource.State,
        item: result,
      }
    }

    return;
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

  private async getDatabase(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>(async (resolve, reject) => {
      while (!this.db) {
        await new Promise(f => setTimeout(f, 100));
      }
      resolve(this.db);
    });
  }

  private saveInSession(item: ArticleModel) {
    if (!isPlatformBrowser(this.platformId))
      return;

    const key = this.getArticleKey(item);
    const articleString = JSON.stringify(item);
    sessionStorage.setItem(key, articleString);
  }

  private saveInState(item: ArticleModel) {
    if (isPlatformBrowser(this.platformId))
      return;

    const key = this.getArticleKey(item);
    const STATE_KEY_QUERY = makeStateKey<ArticleModel>(key);


    this.state.set(STATE_KEY_QUERY, item);
  }
}
