this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/isopo/',
        '/isopo/index.html',
        '/isopo/styles.css',
        '/isopo/app.js',
        '/isopo/dat.gui.min.js',
        '/isopo/Pizzicato.min.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
