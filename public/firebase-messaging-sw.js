// import staticImg from 'src/assets/umbrella512.png';
// import { dbservice } from 'src/baseApi/serverbase';
// const formConversation = async (notification) => {
//   const message = notification.body
//   try {
//     const userUid = notification.data.sendingUid
//     const userName = notification.data.sendingDisplayName
//     const chattingUid = notification.data.receivingUid
//     const chattingName = notification.data.receivingDisplayName
//     const messageClockNumber = Date.now()
//     const messageClock = new Date().toString()
//     const profileImageUrl = notification.icon
//     const otherProfileUrl = notification.icon
//     const defaultProfile = notification.icon
//     const otherDefaultProfile = notification.icon
//     const conversation = notification.tag
//     let userOne
//     let userTwo
//     let userOneDisplayName
//     let userTwoDisplayName
//     let userOneProfileUrl
//     let userTwoProfileUrl
//     let userOneDefaultProfile
//     let userTwoDefaultProfile
//     let userOneProfileImage
//     let userTwoProfileImage
//     if (userUid < chattingUid) {
//       userOne = userUid
//       userTwo = chattingUid
//       userOneDisplayName = userName
//       userTwoDisplayName = chattingName
//       userOneProfileUrl = profileImageUrl
//       userTwoProfileUrl = otherProfileUrl
//       userOneDefaultProfile = defaultProfile
//       userTwoDefaultProfile = otherDefaultProfile
//       userOneProfileImage = true
//       userTwoProfileImage = false
//     } else {
//       userOne = chattingUid
//       userTwo = userUid
//       userOneDisplayName = chattingName
//       userTwoDisplayName = userName
//       userOneProfileUrl = otherProfileUrl
//       userTwoProfileUrl = profileImageUrl
//       userOneDefaultProfile = otherDefaultProfile
//       userTwoDefaultProfile = defaultProfile
//       userOneProfileImage = false
//       userTwoProfileImage = true
//     }
//     if (!userOneProfileUrl) {
//       const userRef = doc(dbservice, `members/${userOne}`)
//       const userSnap = await getDoc(userRef)
//       const userUrl = userSnap.data()?.profileImageUrl
//       userOneProfileUrl = userUrl
//     }
//     if (!userTwoProfileUrl) {
//       const userRef = doc(dbservice, `members/${userTwo}`)
//       const userSnap = await getDoc(userRef)
//       const userUrl = userSnap.data()?.profileImageUrl
//       userTwoProfileUrl = userUrl
//     }
//     if (message) {
//       const messageObj = {
//         userUid: userUid,
//         userName: userName,
//         message: message,
//         messageClock: messageClock,
//         messageClockNumber: messageClockNumber,
//         userOne: userOne,
//         userTwo: userTwo,
//         userOneDisplayName: userOneDisplayName,
//         userTwoDisplayName: userTwoDisplayName,
//         userOneProfileUrl: userOneProfileUrl,
//         userTwoProfileUrl: userTwoProfileUrl,
//         userOneDefaultProfile: userOneDefaultProfile,
//         userTwoDefaultProfile: userTwoDefaultProfile,
//         userOneProfileImage: userOneProfileImage,
//         userTwoProfileImage: userTwoProfileImage
//       }

//       await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
//       const myDocRef = doc(dbservice, `members/${userUid}`)
//       const myDocSnap = await getDoc(myDocRef)
//       const myChattings = myDocSnap.data().chattings || {}
//       const userDocRef = doc(dbservice, `members/${chattingUid}`)
//       const userDocSnap = await getDoc(userDocRef)
//       const userChattings = userDocSnap.data().chattings || {}
//       const userChattingsNumber = userChattings[conversation]?.messageCount || 0
//       myChattings[conversation] = messageObj
//       userChattings[conversation] = { ...messageObj, messageCount: userChattingsNumber + 1 }
//       await updateDoc(myDocRef, {
//         chattings: myChattings
//       })
//       await updateDoc(userDocRef, {
//         chattings: userChattings
//       })
//     }
//     console.log(notification)
//   } catch (error) {
//     console.log(error)
//   }
// }
self.addEventListener('notificationclick', (event) => {
  // clients.openWindow("https://jameshfisher.com/");
  console.log(event)
  if (event.notification.data.type === 'piazza') {
    if (event.reply) {
      console.log('reply')
      // formConversation(event.notification)
    } else {
      clients.openWindow(`/piazza?id=${event.notification.data.title}`)
    }
  }
  if (!event.action) {
    clients.openWindow(`/piazza?id=${event.notification.tag}`)
  }
  event.notification.close()
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
