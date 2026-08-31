const CACHE_NAME = "whisp-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./whisplogo256x256.png",
  "./whisplogo512x512.png",
  "./whisplogo.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(e.request).catch(() => {
        return new Response("", { status: 404, statusText: "Not Found" });
      });
    })
  );
});
