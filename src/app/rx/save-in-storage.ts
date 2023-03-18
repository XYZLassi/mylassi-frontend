import {Observable, Subject} from "rxjs";
import {map, tap} from "rxjs/operators";
import {ItemDataSource, ItemTransferState} from "../services";

function inputSaveInSession<T>(key: string) {
  return (item: T) => {
    const articleString = JSON.stringify(item);
    sessionStorage.setItem(key, articleString);
    return item;
  };
}


export function saveInSession<T>(key: (arg0: T) => string, fn?: (arg0: T) => any) {
  return (source$: Observable<T>) => source$.pipe(
    map(i => {
      const saveItem = fn ? fn(i) : i;
      inputSaveInSession(key(i))(saveItem)
      return i
    }));
}

export function restoreFromSession<T>(key: string): Observable<ItemTransferState<T>> {
  const observer = new Observable<ItemTransferState<T>>(subscriber => {
    try {
      const itemString = sessionStorage.getItem(key);

      if (itemString) {
        const item = JSON.parse(itemString) as T;
        if (!item)
          throw new Error('Object can not parse');

        subscriber.next({
          source: ItemDataSource.Session,
          item: item,
        });
      }
      subscriber.complete();
    } catch (err) {
      subscriber.error(err);
    }
  });
  return observer;
}

