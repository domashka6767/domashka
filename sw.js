const CACHE_NAME = "domashka-v1";
const FILES = [
  "/domashka/",
  "/domashka/index.html",
  "/domashka/style.css",
  "/domashka/script.js"
];
// Установка: сохраняем файлы в кэш
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open
(CACHE_NAME).then((cache) => cache.addAll(FILES))
  );
});

// Активация: удаляем старые кэши
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
});

// Перехват запросов: сначала кэш, потом сеть
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});