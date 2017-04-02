this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/alaorweb.github.io/',
        '/alaorweb.github.io/index.html',
        '/alaorweb.github.io/img/favicon/favicon.ico',
        '/alaorweb.github.io/fonts/open_sans/OpenSans-Regular.ttf',
        '/alaorweb.github.io/fonts/open_sans/OpenSans-Bold.ttf',
        '/alaorweb.github.io/css/style.css',
        '/alaorweb.github.io/js/vue.min.js',
        '/alaorweb.github.io/js/app.js'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function() {
      //return caches.match('/sw-test/gallery/myLittleVader.jpg');
    })
  );

});