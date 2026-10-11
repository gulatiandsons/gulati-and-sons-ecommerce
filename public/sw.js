// GULATI & SONS - Progressive Web App Service Worker
// Version: gulati-pwa-v1.0.1

const CACHE_NAME = 'gulati-sons-cache-v1';
const OFFLINE_URL = '/offline';

const PRECACHE_ASSETS = [
  '/',
  '/offline',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon.svg',
  '/manifest.json'
];

// Sensitive routes that must NEVER be stored in persistent client offline cache
const NETWORK_ONLY_PATTERNS = [
  /^\/admin(\/.*)?$/,
  /^\/checkout(\/.*)?$/,
  /^\/cart(\/.*)?$/,
  /^\/account(\/.*)?$/,
  /^\/api(\/.*)?$/,
  /razorpay/,
  /firebase/
];

// Install: Pre-cache core shell & offline fallback
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate: Clean up old versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Route-aware caching strategy
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Ignore non-GET requests (e.g. POST orders)
  if (event.request.method !== 'GET') {
    return;
  }

  // Network-Only for sensitive, authenticated or payment routes
  if (NETWORK_ONLY_PATTERNS.some((pattern) => pattern.test(url.pathname) || pattern.test(url.href))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Static Assets (_next/static, fonts, icons, images): Cache-first with Stale-While-Revalidate
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname.match(/\.(png|jpg|jpeg|webp|avif|svg|woff2|woff|css|js)$/)
  ) {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => null);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // Navigation requests for public storefront pages: Network-First with Offline Fallback
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // If valid response, update cache for offline reuse
          if (response && response.status === 200) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          const offlinePage = await caches.match(OFFLINE_URL);
          return offlinePage || new Response('Offline - Please reconnect to access Gulati & Sons', {
            headers: { 'Content-Type': 'text/html' }
          });
        })
    );
    return;
  }

  // Default: Network with Cache fallback
  event.respondWith(
    caches.match(event.request).then((cached) => {
      return cached || fetch(event.request).catch(() => null);
    })
  );
});
