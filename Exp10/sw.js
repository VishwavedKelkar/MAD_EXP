const dynamicCacheName = 'site-dynamic-v1';
// install event
self.addEventListener('install', evt => {
  console.log('service worker installed');
});

// activate event
self.addEventListener('activate', evt => {
  console.log('service worker activated');
});

// fetch event
self.addEventListener('fetch', evt => {
  //console.log('fetch event', evt);
  evt.respondWith(
    caches.match(evt.request).then(cacheRes => {
      return cacheRes || fetch(evt.request).then(fetchRes => {
        return caches.open(dynamicCacheName).then(cache => {
          cache.put(evt.request.url, fetchRes.clone());
          return fetchRes;
        })
      });
    })
  );
});
