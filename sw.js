if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>i(s,r),t={module:{uri:r},exports:u,require:o};e[r]=Promise.all(n.map((s=>t[s]||o(s)))).then((s=>(l(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.clientsClaim(),s.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"10b5f88323fdad31bf50c90668d3e84a"},{url:"assets/browser-D6kYqczj.js",revision:null},{url:"assets/Btn-C19Eudsd.js",revision:null},{url:"assets/Chip-DI7dv0Y9.js",revision:null},{url:"assets/Comment-Bx2WVIWz.js",revision:null},{url:"assets/Contact-Bt8u4x-t.js",revision:null},{url:"assets/DialogContent-BoQekaX7.js",revision:null},{url:"assets/Home-B1Ze7UFy.css",revision:null},{url:"assets/Home-DI1JYCk2.js",revision:null},{url:"assets/IconButton-DuJy7jNS.js",revision:null},{url:"assets/index-BOJJ1VLF.js",revision:null},{url:"assets/index-DrtULrws.css",revision:null},{url:"assets/PageTitle-DzRBg5_P.js",revision:null},{url:"assets/Piazza-Dz1GWc2T.js",revision:null},{url:"assets/Piazza-fqSDJQE9.css",revision:null},{url:"assets/Profile-DL0QwjL8.js",revision:null},{url:"assets/pwa-512x512-C4NidD9c.png",revision:null},{url:"assets/Ranking-CGU8LfWh.js",revision:null},{url:"assets/Specific-CZmahJ8W.js",revision:null},{url:"assets/Stepper-DH44S4Ly.js",revision:null},{url:"assets/TextField-I08IKqgg.js",revision:null},{url:"assets/use-immer.module-BleKvgef.js",revision:null},{url:"assets/webSocket-DsZ5h7On.js",revision:null},{url:"favicon.ico",revision:"89099cfae0775e3e086613bca3190493"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"firebase-messaging-sw.js",revision:"8fb2cda628190b9fd8bb7f47ba8039a2"},{url:"index.html",revision:"564f3ca522bf17727ca78f41f318c57e"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"pwa-64x64.png",revision:"e364fbdd8a3dde0c6167972af41c9dbf"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"c4bb11dfa44209a2184d761f7efb1401"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
