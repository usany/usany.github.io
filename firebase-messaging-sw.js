
self.addEventListener('push', event => {
  console.log(event.data.json())
  const options = {
    body: String(event.data.json().notification.body),
    icon: '/path/to/your/icon.png',
    badge: '/path/to/your/icon.png',
    actions: [
      {
        action: 'yes',
        type: 'button',
        title: 'yes'
      },
      {
        action: 'no',
        type: 'text',
        title: 'no',
        placeholder: 'Type your explanation here',
      }
    ],
    tag: 'renotify',
    renotify: true,
    vibrate: [
      500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
      40, 500,
    ],
  };
  event.waitUntil(
    self.registration.showNotification('USANY', options)
  );
});
self.addEventListener('notificationclick', (event) => {
  // clients.openWindow("https://jameshfisher.com/");
  clients.openWindow("/");
  event.notification.close();
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
