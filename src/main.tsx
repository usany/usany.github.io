import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { APIProvider } from '@vis.gl/react-google-maps'
import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from 'src/App.tsx'
import Lotties from 'src/lottiesAnimation/Lotties'
import { store } from 'src/store'

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

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <div id='mute' onClick={handleMuteClick}>mute</div>
    <div id='stream' onClick={handleStreamClick}>turn stream off</div> */}
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
