import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App.tsx'
import { store } from 'src/store'
import { Provider } from 'react-redux'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
          console.error('Service Worker registration failed:', error);
      });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
