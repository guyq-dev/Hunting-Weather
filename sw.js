self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('querner-weather-v1').then((cache) => {
      return cache.addAll([
        './index.html',
        'https://cdn.tailwindcss.com',
        'https://unpkg.com/lucide@latest'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Let live API and Open-Meteo requests pass through to the network directly, cache static assets
  if (e.request.url.includes('ambientweather.net') || e.request.url.includes('open-meteo.com')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
