this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/alaorweb.github.io/',
        '/alaorweb.github.io/index.html',
        '/alaorweb.github.io/img/favicon/favicon.ico',
        '/alaorweb.github.io/img/favicon/favicon-16x16.png',
        '/alaorweb.github.io/img/favicon/favicon-32x32.png',
        '/alaorweb.github.io/img/favicon/manifest.json',
        '/alaorweb.github.io/img/favicon/safari-pinned-tab.svg',
        '/alaorweb.github.io/img/favicon/img/favicon/apple-touch-icon.png',
        '/alaorweb.github.io/img/favicon/img/favicon/browserconfig.xml',
        '/alaorweb.github.io/img/favicon/img/favicon/mstile-150x150.png',
        '/alaorweb.github.io/fonts/open_sans/OpenSans-Regular.ttf',
        '/alaorweb.github.io/fonts/open_sans/OpenSans-Bold.ttf',
        '/alaorweb.github.io/css/styles.css',
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
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });
        
      });
    }).catch(function() {
      alert('fail');
    })
  );

});