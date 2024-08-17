// vite.config.ts
import { defineConfig } from "file:///C:/Users/dksck/mkd/postings/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/dksck/mkd/postings/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/dksck/mkd/postings/node_modules/vite-plugin-pwa/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA({
    registerType: "prompt",
    injectRegister: "auto",
    pwaAssets: {
      disabled: false,
      config: true
    },
    manifest: {
      name: "khusan umbrella app",
      short_name: "khusan umbrella",
      start_url: "/postings/",
      scope: "/postings/",
      display: "standalone",
      description: "A description for your application",
      lang: " The default language of your application",
      dir: "auto",
      theme_color: "#000000",
      background_color: "#000000",
      orientation: "any",
      icons: [
        {
          "src": "./pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "./pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "./pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "./pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      screenshots: [
        {
          "src": "https://www.pwabuilder.com/assets/screenshots/screen1.png",
          "sizes": "2880x1800",
          "type": "image/png",
          "description": "A screenshot of the home page"
        }
      ],
      related_applications: [
        {
          "platform": "windows",
          "url": " The URL to your app in that app store"
        }
      ],
      prefer_related_applications: false,
      shortcuts: [
        {
          "name": "The name you would like to be displayed for your shortcut",
          "url": "The url you would like to open when the user chooses this shortcut. This must be a URL local to your PWA. For example: If my start_url is /, this URL must be something like /shortcut",
          "description": "A description of the functionality of this shortcut"
        }
      ]
    },
    workbox: {
      globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
      cleanupOutdatedCaches: true,
      clientsClaim: true
    },
    devOptions: {
      enabled: false,
      navigateFallback: "index.html",
      suppressWarnings: true,
      type: "module"
    }
  })],
  base: "/postings/",
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "src": "/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxka3Nja1xcXFxta2RcXFxccG9zdGluZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGRrc2NrXFxcXG1rZFxcXFxwb3N0aW5nc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZGtzY2svbWtkL3Bvc3RpbmdzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXG4gICAgaW5qZWN0UmVnaXN0ZXI6ICdhdXRvJyxcblxuICAgIHB3YUFzc2V0czoge1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgY29uZmlnOiB0cnVlLFxuICAgIH0sXG5cbiAgICBtYW5pZmVzdDoge1xuICAgICAgbmFtZTogXCJraHVzYW4gdW1icmVsbGEgYXBwXCIsXG4gICAgICBzaG9ydF9uYW1lOiBcImtodXNhbiB1bWJyZWxsYVwiLFxuICAgICAgc3RhcnRfdXJsOiBcIi9wb3N0aW5ncy9cIixcbiAgICAgIHNjb3BlOiBcIi9wb3N0aW5ncy9cIixcbiAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiQSBkZXNjcmlwdGlvbiBmb3IgeW91ciBhcHBsaWNhdGlvblwiLFxuICAgICAgbGFuZzogXCIgVGhlIGRlZmF1bHQgbGFuZ3VhZ2Ugb2YgeW91ciBhcHBsaWNhdGlvblwiLFxuICAgICAgZGlyOiBcImF1dG9cIixcbiAgICAgIHRoZW1lX2NvbG9yOiBcIiMwMDAwMDBcIixcbiAgICAgIGJhY2tncm91bmRfY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgb3JpZW50YXRpb246IFwiYW55XCIsXG4gICAgICBpY29uczogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCIuL3B3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwiLi9wd2EtMTkyeDE5Mi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwiLi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIFwicHVycG9zZVwiOiBcImFueVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcIi4vcHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBzY3JlZW5zaG90czogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCJodHRwczovL3d3dy5wd2FidWlsZGVyLmNvbS9hc3NldHMvc2NyZWVuc2hvdHMvc2NyZWVuMS5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiMjg4MHgxODAwXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgc2NyZWVuc2hvdCBvZiB0aGUgaG9tZSBwYWdlXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHJlbGF0ZWRfYXBwbGljYXRpb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInBsYXRmb3JtXCI6IFwid2luZG93c1wiLFxuICAgICAgICAgIFwidXJsXCI6IFwiIFRoZSBVUkwgdG8geW91ciBhcHAgaW4gdGhhdCBhcHAgc3RvcmVcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgcHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zOiBmYWxzZSxcbiAgICAgIHNob3J0Y3V0czogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJuYW1lXCI6IFwiVGhlIG5hbWUgeW91IHdvdWxkIGxpa2UgdG8gYmUgZGlzcGxheWVkIGZvciB5b3VyIHNob3J0Y3V0XCIsXG4gICAgICAgICAgXCJ1cmxcIjogXCJUaGUgdXJsIHlvdSB3b3VsZCBsaWtlIHRvIG9wZW4gd2hlbiB0aGUgdXNlciBjaG9vc2VzIHRoaXMgc2hvcnRjdXQuIFRoaXMgbXVzdCBiZSBhIFVSTCBsb2NhbCB0byB5b3VyIFBXQS4gRm9yIGV4YW1wbGU6IElmIG15IHN0YXJ0X3VybCBpcyAvLCB0aGlzIFVSTCBtdXN0IGJlIHNvbWV0aGluZyBsaWtlIC9zaG9ydGN1dFwiLFxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIGRlc2NyaXB0aW9uIG9mIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoaXMgc2hvcnRjdXRcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcblxuICAgIHdvcmtib3g6IHtcbiAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxzdmcscG5nLGljb30nXSxcbiAgICAgIGNsZWFudXBPdXRkYXRlZENhY2hlczogdHJ1ZSxcbiAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcbiAgICB9LFxuXG4gICAgZGV2T3B0aW9uczoge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICBuYXZpZ2F0ZUZhbGxiYWNrOiAnaW5kZXguaHRtbCcsXG4gICAgICBzdXBwcmVzc1dhcm5pbmdzOiB0cnVlLFxuICAgICAgdHlwZTogJ21vZHVsZScsXG4gICAgfSxcbiAgfSldLFxuICBiYXNlOiAnL3Bvc3RpbmdzLycsXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiAnZGlzdCdcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnc3JjJzogJy9zcmMnLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2USxTQUFTLG9CQUFvQjtBQUMxUyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBR3hCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUTtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBRWhCLFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFFQSxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixrQkFBa0I7QUFBQSxNQUNsQixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxhQUFhO0FBQUEsUUFDWDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLE1BQ0Esc0JBQXNCO0FBQUEsUUFDcEI7QUFBQSxVQUNFLFlBQVk7QUFBQSxVQUNaLE9BQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLE1BQ0EsNkJBQTZCO0FBQUEsTUFDN0IsV0FBVztBQUFBLFFBQ1Q7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsTUFDL0MsdUJBQXVCO0FBQUEsTUFDdkIsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFFQSxZQUFZO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDRixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
