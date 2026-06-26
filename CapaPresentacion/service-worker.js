const CACHE_NAME = 'mitienda-cache-v5';

// 1. Archivos locales estáticos a cachear (Ajustado a WebAdmin)
const urlsToCache = [
    // Páginas principales
    '/Login.aspx',
    '/Inicio.aspx',
    '/PageBuscador.aspx',
    '/BuscadorGrande.aspx',

    // Iconos e Imágenes
    '/assets/images/favicon.ico',
    '/assets/images/mitienda.png',
    '/assets/images/minegocio.jpg',

    // Estilos CSS (Tus rutas exactas)
    '/assets/css/bootstrap.min.css',
    '/assets/css/icons.css',
    '/assets/css/style.css',
    '/assets/css/miestilo.css',

    // Plugins CSS
    '/assets/plugins/bootstrap-sweetalert/sweet-alert.css',
    '/assets/pluginzero/toastr/toastr.min.css',
    '/assets/pluginzero/select2/select2.min.css',
    '/assets/plugins/datatables/jquery.dataTables.min.css',
    '/assets/plugins/datatables/responsive.bootstrap.min.css',
    '/assets/plugins/datatables/dataTables.bootstrap4.min.css',

    // Scripts JS (Asegúrate de poner las rutas correctas donde los tengas)
    '/assets/js/jquery.min.js',        // Ajusta el nombre si es diferente
    '/assets/js/popper.min.js',        // Ajusta el nombre si es diferente
    '/assets/js/bootstrap.min.js',        // Ajusta el nombre si es diferente
    '/assets/js/modernizr.min.js',     // Ajusta el nombre si es diferente
    '/assets/js/detect.js',
    '/assets/js/fastclick.js',
    '/assets/js/jquery.slimscroll.js',
    '/assets/js/jquery.blockUI.js',
    '/assets/js/waves.js',
    '/assets/js/wow.min.js',
    '/assets/js/jquery.nicescroll.js',
    '/assets/js/jquery.scrollTo.min.js',
    '/assets/pluginzero/toastr/toastr.min.js',
    '/assets/plugins/bootstrap-sweetalert/sweet-alert.min.js',
    '/assets/plugins/loadingoverlay/loadingoverlay.js',
    '/assets/js/app.js',
    '/js/Masterpa.js',
    '/assets/pluginzero/select2/select2.min.js',
    '/assets/pluginzero/select2/es.min.js',
    '/assets/plugins/datatables/jquery.dataTables.min.js',
    '/assets/plugins/datatables/dataTables.bootstrap4.min.js',
    '/assets/plugins/datatables/dataTables.responsive.min.js',
    '/assets/plugins/datatables/responsive.bootstrap4.min.js',
    '/js/Login.js',
    '/js/PageBuscador.js',
    '/js/BuscadorGrande.js'
];

// Instalar y cachear recursos locales base
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache abierta');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {

    // 1. IGNORAR EXTENSIONES DE CHROME Y SCHEMAS NO SOPORTADOS
    if (!(event.request.url.startsWith('http'))) {
        return;
    }

    // 1. IGNORAR PETICIONES POST (Muy importante para tus WebMethods en C#)
    if (event.request.method === 'POST') {
        return;
    }

    // 2. PARA ARCHIVOS HTML / ASPX (Estrategia: Network First)
    // Va al servidor por la versión más nueva. Si no hay internet, muestra la guardada.
    if (event.request.headers.get('accept').includes('text/html')) {
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(event.request);
            })
        );
        return;
    }

    // 3. PARA RECURSOS ESTÁTICOS (CSS, JS, Imágenes, CDNs) (Estrategia: Cache First)
    // Busca en caché. Si no está, va a internet, lo descarga y lo guarda en caché para la próxima.
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse; // Retorna desde caché súper rápido
            }

            // Si no está en caché, lo busca en internet
            return fetch(event.request).then(networkResponse => {
                // Verificamos que sea una respuesta válida
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic' && networkResponse.type !== 'cors') {
                    return networkResponse;
                }

                // Clonamos la respuesta para guardarla en caché (las peticiones solo se pueden leer una vez)
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            });
        })
    );
});

// Actualizar el Service Worker y limpiar caché antigua
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Borrando caché antigua:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});