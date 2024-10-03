// import { initializeApp } from "firebase/app";
// import { getMessaging } from "firebase/messaging/sw";
// importScripts('https://cdn.engagespot.co/serviceWorkerv2.js');
// importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/8.0.0/firebase-messaging.js");
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.10.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: 'api-key',
//   authDomain: 'project-id.firebaseapp.com',
//   databaseURL: 'https://project-id.firebaseio.com',
//   projectId: 'project-id',
//   storageBucket: 'project-id.appspot.com',
//   messagingSenderId: 'sender-id',
//   appId: 'app-id',
//   measurementId: 'G-measurement-id',
// });
const firebaseConfig = {
  apiKey: "AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc",
  authDomain: "remake-36fe0.firebaseapp.com",
  projectId: "remake-36fe0",
  storageBucket: "remake-36fe0.appspot.com",
  messagingSenderId: "206737336631",
  appId: "1:206737336631:web:55648c3ea182e23c3052b2",
  databaseURL: "https://remake-36fe0-default-rtdb.asia-southeast1.firebasedatabase.app",
};
const app = firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  // Customize notification here
});

// messaging.getToken(messaging, {vapidKey: "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE"}).then((currentToken) => {
//   if (currentToken) {
//       new Notification('Notification permission granted.');
//   } else {
//     console.log('No registration token available. Request permission to generate one.');
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
// });



// const messages = firebase.getToken(messaging, {vapidKey: "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE"}).then((currentToken) => {
//   if (currentToken) {
//       new Notification('Notification permission granted.');
//   } else {
//     console.log('No registration token available. Request permission to generate one.');
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
// });
// getToken(messaging, {vapidKey: "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE"}).then((currentToken) => {
//   if (currentToken) {
//       new Notification('Notification permission granted.');
//   } else {
//     console.log('No registration token available. Request permission to generate one.');
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
// });

// getToken(messaging, {vapidKey: "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE"}).then((currentToken) => {
//   if (currentToken) {
//       new Notification('Notification permission granted.');
//   } else {
//     console.log('No registration token available. Request permission to generate one.');
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
// });
// const messagess = firebase.onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
// });

