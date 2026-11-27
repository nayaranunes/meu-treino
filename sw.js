// Guarda o app no celular para funcionar sem internet.
// Ao mudar qualquer arquivo, aumente a versão abaixo.
const CACHE = 'meu-treino-v2';
const FOTOS = { A:5, B:7, C:7, D:6 };   // quantos exercícios tem cada treino
const FILES = ['./', './index.html', './manifest.json', './icon-180.png', './icon-512.png'];
for (const [t, n] of Object.entries(FOTOS))
  for (let i = 0; i < n; i++) FILES.push(`./img/${t}${i}-0.jpg`, `./img/${t}${i}-1.jpg`);

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request))
  );
});
