import {from, mergeMap, Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface IPutInCacheItem{
  request:RequestInfo| URL,
  response: Response,
}

export function putInCache(cacheName:string){
  return (source$: Observable<IPutInCacheItem>) => source$.pipe(
    mergeMap(i => {
      return from(caches.open(cacheName)).pipe(
        mergeMap(cache => {
          return from(cache.put(i.request,i.response)).pipe(
            map(r => i),
          )
        })
      )
    })
  );
}

export function addInCache(cacheName:string){
  return (source$: Observable<RequestInfo|URL>) => source$.pipe(
    mergeMap(i => {
      return from(caches.open(cacheName)).pipe(
        mergeMap(cache => {
          return from(cache.add(i)).pipe(
            map(r => i),
          )
        })
      )
    })
  );
}
