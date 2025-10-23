import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
      const relativePath = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      files.push('/' + relativePath);
    }
  }
  
  return files;
}

// Generate service worker content
function generateServiceWorker() {
  const publicDir = path.join(__dirname, 'public');
  const files = getFiles(publicDir)
    .filter(file => 
      // Include common web assets
      /\.(html|js|css|png|jpg|jpeg|svg|json|ico)$/.test(file) &&
      // Exclude service worker files
      !file.includes('sw.js') &&
      !file.includes('workbox-')
    );

  const swContent = `
const CACHE_NAME = 'tax-calculator-v1';
const urlsToCache = ${JSON.stringify(files, null, 2)};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
`;

  const swPath = path.join(publicDir, 'sw.js');
  fs.writeFileSync(swPath, swContent.trim());
  
  console.log(`Service worker generated at ${swPath}`);
  console.log(`Will precache ${files.length} files`);
}

generateServiceWorker();