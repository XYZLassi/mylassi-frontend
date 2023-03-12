const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  default: 'default',
  main: `main-v${CACHE_VERSION}`,
};

self.addEventListener("activate", (event) => {
  const expectedCacheNamesSet = new Set(Object.values(CURRENT_CACHES));
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!expectedCacheNamesSet.has(cacheName)) {
            console.log("Deleting out of date cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener('install', event => {

});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method == 'GET') {
  }
});
