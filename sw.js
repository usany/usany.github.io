if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let u={};const o=e=>n(e,r),t={module:{uri:r},exports:u,require:o};s[r]=Promise.all(i.map((e=>t[e]||o(e)))).then((e=>(l(...e),u)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon-180x180.png",revision:"a27d7b61a0241052f736ebe81718c101"},{url:"assets/blue-KHwCo12t.png",revision:null},{url:"assets/blue01-Do--JCdT.png",revision:null},{url:"assets/blue02-Dk5ywwf6.png",revision:null},{url:"assets/blue03-9UtR25wx.png",revision:null},{url:"assets/Contact-CPYx4f55.js",revision:null},{url:"assets/gold1-B_M3XIPZ.png",revision:null},{url:"assets/gold2-BJTn-hjN.png",revision:null},{url:"assets/Home-B41szZyY.js",revision:null},{url:"assets/index-tEy3g2OF.css",revision:null},{url:"assets/Lists-C7BIhcWR.js",revision:null},{url:"assets/Piazza-DauRM993.js",revision:null},{url:"assets/Profile-CkVgrOnT.js",revision:null},{url:"assets/pwa-512x512-C4NidD9c.png",revision:null},{url:"assets/Ranking-BZHuTtSr.js",revision:null},{url:"assets/red1-CUPCruBk.png",revision:null},{url:"assets/red2-C7ntTfwY.png",revision:null},{url:"favicon.ico",revision:"89099cfae0775e3e086613bca3190493"},{url:"favicon.svg",revision:"c23dbc3fa77f506cdd8118e146fe5f3b"},{url:"firebase-messaging-sw.js",revision:"a1a0fff29e6e28574b40551a443217e3"},{url:"index.html",revision:"ea913294f9fc990694f71380467fc4ec"},{url:"maskable-icon-512x512.png",revision:"126c55dc030a58db716758479c41c570"},{url:"pwa-192x192.png",revision:"14a23cc23a2f5a3157ac52e78135346c"},{url:"pwa-512x512.png",revision:"5a051418936d2f633fc164f78b1662e1"},{url:"pwa-64x64.png",revision:"f35ebe1d2519c34b44344b0135c4f1a1"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"manifest.webmanifest",revision:"c4bb11dfa44209a2184d761f7efb1401"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
