import React from "react";
import ReactDOM from "react-dom/client";
import App from "src/App.tsx";
import { store } from "src/store";
import { Provider } from "react-redux";
import { useState, useEffect, useRef, Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Lotties from "src/lottiesAnimation/Lotties";
import { APIProvider } from "@vis.gl/react-google-maps";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/firebase-messaging-sw.js")
    .then((registration) => {
      console.log("Service Worker registered with scope:", registration.scope);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <APIProvider
      apiKey={import.meta.env.VITE_MAPS_PLATFORM}
      onLoad={() => console.log("Maps API has loaded.")}
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
  </React.StrictMode>
);
