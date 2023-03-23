const CACHE_VERSION = 1;
const CURRENT_CACHES = {
  articleImageCache: 'ArticleImageCache',
  main: `main-v${CACHE_VERSION}`,
};

const BASE_URL = "https://api.mylassi.xyz";

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
  const id = url.pathname.split('/').filter(i => i)[1];

  if (id) {
    const urls = [
      `${BASE_URL}/images/${id}`,
      `${BASE_URL}/files/${id}/image`,
    ]

    for (let url of urls) {
      const imageResponse = await caches.match(url);
      if (imageResponse) {
        return imageResponse
      }
    }
  }


  return await fetch(request);
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method === 'GET') {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/images') || (url.pathname.startsWith('/files') && url.pathname.endsWith('/image'))) {
      event.respondWith(getCacheImage(request));
    }
  }
});
