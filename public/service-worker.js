/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const CACHE_NAME = "melt-cache";
const urlsToCache = ["/index.html", "/manifest.json", "/logo.png"];

// cache files when the service worker installs
self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache
        .addAll(urlsToCache)
        .then(() => {
          console.log("All resources have been fetched and cached.");
          return self.skipWaiting();
        })
        .catch((error) => {
          console.error("Failed to cache resources:", error);
        });
    })
  );
});

// clean up old cache when the service worker updates
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Listen for requests for files
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

// not yet implemented
// // listen for push notifications
// self.addEventListener("push", (event) => {
//   console.log("Push notification received: listening from the service worker");
//   const payload = event.data ? event.data.text() : "no payload";
//   event.waitUntil(
//     self.registration.showNotification("Push Notification", {
//       body: payload,
//     })
//   );
// });
