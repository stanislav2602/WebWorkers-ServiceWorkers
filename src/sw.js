const CACHE_NAME = 'cinema-v1';
const FILES = [
    '/',
    '/index.html',
    '/bundle.js',
    '/styles.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(FILES))
    );
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) return response;
            return fetch(event.request).then(fetchResponse => {
                if (!fetchResponse || fetchResponse.status !== 200) {
                    return fetchResponse;
                }
                const copy = fetchResponse.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, copy);
                });
                return fetchResponse;
            });
        })
    );
});