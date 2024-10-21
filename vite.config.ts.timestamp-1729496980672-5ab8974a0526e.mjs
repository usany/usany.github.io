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
      "src": "/src"
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxka3Nja1xcXFxta2RcXFxccG9zdGluZ3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXGRrc2NrXFxcXG1rZFxcXFxwb3N0aW5nc1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvZGtzY2svbWtkL3Bvc3RpbmdzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0Eoe1xyXG4gICAgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcclxuICAgIGluamVjdFJlZ2lzdGVyOiAnYXV0bycsXHJcblxyXG4gICAgcHdhQXNzZXRzOiB7XHJcbiAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgY29uZmlnOiB0cnVlLFxyXG4gICAgfSxcclxuXHJcbiAgICBtYW5pZmVzdDoge1xyXG4gICAgICBuYW1lOiBcImtodXNhbiB1bWJyZWxsYSBhcHBcIixcclxuICAgICAgc2hvcnRfbmFtZTogXCJraHVzYW4gdW1icmVsbGFcIixcclxuICAgICAgc3RhcnRfdXJsOiBcIi9cIixcclxuICAgICAgc2NvcGU6IFwiL1wiLFxyXG4gICAgICBkaXNwbGF5OiBcInN0YW5kYWxvbmVcIixcclxuICAgICAgZGVzY3JpcHRpb246IFwiQSBkZXNjcmlwdGlvbiBmb3IgeW91ciBhcHBsaWNhdGlvblwiLFxyXG4gICAgICBsYW5nOiBcIiBUaGUgZGVmYXVsdCBsYW5ndWFnZSBvZiB5b3VyIGFwcGxpY2F0aW9uXCIsXHJcbiAgICAgIGRpcjogXCJhdXRvXCIsXHJcbiAgICAgIHRoZW1lX2NvbG9yOiBcIiMwMDAwMDBcIixcclxuICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMDAwMDAwXCIsXHJcbiAgICAgIG9yaWVudGF0aW9uOiBcImFueVwiLFxyXG4gICAgICBpY29uczogW1xyXG4gICAgICAgIHtcclxuICAgICAgICAgIFwic3JjXCI6IFwiLi9wd2EtMTkyeDE5Mi5wbmdcIixcclxuICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXHJcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcclxuICAgICAgICAgIFwicHVycG9zZVwiOiBcImFueVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNyY1wiOiBcIi4vcHdhLTE5MngxOTIucG5nXCIsXHJcbiAgICAgICAgICBcInNpemVzXCI6IFwiMTkyeDE5MlwiLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXHJcbiAgICAgICAgfSxcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNyY1wiOiBcIi4vcHdhLTUxMng1MTIucG5nXCIsXHJcbiAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJhbnlcIlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgXCJzcmNcIjogXCIuL3B3YS01MTJ4NTEyLnBuZ1wiLFxyXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcclxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxyXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwibWFza2FibGVcIlxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgc2NyZWVuc2hvdHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInNyY1wiOiBcImh0dHBzOi8vd3d3LnB3YWJ1aWxkZXIuY29tL2Fzc2V0cy9zY3JlZW5zaG90cy9zY3JlZW4xLnBuZ1wiLFxyXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjI4ODB4MTgwMFwiLFxyXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXHJcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzY3JlZW5zaG90IG9mIHRoZSBob21lIHBhZ2VcIlxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgcmVsYXRlZF9hcHBsaWNhdGlvbnM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcInBsYXRmb3JtXCI6IFwid2luZG93c1wiLFxyXG4gICAgICAgICAgXCJ1cmxcIjogXCIgVGhlIFVSTCB0byB5b3VyIGFwcCBpbiB0aGF0IGFwcCBzdG9yZVwiXHJcbiAgICAgICAgfVxyXG4gICAgICBdLFxyXG4gICAgICBwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnM6IGZhbHNlLFxyXG4gICAgICBzaG9ydGN1dHM6IFtcclxuICAgICAgICB7XHJcbiAgICAgICAgICBcIm5hbWVcIjogXCJUaGUgbmFtZSB5b3Ugd291bGQgbGlrZSB0byBiZSBkaXNwbGF5ZWQgZm9yIHlvdXIgc2hvcnRjdXRcIixcclxuICAgICAgICAgIFwidXJsXCI6IFwiVGhlIHVybCB5b3Ugd291bGQgbGlrZSB0byBvcGVuIHdoZW4gdGhlIHVzZXIgY2hvb3NlcyB0aGlzIHNob3J0Y3V0LiBUaGlzIG11c3QgYmUgYSBVUkwgbG9jYWwgdG8geW91ciBQV0EuIEZvciBleGFtcGxlOiBJZiBteSBzdGFydF91cmwgaXMgLywgdGhpcyBVUkwgbXVzdCBiZSBzb21ldGhpbmcgbGlrZSAvc2hvcnRjdXRcIixcclxuICAgICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIGRlc2NyaXB0aW9uIG9mIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoaXMgc2hvcnRjdXRcIlxyXG4gICAgICAgIH1cclxuICAgICAgXVxyXG4gICAgfSxcclxuXHJcbiAgICB3b3JrYm94OiB7XHJcbiAgICAgIGdsb2JQYXR0ZXJuczogWycqKi8qLntqcyxjc3MsaHRtbCxzdmcscG5nLGljb30nXSxcclxuICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlLFxyXG4gICAgICBjbGllbnRzQ2xhaW06IHRydWUsXHJcbiAgICB9LFxyXG5cclxuICAgIGRldk9wdGlvbnM6IHtcclxuICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIG5hdmlnYXRlRmFsbGJhY2s6ICdpbmRleC5odG1sJyxcclxuICAgICAgc3VwcHJlc3NXYXJuaW5nczogdHJ1ZSxcclxuICAgICAgdHlwZTogJ21vZHVsZScsXHJcbiAgICB9LFxyXG4gIH0pXSxcclxuICBiYXNlOiAnLycsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2Rpc3QnXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnc3JjJzogJy9zcmMnLFxyXG4gICAgfSxcclxuICB9LFxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZRLFNBQVMsb0JBQW9CO0FBQzFTLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFHeEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxRQUFRO0FBQUEsSUFDekIsY0FBYztBQUFBLElBQ2QsZ0JBQWdCO0FBQUEsSUFFaEIsV0FBVztBQUFBLE1BQ1QsVUFBVTtBQUFBLE1BQ1YsUUFBUTtBQUFBLElBQ1Y7QUFBQSxJQUVBLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNYO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixlQUFlO0FBQUEsUUFDakI7QUFBQSxNQUNGO0FBQUEsTUFDQSxzQkFBc0I7QUFBQSxRQUNwQjtBQUFBLFVBQ0UsWUFBWTtBQUFBLFVBQ1osT0FBTztBQUFBLFFBQ1Q7QUFBQSxNQUNGO0FBQUEsTUFDQSw2QkFBNkI7QUFBQSxNQUM3QixXQUFXO0FBQUEsUUFDVDtBQUFBLFVBQ0UsUUFBUTtBQUFBLFVBQ1IsT0FBTztBQUFBLFVBQ1AsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLGNBQWMsQ0FBQyxnQ0FBZ0M7QUFBQSxNQUMvQyx1QkFBdUI7QUFBQSxNQUN2QixjQUFjO0FBQUEsSUFDaEI7QUFBQSxJQUVBLFlBQVk7QUFBQSxNQUNWLFNBQVM7QUFBQSxNQUNULGtCQUFrQjtBQUFBLE1BQ2xCLGtCQUFrQjtBQUFBLE1BQ2xCLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDLENBQUM7QUFBQSxFQUNGLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxPQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
