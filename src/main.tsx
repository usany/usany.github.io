import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { APIProvider } from '@vis.gl/react-google-maps'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from 'src/App.tsx'
import Lotties from 'src/lottiesAnimation/Lotties'
import { store } from 'src/store'
// import './i18n'
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://48a865f92cf9a300f5b31bb22d8a65ab@o4510585916882944.ingest.us.sentry.io/4510585944670208",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../public/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope)
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error)
    })
}
if (typeof window !== 'undefined') { // Check if we're running in the browser.
  const mq = window.matchMedia('(prefers-color-scheme: dark)')
  if (!localStorage.getItem('theme')) {
    if (mq.matches) {
      document.documentElement.classList.add('dark')
    }
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <APIProvider
      apiKey={import.meta.env.VITE_MAPS_PLATFORM}
      onLoad={() => console.log('Maps API has loaded.')}
    >
      <Provider store={store}>
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  suspense: true,
                  // notifyOnChangeProps: 'all',
                },
              },
            })
          }
        >
          <Suspense fallback={<Lotties />}>
            <App />
          </Suspense>
        </QueryClientProvider>
      </Provider>
    </APIProvider>
  </React.StrictMode>,
)
