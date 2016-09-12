this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/app.js',
        '/dat.gui.min.js',
        '/Pizzicato.min.js'
      ]);
    })
  );
});
