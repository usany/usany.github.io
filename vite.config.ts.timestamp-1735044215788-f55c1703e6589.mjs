// vite.config.ts
import { defineConfig } from "file:///Users/user/Desktop/posts/postings/node_modules/vite/dist/node/index.js";
import react from "file:///Users/user/Desktop/posts/postings/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { VitePWA } from "file:///Users/user/Desktop/posts/postings/node_modules/vite-plugin-pwa/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "/Users/user/Desktop/posts/postings";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdXNlci9EZXNrdG9wL3Bvc3RzL3Bvc3RpbmdzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdXNlci9EZXNrdG9wL3Bvc3RzL3Bvc3RpbmdzL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy91c2VyL0Rlc2t0b3AvcG9zdHMvcG9zdGluZ3Mvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSc7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgVml0ZVBXQSh7XG4gICAgcmVnaXN0ZXJUeXBlOiAncHJvbXB0JyxcbiAgICBpbmplY3RSZWdpc3RlcjogJ2F1dG8nLFxuXG4gICAgcHdhQXNzZXRzOiB7XG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBjb25maWc6IHRydWUsXG4gICAgfSxcblxuICAgIG1hbmlmZXN0OiB7XG4gICAgICBuYW1lOiBcImtodXNhbiB1bWJyZWxsYSBhcHBcIixcbiAgICAgIHNob3J0X25hbWU6IFwia2h1c2FuIHVtYnJlbGxhXCIsXG4gICAgICBzdGFydF91cmw6IFwiL1wiLFxuICAgICAgc2NvcGU6IFwiL1wiLFxuICAgICAgZGlzcGxheTogXCJzdGFuZGFsb25lXCIsXG4gICAgICBkZXNjcmlwdGlvbjogXCJBIGRlc2NyaXB0aW9uIGZvciB5b3VyIGFwcGxpY2F0aW9uXCIsXG4gICAgICBsYW5nOiBcIiBUaGUgZGVmYXVsdCBsYW5ndWFnZSBvZiB5b3VyIGFwcGxpY2F0aW9uXCIsXG4gICAgICBkaXI6IFwiYXV0b1wiLFxuICAgICAgdGhlbWVfY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICBvcmllbnRhdGlvbjogXCJhbnlcIixcbiAgICAgIGljb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcIi4vcHdhLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJhbnlcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCIuL3B3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwibWFza2FibGVcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogXCIuL3B3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwiLi9wd2EtNTEyeDUxMi5wbmdcIixcbiAgICAgICAgICBcInNpemVzXCI6IFwiNTEyeDUxMlwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgIFwicHVycG9zZVwiOiBcIm1hc2thYmxlXCJcbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIHNjcmVlbnNob3RzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcImh0dHBzOi8vd3d3LnB3YWJ1aWxkZXIuY29tL2Fzc2V0cy9zY3JlZW5zaG90cy9zY3JlZW4xLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCIyODgweDE4MDBcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBzY3JlZW5zaG90IG9mIHRoZSBob21lIHBhZ2VcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgcmVsYXRlZF9hcHBsaWNhdGlvbnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwicGxhdGZvcm1cIjogXCJ3aW5kb3dzXCIsXG4gICAgICAgICAgXCJ1cmxcIjogXCIgVGhlIFVSTCB0byB5b3VyIGFwcCBpbiB0aGF0IGFwcCBzdG9yZVwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBwcmVmZXJfcmVsYXRlZF9hcHBsaWNhdGlvbnM6IGZhbHNlLFxuICAgICAgc2hvcnRjdXRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcIm5hbWVcIjogXCJUaGUgbmFtZSB5b3Ugd291bGQgbGlrZSB0byBiZSBkaXNwbGF5ZWQgZm9yIHlvdXIgc2hvcnRjdXRcIixcbiAgICAgICAgICBcInVybFwiOiBcIlRoZSB1cmwgeW91IHdvdWxkIGxpa2UgdG8gb3BlbiB3aGVuIHRoZSB1c2VyIGNob29zZXMgdGhpcyBzaG9ydGN1dC4gVGhpcyBtdXN0IGJlIGEgVVJMIGxvY2FsIHRvIHlvdXIgUFdBLiBGb3IgZXhhbXBsZTogSWYgbXkgc3RhcnRfdXJsIGlzIC8sIHRoaXMgVVJMIG11c3QgYmUgc29tZXRoaW5nIGxpa2UgL3Nob3J0Y3V0XCIsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgZGVzY3JpcHRpb24gb2YgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhpcyBzaG9ydGN1dFwiXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuXG4gICAgd29ya2JveDoge1xuICAgICAgZ2xvYlBhdHRlcm5zOiBbJyoqLyoue2pzLGNzcyxodG1sLHN2ZyxwbmcsaWNvfSddLFxuICAgICAgY2xlYW51cE91dGRhdGVkQ2FjaGVzOiB0cnVlLFxuICAgICAgY2xpZW50c0NsYWltOiB0cnVlLFxuICAgIH0sXG5cbiAgICBkZXZPcHRpb25zOiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIG5hdmlnYXRlRmFsbGJhY2s6ICdpbmRleC5odG1sJyxcbiAgICAgIHN1cHByZXNzV2FybmluZ3M6IHRydWUsXG4gICAgICB0eXBlOiAnbW9kdWxlJyxcbiAgICB9LFxuICB9KV0sXG4gIGJhc2U6ICcvJyxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6ICdkaXN0J1xuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdzcmMnOiAnL3NyYycsXG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdSLFNBQVMsb0JBQW9CO0FBQ3JULE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxVQUFVO0FBSGpCLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsUUFBUTtBQUFBLElBQ3pCLGNBQWM7QUFBQSxJQUNkLGdCQUFnQjtBQUFBLElBRWhCLFdBQVc7QUFBQSxNQUNULFVBQVU7QUFBQSxNQUNWLFFBQVE7QUFBQSxJQUNWO0FBQUEsSUFFQSxVQUFVO0FBQUEsTUFDUixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsTUFDWCxPQUFPO0FBQUEsTUFDUCxTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixrQkFBa0I7QUFBQSxNQUNsQixhQUFhO0FBQUEsTUFDYixPQUFPO0FBQUEsUUFDTDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxNQUNGO0FBQUEsTUFDQSxhQUFhO0FBQUEsUUFDWDtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsZUFBZTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLE1BQ0Esc0JBQXNCO0FBQUEsUUFDcEI7QUFBQSxVQUNFLFlBQVk7QUFBQSxVQUNaLE9BQU87QUFBQSxRQUNUO0FBQUEsTUFDRjtBQUFBLE1BQ0EsNkJBQTZCO0FBQUEsTUFDN0IsV0FBVztBQUFBLFFBQ1Q7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsTUFDL0MsdUJBQXVCO0FBQUEsTUFDdkIsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFFQSxZQUFZO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDRixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsS0FBSyxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
