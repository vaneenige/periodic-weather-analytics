const CACHE_NAME = 'periodic-weather-analytics-v01';
const expectedCaches = [CACHE_NAME];
const staticFiles = [
  './',
  './app/build/bundle.js',
  './app/build/style.css',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(staticFiles))
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(response =>
      caches.open(CACHE_NAME).then((cache) => {
        if (event.request.url.match(/(analytics)/) === null && url.origin === location.origin) {
          cache.put(event.request, response.clone());
        }
        return response;
      })
    ))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map((key) => {
        if (!expectedCaches.includes(key)) {
          return caches.delete(key);
        }
      })
    )).then(() => {
      console.log(`${CACHE_NAME} now ready to handle fetches!`);
      return clients.claim();
    }).then(() => {
      return self.clients.matchAll().then(clients =>
        Promise.all(clients.map(client =>
          client.postMessage('This application is now ready to be used offline.')
        ))
      );
    })
  );
});
