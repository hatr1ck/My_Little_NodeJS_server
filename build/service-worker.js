"use strict";var precacheConfig=[["/index.html","408d55195955e39640ddbfe232f83f1d"],["/static/css/main.8d428ff5.css","2d70141b7284940e5f44ec8f4554c086"],["/static/js/main.a81bdd06.js","f265a86122eb5ceef74f89300ea7813f"],["/static/media/Boostrap.06596577.svg","06596577ae4143d9d51e2184310e23dd"],["/static/media/Css.d503588d.svg","d503588dc2be79084fb270bd801a5c55"],["/static/media/Home.9145436f.svg","9145436f319bac9ae30a3e2aad1c5170"],["/static/media/Illustrator.8670d30b.svg","8670d30bb8fe5afcbbb63f845a6582de"],["/static/media/JavaScript.dd60b11e.svg","dd60b11e9762b6e25f6d4ce981a1eeae"],["/static/media/Node.89ccb090.svg","89ccb09060a7adf788ea2340c54d6d78"],["/static/media/React-icon.05a3e30f.svg","05a3e30fdf60ebe9d00cf4725d44bd42"],["/static/media/aqua1.d7722aaf.svg","d7722aaf7cbd18a6021ed7e894267bd5"],["/static/media/ballLogo.6d6069b2.svg","6d6069b28fc613b3b500a844d53c504b"],["/static/media/html5.48cbcc78.svg","48cbcc78fd26b271a636cad390d33577"],["/static/media/if.87b2e48b.svg","87b2e48be9aba788ab8062408b319924"],["/static/media/kill.28f32a25.png","28f32a2521ed013b0466b21159e5cc29"],["/static/media/loading.a6bd9e28.svg","a6bd9e28b8b75ff000f5f67c21e4f38d"],["/static/media/login.beae7b75.scss","beae7b751c91726cb3264461b70e8ccc"],["/static/media/mongodb.52783a2f.svg","52783a2f8043e237279093badadc9cf1"],["/static/media/redux.85772647.svg","85772647236e76b8e772c14c092a28ac"],["/static/media/spin.b2795b58.png","b2795b58079489013ba7d79d4628de05"],["/static/media/todo.397587b9.png","397587b96277e4541d374237c4456321"],["/static/media/todo.959fab5c.svg","959fab5cd3c3ef9e80b17f3fd08e7480"],["/static/media/trash.e7598c40.svg","e7598c405a1a591ff1d56fe0cc24a3ff"],["/static/media/weather.7533491c.png","7533491c27327ff3875105603c991aee"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),c.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),c=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(n){return setOfCachedUrls(n).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return n.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),n="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),e=urlsToCacheKeys.has(a));var c="/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});