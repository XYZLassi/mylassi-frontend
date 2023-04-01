import {
  EMPTY, flatMap,
  from,
  fromEvent,
  iif,
  merge,
  mergeMap,
  Observable,
  ObservableInput,
  of, OperatorFunction,
  Subject,
  Subscription, switchMap,
  take
} from "rxjs";
import {map, tap} from "rxjs/operators";
import {isNotNullOrUndefined} from "./test-null-undefined";

export interface TransactionDbObject {
  db: IDBDatabase
  transaction: IDBObjectStore
}


export interface ItemDbObject<T> {
  item: T
  db: IDBDatabase
}

export interface TransactionItemDbObject<T> extends TransactionDbObject, ItemDbObject<T> {
  item: T
}

export function getDatabase(callback: () => (IDBDatabase | undefined | null)): Observable<IDBDatabase> {
  const getPromise = new Promise<IDBDatabase>(async (resolve, reject) => {
    let db = callback();
    while (!db) {
      await new Promise(f => setTimeout(f, 100));
      db = callback();
    }
    resolve(db as IDBDatabase);
  });
  return from(getPromise).pipe(take(1));
}

export function injectDatabase<T>(callback: () => (IDBDatabase | undefined | null)) {
  return (source$: Observable<T>) => {
    const subject = new Subject<ItemDbObject<T>>();

    let subscriptions: Subscription[] = [];

    return subject.pipe(tap({
      unsubscribe: () => {
        subscriptions.forEach(i => i.unsubscribe());
      },
      subscribe: () => {
        const dbSub = getDatabase(callback).subscribe({
          next: db => {
            const loadSub = source$.subscribe({
              next: item => {
                subject.next({
                  db: db,
                  item: item,
                });
              },
              error: err => {
                subject.error(err);
              },
              complete: () => {
                subject.complete();
              }
            });
            subscriptions.push(loadSub);
          },
          error: err => {
            subject.error(err);
          },
        });
        subscriptions.push(dbSub);
      },
    }));
  };
}

export function createDbTransaction(storeName: string) {
  return (source$: Observable<IDBDatabase>) => {
    const subject = new Subject<TransactionDbObject>();
    let sourceSub: Subscription | undefined = undefined;


    return subject.pipe(tap({
      unsubscribe: () => {
        sourceSub?.unsubscribe();
      },
      subscribe: () => {
        sourceSub = source$.subscribe({
          next: db => {
            const transaction = db.transaction(storeName);
            transaction.onerror = err => {
              subject.error(err);
            };

            const result: TransactionDbObject = {
              db: db,
              transaction: transaction.objectStore(storeName),
            };

            subject.next(result);
          },
          error: err => {
            subject.error(err);
          },
          complete: () => {
            subject.complete();
          }
        })
      }
    }));
  };
}

export function createDbTransactionWithItem<T>(storeName: string, mode?: IDBTransactionMode) {
  return (source$: Observable<ItemDbObject<T>>) => {
    const subject = new Subject<TransactionItemDbObject<T>>();
    let sourceSub: Subscription | undefined = undefined;


    return subject.pipe(tap({
      unsubscribe: () => {
        sourceSub?.unsubscribe();
      },
      subscribe: () => {
        sourceSub = source$.subscribe({
          next: item => {
            const transaction = item.db.transaction(storeName, mode);
            transaction.onerror = err => {
              subject.error(err);
            };

            subject.next({
              item: item.item,
              db: item.db,
              transaction: transaction.objectStore(storeName),
            });
          },
          error: err => {
            subject.error(err);
          },
          complete: () => {
            subject.complete();
          }
        })
      }
    }));
  };
}

export function getDbItem<C, T>(fn: (arg0: C) => (IDBValidKey | IDBKeyRange), defaultFn?: (arg0: C) => T) {
  const errorSubject = new Subject<ItemDbObject<T>>();

  return (source$: Observable<TransactionItemDbObject<C>>) => {
    return source$.pipe(
      mergeMap(transObject => {
        const request = transObject.transaction.get(fn(transObject.item));

        request.onerror = (err) => {
          errorSubject.error(err);
        };

        return merge(
          errorSubject,
          fromEvent(request, 'success', _ => {
            try {
              const resultItem = request.result as T;
              if (resultItem) {
                const result: ItemDbObject<T> = {
                  db: transObject.db,
                  item: resultItem,
                };
                return result;
              } else if (defaultFn) {
                const result: ItemDbObject<T> = {
                  db: transObject.db,
                  item: defaultFn(transObject.item),
                };
                return result;
              }
              return undefined;
            } finally {
              errorSubject.complete();
            }
          }).pipe(take(1), isNotNullOrUndefined()),
        )
      }),
    );
  }
}

