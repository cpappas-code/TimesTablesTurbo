const CACHE_NAME = 'times-table-turbo-v3'; // Increment version if you change assets
// Define the files to cache
const urlsToCache = [
    '.', // This caches the index.html at the root
    'index.html', // Explicitly cache index.html
    'manifest.json', // Cache the manifest file
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap',
    'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_hmAPXCRwY.woff2' // A common font file
];

// Install event: Fires when the service worker is first installed
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Fetch event: Fires every time the app requests a resource (like a file or image)
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response from cache
                if (response) {
                    return response;
                }
                // Not in cache - fetch from network
                return fetch(event.request);
            }
        )
    );
});

// Activate event: Fires when the service worker is activated (e.g., after an update)
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    // Delete old caches if the name doesn't match the current one
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


