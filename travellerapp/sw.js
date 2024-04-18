const STATIC_CACHE ="static-v4"


self.addEventListener("install",function(event){
    console.log("installed",event)
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            cache.addAll([
                "js/jquery-3.5.1.min.js",
                "js/script.js",
                "images/logo.svg",
                "images/search.svg",
                "/",
                "/index.html",
                "/manifest.json",
                "css/style.css",
                "/fonts/product_sans_bold-webfont.woff2",
                "/fonts/product_sans_bold-webfont.woff",
                "/fonts/product_sans_regular-webfont.woff2",
                "/fonts/product_sans_regular-webfont.woff",
                "https://traveller.talrop.works/api/v1/places/categories/",
                "https://traveller.talrop.works/api/v1/places/"
                ]
            )
        })
    );
});
self.addEventListener("activate",function(event){
    console.log("activated",event)
    event.waitUntil(
        caches.keys().then((keyList)=>{
            return Promise.all(
                keyList.map((key)=>{
                    if(key !== STATIC_CACHE){
                        return caches.delete(key);
                    }
                })
            )
        })
    )
    return self.clients.claim();
})
self.addEventListener("fetch",function(event){
    
    event.respondWith(
        caches.match(event.request).then((response)=>{
            if(response){
                return response
            }
            else {
                return fetch(event.request)
            }
        })
    );
});