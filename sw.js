if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let o={};const u=s=>i(s,r),a={module:{uri:r},exports:o,require:u};e[r]=Promise.all(n.map((s=>a[s]||u(s)))).then((s=>(l(...s),o)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.clientsClaim(),s.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"a27d7b61a0241052f736ebe81718c101"},{url:"assets/browser-B_aONxI9.js",revision:null},{url:"assets/Btn-OA7l403g.js",revision:null},{url:"assets/Chip-ChzMqYfg.js",revision:null},{url:"assets/Comment-S6YNMiF5.js",revision:null},{url:"assets/Contact-3mBlIECF.js",revision:null},{url:"assets/Home-B1Ze7UFy.css",revision:null},{url:"assets/Home-ZKZZTb0S.js",revision:null},{url:"assets/IconButton-CtRcV0C9.js",revision:null},{url:"assets/index-DmmIGfxw.js",revision:null},{url:"assets/index-XDtRVDFo.css",revision:null},{url:"assets/Piazza-DhvBTZP6.js",revision:null},{url:"assets/Piazza-fqSDJQE9.css",revision:null},{url:"assets/Profile-C6xCci8r.js",revision:null},{url:"assets/pwa-512x512-C4NidD9c.png",revision:null},{url:"assets/Ranking-D7YxVmxE.js",revision:null},{url:"assets/Specific-D-3bCLTC.js",revision:null},{url:"assets/Stepper-BCNfzyHI.js",revision:null},{url:"assets/TextField-hezUy-KH.js",revision:null},{url:"assets/use-immer.module-BxP4bNhO.js",revision:null},{url:"favicon.ico",revision:"89099cfae0775e3e086613bca3190493"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"firebase-messaging-sw.js",revision:"a1a0fff29e6e28574b40551a443217e3"},{url:"index.html",revision:"fc401e258e78d6581c7a16449a55a6c0"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"pwa-64x64.png",revision:"f35ebe1d2519c34b44344b0135c4f1a1"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"c4bb11dfa44209a2184d761f7efb1401"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
