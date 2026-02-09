const CACHE = "ocr-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/camera.js",
  "./js/opencv.js",
  "./js/filters.js",
  "./js/ocr.js",
  "./js/pdf.js",
  "./js/storage.js",
  "./js/theme.js"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});

self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
