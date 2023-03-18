import {Observable, Subject} from "rxjs";
import {map, tap} from "rxjs/operators";
import {makeStateKey, TransferState} from "@angular/platform-browser";
import {ItemDataSource, ItemTransferState} from "../services";

function inputSaveInState<T>(key: string, state: TransferState) {
  return (item: T) => {
    const stateKey = makeStateKey<T>(key);
    state.set(stateKey, item);
    return item;
  };
}

export function saveInState<T, U>(key: (arg0: T) => string, state: TransferState, fn: (arg0: T) => U) {
  return (source$: Observable<T>) => source$.pipe(map(item => {
    const saveItem = fn(item);
    inputSaveInState(key(item), state)(saveItem);
    return item;
  }));
}

export function restoreFromState<T>(key: string, state: TransferState): Observable<ItemTransferState<T>> {
  const stateKey = makeStateKey<T>(key);

  return new Observable<ItemTransferState<T>>(subscriber => {
    const item = state.get(stateKey, undefined);
    if (item !== undefined) {
      subscriber.next({
        source: ItemDataSource.State,
        item: item
      });
    }
    subscriber.complete();
  });

}
