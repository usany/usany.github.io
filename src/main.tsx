import React from 'react'
import ReactDOM from 'react-dom/client'
import App from 'src/App.tsx'
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/postings/firebase-messaging-sw.js')
      .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch((error) => {
          console.error('Service Worker registration failed:', error);
      });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
