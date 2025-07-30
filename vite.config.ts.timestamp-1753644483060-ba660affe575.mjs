// vite.config.ts
import react from "file:///C:/Users/dksck/postings/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import { defineConfig } from "file:///C:/Users/dksck/postings/node_modules/vite/dist/node/index.js";
import { VitePWA } from "file:///C:/Users/dksck/postings/node_modules/vite-plugin-pwa/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\dksck\\postings";
var vite_config_default = defineConfig({
  plugins: [react(), VitePWA({
    registerType: "prompt",
    injectRegister: "auto",
    pwaAssets: {
      disabled: false,
      config: true
    },
    includeAssets: [
      "pwa-192x192.png",
      "pwa-512x512.png",
      "screen-01.png",
      "screen.png",
      "screens1.png",
      "screens2.png"
    ],
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
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any"
        },
        {
          "src": "pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable"
        }
      ],
      screenshots: [
        {
          "src": "screens1.png",
          "sizes": "1900x1920",
          "type": "image/png"
        },
        {
          "src": "screens2.png",
          "sizes": "1900x1920",
          "type": "image/png"
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
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxka3Nja1xcXFxwb3N0aW5nc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZGtzY2tcXFxccG9zdGluZ3NcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2Rrc2NrL3Bvc3RpbmdzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IFZpdGVQV0EgfSBmcm9tICd2aXRlLXBsdWdpbi1wd2EnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIFZpdGVQV0Eoe1xuICAgIHJlZ2lzdGVyVHlwZTogJ3Byb21wdCcsXG4gICAgaW5qZWN0UmVnaXN0ZXI6ICdhdXRvJyxcblxuICAgIHB3YUFzc2V0czoge1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgY29uZmlnOiB0cnVlLFxuICAgIH0sXG4gICAgaW5jbHVkZUFzc2V0czogW1xuICAgICAgJ3B3YS0xOTJ4MTkyLnBuZycsXG4gICAgICAncHdhLTUxMng1MTIucG5nJyxcbiAgICAgICdzY3JlZW4tMDEucG5nJyxcbiAgICAgICdzY3JlZW4ucG5nJyxcbiAgICAgICdzY3JlZW5zMS5wbmcnLFxuICAgICAgJ3NjcmVlbnMyLnBuZydcbiAgICBdLFxuXG4gICAgbWFuaWZlc3Q6IHtcbiAgICAgIG5hbWU6IFwia2h1c2FuIHVtYnJlbGxhXCIsXG4gICAgICBzaG9ydF9uYW1lOiBcImtodXNhbiB1bWJyZWxsYVwiLFxuICAgICAgc3RhcnRfdXJsOiBcIi9cIixcbiAgICAgIHNjb3BlOiBcIi9cIixcbiAgICAgIGRpc3BsYXk6IFwic3RhbmRhbG9uZVwiLFxuICAgICAgZGVzY3JpcHRpb246IFwiQSBkZXNjcmlwdGlvbiBmb3IgeW91ciBhcHBsaWNhdGlvblwiLFxuICAgICAgbGFuZzogXCJlblwiLFxuICAgICAgZGlyOiBcImx0clwiLFxuICAgICAgdGhlbWVfY29sb3I6IFwiIzAwMDAwMFwiLFxuICAgICAgYmFja2dyb3VuZF9jb2xvcjogXCIjMDAwMDAwXCIsXG4gICAgICBvcmllbnRhdGlvbjogXCJhbnlcIixcbiAgICAgIGljb25zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcInB3YS0xOTJ4MTkyLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCIxOTJ4MTkyXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwicHdhLTE5MngxOTIucG5nXCIsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjE5MngxOTJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBcInNyY1wiOiBcInB3YS01MTJ4NTEyLnBuZ1wiLFxuICAgICAgICAgIFwic2l6ZXNcIjogXCI1MTJ4NTEyXCIsXG4gICAgICAgICAgXCJ0eXBlXCI6IFwiaW1hZ2UvcG5nXCIsXG4gICAgICAgICAgXCJwdXJwb3NlXCI6IFwiYW55XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIFwic3JjXCI6IFwicHdhLTUxMng1MTIucG5nXCIsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjUxMng1MTJcIixcbiAgICAgICAgICBcInR5cGVcIjogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICBcInB1cnBvc2VcIjogXCJtYXNrYWJsZVwiXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICBzY3JlZW5zaG90czogW1xuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogJ3NjcmVlbnMxLnBuZycsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjE5MDB4MTkyMFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgXCJzcmNcIjogJ3NjcmVlbnMyLnBuZycsXG4gICAgICAgICAgXCJzaXplc1wiOiBcIjE5MDB4MTkyMFwiLFxuICAgICAgICAgIFwidHlwZVwiOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHByZWZlcl9yZWxhdGVkX2FwcGxpY2F0aW9uczogZmFsc2UsXG4gICAgICBzaG9ydGN1dHM6IFtcbiAgICAgICAge1xuICAgICAgICAgIFwibmFtZVwiOiBcIlRoZSBuYW1lIHlvdSB3b3VsZCBsaWtlIHRvIGJlIGRpc3BsYXllZCBmb3IgeW91ciBzaG9ydGN1dFwiLFxuICAgICAgICAgIFwidXJsXCI6IFwiVGhlIHVybCB5b3Ugd291bGQgbGlrZSB0byBvcGVuIHdoZW4gdGhlIHVzZXIgY2hvb3NlcyB0aGlzIHNob3J0Y3V0LiBUaGlzIG11c3QgYmUgYSBVUkwgbG9jYWwgdG8geW91ciBQV0EuIEZvciBleGFtcGxlOiBJZiBteSBzdGFydF91cmwgaXMgLywgdGhpcyBVUkwgbXVzdCBiZSBzb21ldGhpbmcgbGlrZSAvc2hvcnRjdXRcIixcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBkZXNjcmlwdGlvbiBvZiB0aGUgZnVuY3Rpb25hbGl0eSBvZiB0aGlzIHNob3J0Y3V0XCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH0sXG5cbiAgICB3b3JrYm94OiB7XG4gICAgICBnbG9iUGF0dGVybnM6IFsnKiovKi57anMsY3NzLGh0bWwsc3ZnLHBuZyxpY299J10sXG4gICAgICBjbGVhbnVwT3V0ZGF0ZWRDYWNoZXM6IHRydWUsXG4gICAgICBjbGllbnRzQ2xhaW06IHRydWUsXG4gICAgfSxcblxuICAgIGRldk9wdGlvbnM6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbmF2aWdhdGVGYWxsYmFjazogJ2luZGV4Lmh0bWwnLFxuICAgICAgc3VwcHJlc3NXYXJuaW5nczogdHJ1ZSxcbiAgICAgIHR5cGU6ICdtb2R1bGUnLFxuICAgIH0sXG4gIH0pXSxcbiAgYmFzZTogJy8nLFxuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ3NyYyc6ICcvc3JjJyxcbiAgICAgIFwiQFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxuICAgIH0sXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErUCxPQUFPLFdBQVc7QUFDalIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsZUFBZTtBQUh4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLFFBQVE7QUFBQSxJQUN6QixjQUFjO0FBQUEsSUFDZCxnQkFBZ0I7QUFBQSxJQUVoQixXQUFXO0FBQUEsTUFDVCxVQUFVO0FBQUEsTUFDVixRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsZUFBZTtBQUFBLE1BQ2I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxJQUVBLFVBQVU7QUFBQSxNQUNSLE1BQU07QUFBQSxNQUNOLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxNQUNMLGFBQWE7QUFBQSxNQUNiLGtCQUFrQjtBQUFBLE1BQ2xCLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxVQUNSLFdBQVc7QUFBQSxRQUNiO0FBQUEsUUFDQTtBQUFBLFVBQ0UsT0FBTztBQUFBLFVBQ1AsU0FBUztBQUFBLFVBQ1QsUUFBUTtBQUFBLFVBQ1IsV0FBVztBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsVUFDUixXQUFXO0FBQUEsUUFDYjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLGFBQWE7QUFBQSxRQUNYO0FBQUEsVUFDRSxPQUFPO0FBQUEsVUFDUCxTQUFTO0FBQUEsVUFDVCxRQUFRO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLFNBQVM7QUFBQSxVQUNULFFBQVE7QUFBQSxRQUNWO0FBQUEsTUFDRjtBQUFBLE1BQ0EsNkJBQTZCO0FBQUEsTUFDN0IsV0FBVztBQUFBLFFBQ1Q7QUFBQSxVQUNFLFFBQVE7QUFBQSxVQUNSLE9BQU87QUFBQSxVQUNQLGVBQWU7QUFBQSxRQUNqQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFFQSxTQUFTO0FBQUEsTUFDUCxjQUFjLENBQUMsZ0NBQWdDO0FBQUEsTUFDL0MsdUJBQXVCO0FBQUEsTUFDdkIsY0FBYztBQUFBLElBQ2hCO0FBQUEsSUFFQSxZQUFZO0FBQUEsTUFDVixTQUFTO0FBQUEsTUFDVCxrQkFBa0I7QUFBQSxNQUNsQixrQkFBa0I7QUFBQSxNQUNsQixNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0YsQ0FBQyxDQUFDO0FBQUEsRUFDRixNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsSUFDTCxRQUFRO0FBQUEsRUFDVjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
