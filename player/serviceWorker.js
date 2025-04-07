// Define a cache name and assets to cache
const CACHE_NAME = "webmediaplayer-samuellouf-cache";
const ASSETS_TO_CACHE = ["offline.html"];

// Install service worker and cache the assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[Service Worker] Caching assets");
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .catch((err) => {
        console.error("[Service Worker] Failed to cache assets:", err);
      }),
  );
  self.skipWaiting();
});

// Activate the service worker and clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[Service Worker] Deleting old cache:", cache);
            return caches.delete(cache);
          }
        }),
      );
    }),
  );
  self.clients.claim();
});
