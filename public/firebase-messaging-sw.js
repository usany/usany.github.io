import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import staticImg from 'src/assets/umbrella512.png';
import { dbservice } from 'src/baseApi/serverbase';
const formConversation = async (data) => {
  const message = messages
  try {
    const userUid = userObj.uid
    const userName = userObj.displayName
    const messageClockNumber = Date.now()
    const messageClock = new Date().toString()
    const profileImageUrl = profile.profileImageUrl
    const otherProfileUrl = chattingUser.profileImageUrl
    const defaultProfile = profile.defaultProfile
    const otherDefaultProfile = chattingUser.defaultProfile
    let userOne
    let userTwo
    let userOneDisplayName
    let userTwoDisplayName
    let userOneProfileUrl
    let userTwoProfileUrl
    let userOneDefaultProfile
    let userTwoDefaultProfile
    let userOneProfileImage
    let userTwoProfileImage
    if (userObj.uid < chattingUser.uid) {
      userOne = userObj.uid
      userTwo = chattingUser.uid
      userOneDisplayName = userObj.displayName
      userTwoDisplayName = chattingUser.displayName
      userOneProfileUrl = profileImageUrl
      userTwoProfileUrl = otherProfileUrl
      userOneDefaultProfile = defaultProfile
      userTwoDefaultProfile = otherDefaultProfile
      userOneProfileImage = profile.profileImage
      userTwoProfileImage = chattingUser.profileImage
    } else {
      userOne = chattingUser.uid
      userTwo = userObj.uid
      userOneDisplayName = chattingUser.displayName
      userTwoDisplayName = userObj.displayName
      userOneProfileUrl = otherProfileUrl
      userTwoProfileUrl = profileImageUrl
      userOneDefaultProfile = otherDefaultProfile
      userTwoDefaultProfile = defaultProfile
      userOneProfileImage = chattingUser.profileImage
      userTwoProfileImage = profile.profileImage
    }
    if (!userOneProfileUrl) {
      const userRef = doc(dbservice, `members/${userOne}`)
      const userSnap = await getDoc(userRef)
      const userUrl = userSnap.data()?.profileImageUrl
      userOneProfileUrl = userUrl
    }
    if (!userTwoProfileUrl) {
      const userRef = doc(dbservice, `members/${userTwo}`)
      const userSnap = await getDoc(userRef)
      const userUrl = userSnap.data()?.profileImageUrl
      userTwoProfileUrl = userUrl
    }
    if (message) {
      const messageObj = {
        userUid: userUid,
        userName: userName,
        message: message,
        messageClock: messageClock,
        messageClockNumber: messageClockNumber,
        userOne: userOne,
        userTwo: userTwo,
        userOneDisplayName: userOneDisplayName,
        userTwoDisplayName: userTwoDisplayName,
        userOneProfileUrl: userOneProfileUrl,
        userTwoProfileUrl: userTwoProfileUrl,
        userOneDefaultProfile: userOneDefaultProfile,
        userTwoDefaultProfile: userTwoDefaultProfile,
        userOneProfileImage: userOneProfileImage,
        userTwoProfileImage: userTwoProfileImage
      }

      await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
      const myDocRef = doc(dbservice, `members/${userUid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myChattings = myDocSnap.data().chattings || {}
      const userDocRef = doc(dbservice, `members/${chattingUser.uid}`)
      const userDocSnap = await getDoc(userDocRef)
      const userChattings = userDocSnap.data().chattings || {}
      const userChattingsNumber = userChattings[conversation]?.messageCount || 0
      myChattings[conversation] = messageObj
      userChattings[conversation] = { ...messageObj, messageCount: userChattingsNumber + 1 }
      await updateDoc(myDocRef, {
        chattings: myChattings
      })
      await updateDoc(userDocRef, {
        chattings: userChattings
      })
    }
  } catch (error) {
    console.log(error)
  }
}

self.addEventListener('push', event => {
  console.log(event.data.json().data)
  const options = {
    body: String(event.data.json().notification.body),
    icon: event.data.json().data.body,
    badge: staticImg,
    actions: [
      {
        action: 'reply',
        type: 'text',
        title: 'send',
        placeholder: 'reply',
      },
      {
        action: 'no',
        type: 'button',
        title: 'close',
      }
    ],
    data: event.data.json().data,
    // tag: 'renotify',
    tag: event.data.json().data.title,
    renotify: true,
    requireInteraction: true,
    vibrate: [
      500, 110, 500, 110, 450, 110, 200, 110, 170, 40, 450, 110, 200, 110, 170,
      40, 500,
    ],
  };
  event.waitUntil(
    self.registration.showNotification(event.data.json().notification.title, options)
  );
});
self.addEventListener('notificationclick', (event) => {
  // clients.openWindow("https://jameshfisher.com/");
  console.log(event)
  if (event.action === 'reply') {
    if (event.reply) {
      console.log('reply')
      formConversation(event.notification.data)
    } else {
      clients.openWindow(`/piazza?id=${event.notification.tag}`);
    }
  }
  if (!event.action) {
    clients.openWindow(`/piazza?id=${event.notification.tag}`);
  }
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
