
self.addEventListener('push', event => {
  console.log(event.data.json())
  const options = {
    body: String(event.data.json().notification.body),
    icon: '/path/to/your/icon.png',
    tag: 'renotify',
    renotify: true,
    // Replace with your icon path
  };
  event.waitUntil(
    self.registration.showNotification('USANY', options)
  );
});
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  clients.openWindow("https://jameshfisher.com/");
})


// import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();
// self.addEventListener('push', event => {
//   onBackgroundMessage(messaging, (payload) => {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
// Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
//       icon: '/firebase-logo.png'
//     };
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };
//   event.waitUntil(
//     self.registration.showNotification(notificationTitle, notificationOptions)
//   );
// })
