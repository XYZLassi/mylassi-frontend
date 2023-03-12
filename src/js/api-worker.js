const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  articleImageCache: 'ArticleImageCache',
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

async function getCacheImage(request) {
  const url = new URL(request.url);
  const subFullFileUrl = url.origin + url.pathname;
  console.log(url);
  console.log(subFullFileUrl)

  const response = await caches.match(subFullFileUrl);
  if (response) {
    return response
  }
  return await fetch(request);
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method == 'GET') {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/images') || url.pathname.startsWith('/files')) {
      event.respondWith(getCacheImage(request));
    }
  }
});
