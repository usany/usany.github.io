if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const o=s=>i(s,r),a={module:{uri:r},exports:u,require:o};e[r]=Promise.all(n.map((s=>a[s]||o(s)))).then((s=>(l(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.clientsClaim(),s.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"10b5f88323fdad31bf50c90668d3e84a"},{url:"assets/accordion-CQkp-Vsx.js",revision:null},{url:"assets/blue-01-D6yWzHp0.png",revision:null},{url:"assets/blue-KHwCo12t.png",revision:null},{url:"assets/Card-CZtenXEw.js",revision:null},{url:"assets/Contact-2mBTgq70.js",revision:null},{url:"assets/drawer-B6n07QM0.js",revision:null},{url:"assets/DrawersBar-DJlXxunX.js",revision:null},{url:"assets/Home-C6TnkmrR.js",revision:null},{url:"assets/Home-DF2kRo3l.css",revision:null},{url:"assets/index-B4-gfvnK.css",revision:null},{url:"assets/index-CDqdRATH.js",revision:null},{url:"assets/index-ZsZT7NV9.js",revision:null},{url:"assets/Lists-dUL5-B0t.js",revision:null},{url:"assets/PageTitle-BB5lYMpa.js",revision:null},{url:"assets/Piazza-BzyZ_OVo.js",revision:null},{url:"assets/Profile-D9zk-283.js",revision:null},{url:"assets/pwa-512x512-C4NidD9c.png",revision:null},{url:"assets/Ranking-BKTC_4JF.js",revision:null},{url:"assets/screen-01-bAw0YGqe.png",revision:null},{url:"assets/TextField-qGuG_Yr4.js",revision:null},{url:"assets/use-immer.module-DaDgiz1d.js",revision:null},{url:"favicon.ico",revision:"89099cfae0775e3e086613bca3190493"},{url:"favicon.svg",revision:"71dcfd191507c31dc79efe3341dfa3b9"},{url:"firebase-messaging-sw.js",revision:"8fb2cda628190b9fd8bb7f47ba8039a2"},{url:"index.html",revision:"a50fc261fc14d3532f1409d636dd4423"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"pwa-64x64.png",revision:"3cce535eec4a1c5ce2a2c060fc6323ab"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"c4bb11dfa44209a2184d761f7efb1401"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
