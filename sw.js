
self.addEventListener('install', e => {
  let timeStamp = Date.now();
  e.waitUntil(
    caches.open('TurtleAlarm').then(cache => {
      return cache.addAll([
        `/`,
        `/index.html?timestamp=${timeStamp}`,
        `/css/style.css?timestamp=${timeStamp}`,
        `/images/Arriving-24th2.png?timestamp=${timeStamp}`,
        `/images/Turtle-ANimation4.gif?timestamp=${timeStamp}`,
        `/images/turtle_logo.svg?timestamp=${timeStamp}`
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});

