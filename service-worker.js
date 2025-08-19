const CACHE_NAME = "mis-notas-cache-v1";
const urlsToCache = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "./manifest.json",
  "https://code.getmdl.io/1.3.0/material.indigo-pink.min.css",
  "https://code.getmdl.io/1.3.0/material.min.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
];

// Instalación: cachea archivos esenciales
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando y cacheando archivos...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activación: limpia caches antiguos si existen
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activado");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Service Worker: Limpiando cache antiguo", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: estrategia Cache First
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
