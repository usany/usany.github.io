// vite.config.ts
import { defineConfig } from "file:///C:/Users/dksck/mkd/postings/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/dksck/mkd/postings/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///C:/Users/dksck/mkd/postings/node_modules/vite-plugin-pwa/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\dksck\\mkd\\postings";
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
      start_url: "/",
      scope: "/",
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
  base: "/",
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      "src": "/src",
      "@": path.resolve(__vite_injected_original_dirname, "./src/src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxka3Nja1xcXFxta2RcXFxccG9zdGluZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGRrc2NrXFxcXG1rZFxcXFxwb3N0aW5nc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZGtzY2svbWtkL3Bvc3RpbmdzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIlxyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbcmVhY3QoKSwgVml0ZVBXQSh7XHJcbiAgICByZWdpc3RlclR5cGU6ICdwcm9tcHQnLFxyXG4gICAgaW5qZWN0UmVnaXN0ZXI6ICdhdXRvJyxcclxuXHJcbiAgICBwd2FBc3NldHM6IHtcclxuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxyXG4gICAgICBjb25maWc6IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIG1hbmlmZXN0OiB7XHJcbiAgICAgIG5hbWU6IFwia2h1c2FuIHVtYnJlbGxhIGFwcFwiLFxyXG4gICAgICBzaG9ydF9uYW1lOiBcImtodXNhbiB1bWJyZWxsYVwiLFxyXG4gICAgICBzdGFydF91cmw6IFwiL1wiLFxyXG4gICAgICBzY29wZTogXCIvXCIsXHJcbiAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxyXG4gICAgICBkZXNjcmlwdGlvbjogXCJBIGRlc2NyaXB0aW9uIGZvciB5b3VyIGFwcGxpY2F0aW9uXCIsXHJcbiAgICAgIGxhbmc6IFwiIFRoZSBkZWZhdWx0IGxhbmd1YWdlIG9mIHlvdXIgYXBwbGljYXRpb25cIixcclxuICAgICAgZGlyOiBcImF1dG9cIixcclxuICAgICAgdGhlbWVfY29sb3I6IFwiIzAwMDAwMFwiLFxyXG4gICAgICBiYWNrZ3JvdW5kX2NvbG9yOiBcIiMwMDAwMDBcIixcclxuICAgICAgb3JpZW50YXRpb246IFwiYW55XCIsXHJcbiAgICAgIGljb25zOiBbXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzcmNcIjogXCIuL3B3YS0xOTJ4MTkyLnBuZ1wiLFxyXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic3JjXCI6IFwiLi9wd2EtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic3JjXCI6IFwiLi9wd2EtNTEyeDUxMi5wbmdcIixcclxuICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIFwicHVycG9zZVwiOiBcImFueVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNyY1wiOiBcIi4vcHdhLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBzY3JlZW5zaG90czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic3JjXCI6IFwiaHR0cHM6Ly93d3cucHdhYnVpbGRlci5jb20vYXNzZXRzL3NjcmVlbnNob3RzL3NjcmVlbjEucG5nXCIsXHJcbiAgICAgICAgICBcInNpemVzXCI6IFwiMjg4MHgxODAwXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIHNjcmVlbnNob3Qgb2YgdGhlIGhvbWUgcGFnZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICByZWxhdGVkX2FwcGxpY2F0aW9uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwicGxhdGZvcm1cIjogXCJ3aW5kb3dzXCIsXHJcbiAgICAgICAgICBcInVybFwiOiBcIiBUaGUgVVJMIHRvIHlvdXIgYXBwIGluIHRoYXQgYXBwIHN0b3JlXCJcclxuICAgICAgICB9XHJcbiAgICAgIF0sXHJcbiAgICAgIHByZWZlcl9yZWxhdGVkX2FwcGxpY2F0aW9uczogZmFsc2UsXHJcbiAgICAgIHNob3J0Y3V0czogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwibmFtZVwiOiBcIlRoZSBuYW1lIHlvdSB3b3VsZCBsaWtlIHRvIGJlIGRpc3BsYXllZCBmb3IgeW91ciBzaG9ydGN1dFwiLFxyXG4gICAgICAgICAgXCJ1cmxcIjogXCJUaGUgdXJsIHlvdSB3b3VsZCBsaWtlIHRvIG9wZW4gd2hlbiB0aGUgdXNlciBjaG9vc2VzIHRoaXMgc2hvcnRjdXQuIFRoaXMgbXVzdCBiZSBhIFVSTCBsb2NhbCB0byB5b3VyIFBXQS4gRm9yIGV4YW1wbGU6IElmIG15IHN0YXJ0X3VybCBpcyAvLCB0aGlzIFVSTCBtdXN0IGJlIHNvbWV0aGluZyBsaWtlIC9zaG9ydGN1dFwiLFxyXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgZGVzY3JpcHRpb24gb2YgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhpcyBzaG9ydGN1dFwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdXHJcbiAgICB9LFxyXG5cclxuICAgIHdvcmtib3g6IHtcclxuICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHN2ZyxwbmcsaWNvfSddLFxyXG4gICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXHJcbiAgICAgIGNsaWVudHNDbGFpbTogdHJ1ZSxcclxuICAgIH0sXHJcblxyXG4gICAgZGV2T3B0aW9uczoge1xyXG4gICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgbmF2aWdhdGVGYWxsYmFjazogJ2luZGV4Lmh0bWwnLFxyXG4gICAgICBzdXBwcmVzc1dhcm5pbmdzOiB0cnVlLFxyXG4gICAgICB0eXBlOiAnbW9kdWxlJyxcclxuICAgIH0sXHJcbiAgfSldLFxyXG4gIGJhc2U6ICcvJyxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZGlzdCdcclxuICB9LFxyXG4gIHJlc29sdmU6IHtcclxuICAgIGFsaWFzOiB7XHJcbiAgICAgICdzcmMnOiAnL3NyYycsXHJcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3NyY1wiKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2USxTQUFTLG9CQUFvQjtBQUMxUyxPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlO0FBQ3hCLE9BQU8sVUFBVTtBQUhqQixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVE7QUFBQSxJQUN6QixjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUVoQixXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVjtBQUFBLElBRUEsVUFBVTtBQUFBLE1BQ1IsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osV0FBVztBQUFBLE1BQ1gsT0FBTztBQUFBLE1BQ1AsU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsTUFBTTtBQUFBLE1BQ04sS0FBSztBQUFBLE1BQ0wsYUFBYTtBQUFBLE1BQ2Isa0JBQWtCO0FBQUEsTUFDbEIsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLE1BQ0EsYUFBYTtBQUFBLFFBQ1g7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLHNCQUFzQjtBQUFBLFFBQ3BCO0FBQUEsVUFDRSxZQUFZO0FBQUEsVUFDWixPQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFBQSxNQUNBLDZCQUE2QjtBQUFBLE1BQzdCLFdBQVc7QUFBQSxRQUNUO0FBQUEsVUFDRSxRQUFRO0FBQUEsVUFDUixPQUFPO0FBQUEsVUFDUCxlQUFlO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBRUEsU0FBUztBQUFBLE1BQ1AsY0FBYyxDQUFDLGdDQUFnQztBQUFBLE1BQy9DLHVCQUF1QjtBQUFBLE1BQ3ZCLGNBQWM7QUFBQSxJQUNoQjtBQUFBLElBRUEsWUFBWTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsTUFDbEIsa0JBQWtCO0FBQUEsTUFDbEIsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGLENBQUMsQ0FBQztBQUFBLEVBQ0YsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLE9BQU87QUFBQSxNQUNQLEtBQUssS0FBSyxRQUFRLGtDQUFXLFdBQVc7QUFBQSxJQUMxQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=