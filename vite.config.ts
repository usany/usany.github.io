import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: 'auto',

    pwaAssets: {
      disabled: false,
      config: true,
    },
    includeAssets: [
      'pwa-192x192.png',
      'pwa-512x512.png',
      'screen-01.png',
      'screen.png',
      'screens1.png',
      'screens2.png'
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
          "src": 'screens1.png',
          "sizes": "1900x1920",
          "type": "image/png",
        },
        {
          "src": 'screens2.png',
          "sizes": "1900x1920",
          "type": "image/png",
        },
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
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  base: '/',
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      'src': '/src',
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
