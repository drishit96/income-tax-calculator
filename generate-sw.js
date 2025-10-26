import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get all files in public directory
function getFiles(dir, baseDir = dir) {
  let files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files = files.concat(getFiles(fullPath, baseDir));
    } else {
      // Get relative path from public directory
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, "/");
      files.push("/" + relativePath);
    }
  }

  return files;
}

// Generate service worker content
function generateServiceWorker() {
  const publicDir = path.join(__dirname, "public");
  const files = getFiles(publicDir).filter(
    (file) =>
      // Include common web assets
      /\.(html|js|css|png|jpg|jpeg|svg|json|ico)$/.test(file) &&
      // Exclude service worker files and workbox files
      !file.includes("sw.js") &&
      !file.includes("workbox-") &&
      // Exclude source maps in production
      !file.includes(".map")
  );

  // Add root path for SPA routing
  files.unshift("/");

  const swContent = `
const CACHE_NAME = 'tax-calculator-v3';
const urlsToCache = ${JSON.stringify(files, null, 2)};

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Failed to cache resources:', error);
      })
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Try to fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Don't cache non-successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response for caching
            const responseToCache = networkResponse.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.log('Network fetch failed, trying cache:', error);
            
            // For navigation requests, return the cached index.html
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            // For other requests, return a basic offline response
            return new Response('Offline - content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
`;

  const swPath = path.join(publicDir, "sw.js");
  fs.writeFileSync(swPath, swContent.trim());

  console.log(`Service worker generated at ${swPath}`);
  console.log(`Will precache ${files.length} files`);
}

generateServiceWorker();
