import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'], // pode trocar por seus ícones
      manifest: {
        name: "OftalmoApp",
        short_name: "Oftalmo",
        description: "Aplicativo de apoio à triagem oftalmológica",
        theme_color: "#0a4da3",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icone.jpg",
            sizes: "192x192",
            type: "image/jpeg"
          },
          {
            src: "/icone.jpg",
            sizes: "512x512",
            type: "image/jpeg"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/data/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'json-cache',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 dias
              },
            },
          },
        ],
      },
    }),
  ],
})
