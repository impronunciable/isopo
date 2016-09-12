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
