self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open("spectrejs")
            .then(cache => {
                return cache.addAll([location.origin]);
            })
            .catch(console.error)
    );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return fetch(event.request).then((response) => {
        let responseClone = response.clone();
        caches.open('cache').then((cache) => {
          cache.put(event.request, responseClone);
        });

        return response;
      }).catch(() => {
        return resp || new Response("not found",{status:404})});
      })
    )})