// vite.config.ts
import react from "file:///C:/Users/dksck/postings/node_modules/@vitejs/plugin-react/dist/index.js";
import path from "path";
import { defineConfig } from "file:///C:/Users/dksck/postings/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/dksck/postings/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\dksck\\postings";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "prompt",
      injectRegister: "auto",
      pwaAssets: {
        disabled: false,
        config: true
      },
      workbox: {
        globPatterns: ["**/*"],
        maximumFileSizeToCacheInBytes: 6e6
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: ["**/*"],
      manifest: {
        name: "khusan umbrella",
        short_name: "khusan umbrella",
        start_url: "/",
        scope: "/",
        display: "standalone",
        description: "A description for your application",
        lang: "en",
        dir: "ltr",
        theme_color: "#000000",
        background_color: "#000000",
        orientation: "any",
        icons: [
          {
            src: "pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "pwa-maskable-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable"
          }
        ],
        screenshots: [
          {
            src: "screens1.png",
            sizes: "1900x1920",
            type: "image/png"
          },
          {
            src: "screens2.png",
            sizes: "1900x1920",
            type: "image/png"
          }
        ],
        prefer_related_applications: false,
        shortcuts: [
          {
            name: "The name you would like to be displayed for your shortcut",
            url: "The url you would like to open when the user chooses this shortcut. This must be a URL local to your PWA. For example: If my start_url is /, this URL must be something like /shortcut",
            description: "A description of the functionality of this shortcut"
          }
        ]
      },
      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module"
      }
    })
  ],
  base: "/",
  build: {
    outDir: "dist"
  },
  resolve: {
    alias: {
      src: "/src",
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxka3Nja1xcXFxwb3N0aW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGtzY2tcXFxccG9zdGluZ3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2Rrc2NrL3Bvc3RpbmdzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgeyBWaXRlUFdBIH0gZnJvbSAndml0ZS1wbHVnaW4tcHdhJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXHJcbiAgICAgIGluamVjdFJlZ2lzdGVyOiAnYXV0bycsXHJcbiAgICAgIHB3YUFzc2V0czoge1xyXG4gICAgICAgIGRpc2FibGVkOiBmYWxzZSxcclxuICAgICAgICBjb25maWc6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIHdvcmtib3g6IHtcclxuICAgICAgICBnbG9iUGF0dGVybnM6IFsnKiovKiddLFxyXG4gICAgICAgIG1heGltdW1GaWxlU2l6ZVRvQ2FjaGVJbkJ5dGVzOiA2MDAwMDAwXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGFkZCB0aGlzIHRvIGNhY2hlIGFsbCB0aGVcclxuICAgICAgLy8gc3RhdGljIGFzc2V0cyBpbiB0aGUgcHVibGljIGZvbGRlclxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJyoqLyonXSxcclxuICAgICAgbWFuaWZlc3Q6IHtcclxuICAgICAgICBuYW1lOiAna2h1c2FuIHVtYnJlbGxhJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAna2h1c2FuIHVtYnJlbGxhJyxcclxuICAgICAgICBzdGFydF91cmw6ICcvJyxcclxuICAgICAgICBzY29wZTogJy8nLFxyXG4gICAgICAgIGRpc3BsYXk6ICdzdGFuZGFsb25lJyxcclxuICAgICAgICBkZXNjcmlwdGlvbjogJ0EgZGVzY3JpcHRpb24gZm9yIHlvdXIgYXBwbGljYXRpb24nLFxyXG4gICAgICAgIGxhbmc6ICdlbicsXHJcbiAgICAgICAgZGlyOiAnbHRyJyxcclxuICAgICAgICB0aGVtZV9jb2xvcjogJyMwMDAwMDAnLFxyXG4gICAgICAgIGJhY2tncm91bmRfY29sb3I6ICcjMDAwMDAwJyxcclxuICAgICAgICBvcmllbnRhdGlvbjogJ2FueScsXHJcbiAgICAgICAgaWNvbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAncHdhLTE5MngxOTIucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxOTJ4MTkyJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZydcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3B3YS01MTJ4NTEyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzcmM6ICdwd2EtNTEyeDUxMi5wbmcnLFxyXG4gICAgICAgICAgICBzaXplczogJzUxMng1MTInLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgICAgcHVycG9zZTogJ2FueSdcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3B3YS1tYXNrYWJsZS01MTJ4NTEyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnNTEyeDUxMicsXHJcbiAgICAgICAgICAgIHR5cGU6ICdpbWFnZS9wbmcnLFxyXG4gICAgICAgICAgICBwdXJwb3NlOiAnbWFza2FibGUnXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgc2NyZWVuc2hvdHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc3JjOiAnc2NyZWVuczEucG5nJyxcclxuICAgICAgICAgICAgc2l6ZXM6ICcxOTAweDE5MjAnLFxyXG4gICAgICAgICAgICB0eXBlOiAnaW1hZ2UvcG5nJyxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNyYzogJ3NjcmVlbnMyLnBuZycsXHJcbiAgICAgICAgICAgIHNpemVzOiAnMTkwMHgxOTIwJyxcclxuICAgICAgICAgICAgdHlwZTogJ2ltYWdlL3BuZycsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgcHJlZmVyX3JlbGF0ZWRfYXBwbGljYXRpb25zOiBmYWxzZSxcclxuICAgICAgICBzaG9ydGN1dHM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgbmFtZTogJ1RoZSBuYW1lIHlvdSB3b3VsZCBsaWtlIHRvIGJlIGRpc3BsYXllZCBmb3IgeW91ciBzaG9ydGN1dCcsXHJcbiAgICAgICAgICAgIHVybDogJ1RoZSB1cmwgeW91IHdvdWxkIGxpa2UgdG8gb3BlbiB3aGVuIHRoZSB1c2VyIGNob29zZXMgdGhpcyBzaG9ydGN1dC4gVGhpcyBtdXN0IGJlIGEgVVJMIGxvY2FsIHRvIHlvdXIgUFdBLiBGb3IgZXhhbXBsZTogSWYgbXkgc3RhcnRfdXJsIGlzIC8sIHRoaXMgVVJMIG11c3QgYmUgc29tZXRoaW5nIGxpa2UgL3Nob3J0Y3V0JyxcclxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBIGRlc2NyaXB0aW9uIG9mIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoaXMgc2hvcnRjdXQnLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LFxyXG4gICAgICBkZXZPcHRpb25zOiB7XHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgbmF2aWdhdGVGYWxsYmFjazogJ2luZGV4Lmh0bWwnLFxyXG4gICAgICAgIHN1cHByZXNzV2FybmluZ3M6IHRydWUsXHJcbiAgICAgICAgdHlwZTogJ21vZHVsZScsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICBdLFxyXG4gIGJhc2U6ICcvJyxcclxuICBidWlsZDoge1xyXG4gICAgb3V0RGlyOiAnZGlzdCcsXHJcbiAgfSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICBzcmM6ICcvc3JjJyxcclxuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUCxPQUFPLFdBQVc7QUFDalIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUh4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsTUFDTixjQUFjO0FBQUEsTUFDZCxnQkFBZ0I7QUFBQSxNQUNoQixXQUFXO0FBQUEsUUFDVCxVQUFVO0FBQUEsUUFDVixRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1AsY0FBYyxDQUFDLE1BQU07QUFBQSxRQUNyQiwrQkFBK0I7QUFBQSxNQUNqQztBQUFBO0FBQUE7QUFBQSxNQUdBLGVBQWUsQ0FBQyxNQUFNO0FBQUEsTUFDdEIsVUFBVTtBQUFBLFFBQ1IsTUFBTTtBQUFBLFFBQ04sWUFBWTtBQUFBLFFBQ1osV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFFBQ1AsU0FBUztBQUFBLFFBQ1QsYUFBYTtBQUFBLFFBQ2IsTUFBTTtBQUFBLFFBQ04sS0FBSztBQUFBLFFBQ0wsYUFBYTtBQUFBLFFBQ2Isa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLFFBQ2IsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxVQUNBO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxPQUFPO0FBQUEsWUFDUCxNQUFNO0FBQUEsWUFDTixTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxZQUNOLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRjtBQUFBLFFBQ0EsYUFBYTtBQUFBLFVBQ1g7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE9BQU87QUFBQSxZQUNQLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsT0FBTztBQUFBLFlBQ1AsTUFBTTtBQUFBLFVBQ1I7QUFBQSxRQUNGO0FBQUEsUUFDQSw2QkFBNkI7QUFBQSxRQUM3QixXQUFXO0FBQUEsVUFDVDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sS0FBSztBQUFBLFlBQ0wsYUFBYTtBQUFBLFVBQ2Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsU0FBUztBQUFBLFFBQ1Qsa0JBQWtCO0FBQUEsUUFDbEIsa0JBQWtCO0FBQUEsUUFDbEIsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
