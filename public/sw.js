if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>n(e,t),u={module:{uri:t},exports:i,require:r};s[t]=Promise.all(a.map((e=>u[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Flat-YAREdev.svg",revision:"c9df1de0c529a08b4dd1940d672107d4"},{url:"/YAREdev.svg",revision:"301e97e81c36b54204e107e1c10a2fee"},{url:"/_next/app-build-manifest.json",revision:"693669a3bd595151b5c306f41397fd6c"},{url:"/_next/static/Dc8RuFG1jC_3gAan9QWDt/_buildManifest.js",revision:"2ec694eb52ae4f523f265a46bae4d768"},{url:"/_next/static/Dc8RuFG1jC_3gAan9QWDt/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0e5ce63c-1f800c158f0759b1.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/138-fbe3d7cc78379318.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/209-d09b2c700908c766.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/23-a909665650fcdd0c.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/281-6c84a2420f939ffd.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/35.03ae917f238a8966.js",revision:"03ae917f238a8966"},{url:"/_next/static/chunks/395-863abae85fd90805.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/457-72ac3248bbd54a6e.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/471-7be092df29793cd1.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/650-9b93abe5b4007678.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/673-31c4799b1c010a7b.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/685-21ad1e41c3032a71.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/733-e8313af9f2d75007.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/749-6ce9d592c4b8232a.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/770-33922fa963360088.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/784-217f7959228abdd4.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/786-3a2c373f1069ea31.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/927-19ae40380880ef8b.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/940-e8f974398d6a891e.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/959-45b2391a6a24611a.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/_not-found/page-4bda15f24b94a991.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/auth/auth-code-error/page-1eb56f09a0304960.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/auth/login/page-35f973fa923d11f7.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/exc/commands/page-c9408797df222623.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/exc/devices/page-09175d78ce554b06.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/exc/history/page-c46bc73ea5afb68c.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/exc/layout-92402223f4e8d430.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/exc/page-566f8c0596d29b73.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/layout-5e7e75c240e0ba73.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/app/page-e511f752f3e3a85f.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/fd9d1056-7802ff0212fc44b1.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/main-64abf3484466b03e.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/main-app-55ae1f12ce0a2a36.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-c55e8b684a9688c0.js",revision:"Dc8RuFG1jC_3gAan9QWDt"},{url:"/_next/static/css/e180f58aeadd61c3.css",revision:"e180f58aeadd61c3"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/background_noisy.51233270.webp",revision:"51233270"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/android-chrome-192x192.png",revision:"0403b71a7d39737f93d8db975c44202a"},{url:"/android-chrome-512x512.png",revision:"eb55d14c747a4a857cab0e494799c86a"},{url:"/apple-touch-icon.png",revision:"32f73bc381aabe6adc063676d621a108"},{url:"/assets/img/Lines.webp",revision:"ba4c74102aa5fa9e86fbae6c350fea4a"},{url:"/assets/img/background_noisy.webp",revision:"1bc5931177af375fff36f4e98fc7b86a"},{url:"/favicon-16x16.png",revision:"fd6ab73b48e6fc5d8be0210e6b44bd67"},{url:"/favicon-32x32.png",revision:"b500b5e0b0552160fe8c766f6eac89d3"},{url:"/icon-192x192.png",revision:"a8ec4d1706abb6080c2109d27aed1185"},{url:"/icon-256x256.png",revision:"0c3a14d962e190b27cd6ed34cfeec153"},{url:"/icon-384x384.png",revision:"571f6ef0c9fd3194d5f8474ea4dfff2f"},{url:"/icon-512x512.png",revision:"73d3556e3ae32d6833d77f37201c4b74"},{url:"/manifest.json",revision:"20d025beb82f65db9689dfd76ad5d570"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