export function putDbItem<T>(fn?: (arg0: T) => any) {
  const errorSubject = new Subject<ItemDbObject<T>>();

  return (source$: Observable<TransactionItemDbObject<T>>) => {
    return source$.pipe(
      mergeMap(item => {
        const saveItem = fn ? fn(item.item) : item.item;

        const request = item.transaction.put(saveItem);

        request.onerror = (err) => {
          errorSubject.error(err);
        };

        return merge(
          errorSubject,
          fromEvent(request, 'success', _ => {
            try {
              const result: ItemDbObject<T> = {
                db: item.db,
                item: item.item,
              };
              return result;
            } finally {
              errorSubject.complete();
            }
          }).pipe(take(1)),
        )
      }),
    );
  }
}

export function deleteDbItem<T>(key: (arg0: T) => (IDBValidKey | IDBKeyRange)) {
  const errorSubject = new Subject<TransactionItemDbObject<T>>();

  return (source$: Observable<TransactionItemDbObject<T>>) => {
    return source$.pipe(
      mergeMap(item => {

        const request = item.transaction.delete(key(item.item));

        request.onerror = (err) => {
          errorSubject.error(err);
        };

        return merge(
          errorSubject,
          fromEvent(request, 'success', _ => {
            try {
              const result: ItemDbObject<T> = {
                db: item.db,
                item: item.item,
              };
              return result;
            } finally {
              errorSubject.complete();
            }
          }).pipe(take(1)),
        )
      }),
    );
  }
}

export function existsDbItem<U extends TransactionDbObject, P>(key: (arg0: U) => (IDBValidKey | IDBKeyRange),
                                                               trueResult: OperatorFunction<U, P>,
                                                               falseResult: OperatorFunction<U, P>) {
  const errorSubject = new Subject<P>();

  return (source$: Observable<U>) => {
    return source$.pipe(
      mergeMap(transObject => {
          try {
            const getRequest = transObject.transaction.get(key(transObject));
            getRequest.onerror = err => {
              errorSubject.error(err);
            };

            return merge(
              errorSubject,
              fromEvent(getRequest, 'success', _ => {
                return transObject;
              }).pipe(
                take(1),
                switchMap(i => {
                  const result = of(i);
                  if (getRequest.result)
                    return result.pipe(trueResult);
                  else
                    return result.pipe(falseResult);
                })
              ),
            )

          } finally {
            errorSubject.complete();
          }
        }
      )
    )
  };
}

export function updateDbItemIfExist<T>(key: (arg0: T) => (IDBValidKey | IDBKeyRange), fn?: (arg0: T) => any) {
  const errorSubject = new Subject<ItemDbObject<T>>();

  return (source$: Observable<TransactionItemDbObject<T>>) => {
    return source$.pipe(existsDbItem((i) => key(i.item),
      mergeMap(transObject => {
        const saveObject = fn ? fn(transObject.item) : transObject.item;
        const putRequest = transObject.transaction.put(saveObject);
        putRequest.onerror = err => {
          errorSubject.error(err);
        };

        return merge(
          errorSubject,
          fromEvent(putRequest, 'success', _ => {
            try {
              const result: ItemDbObject<T> = {
                db: transObject.db,
                item: transObject.item,
              };
              return result;
            } finally {
              errorSubject.complete()
            }
          })
        );
      }), mergeMap(i => of(i).pipe(map(a => {
        const result: ItemDbObject<T> = {
          db: a.db,
          item: a.item,
        };
        return result;
      })))));
  };
}

export function getAllDbItems<T>() {
  const errorSubject = new Subject<ItemDbObject<T>>();
  return (source$: Observable<TransactionDbObject>) => {
    return source$.pipe(mergeMap(transObject => {
      const getAllRequest = transObject.transaction.getAll();
      getAllRequest.onerror = (err) => {
        errorSubject.error(err);
      };

      return merge(
        errorSubject,
        fromEvent(getAllRequest, 'success', _ => {
          try {
            return getAllRequest.result as T[];
          } finally {
            errorSubject.complete();
          }
        }).pipe(
          take(1),
          mergeMap(a => of(...a)),
          map(i => {
            const result: ItemDbObject<T> = {
              db: transObject.db,
              item: i
            }
            return result;
          })
        )
      )
    }))
  };
}

export function mapDbItem<T>() {
  return (source$: Observable<ItemDbObject<T>>) => {
    return source$.pipe(map(i => i.item));
  };
}
