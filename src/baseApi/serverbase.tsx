import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, OAuthProvider, signInWithPopup, TwitterAuthProvider, updateProfile } from "firebase/auth";
import { collection, getDoc, getDocs, getFirestore, query, updateDoc } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { doc, setDoc } from 'firebase/firestore';
import setDocUser from "src/pages/core/setDocUser";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};
// const firebaseConfig = {
//     apiKey: "AIzaSyD-0xUYIBvDoz5trhrLRCDZZE0kON3qUSc",
//     authDomain: "howling-e1ed9.firebaseapp.com",
//     projectId: "howling-e1ed9",
//     storageBucket: "howling-e1ed9.appspot.com",
//     messagingSenderId: "160882064839",
//     appId: "1:160882064839:web:9409cc44a01176ffcc6de2"
// };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbservice = getFirestore(app);
// const storage = getStorage(app, 'gs://remake-36fe0.appspot.com');
const storage = getStorage(app);
const messaging = getMessaging(app);
// const providerMicrosoft = new OAuthProvider('microsoft.com');
// providerMicrosoft.setCustomParameters({
//     prompt: "consent",
//     tenant: "723e1730-9623-4a7c-a8ee-b616ecd5e89f",
//     login_hint: 'user@firstadd.onmicrosoft.com',
//     redirect_uri: 'https://remake-36fe0.firebaseapp.com/__/auth/handler'
// })

const onSocialClick = (event) => {
  const {
    target: { name },
  } = event;
  // let provider
  // if (name === 'g') {
  // } else {
  //   provider = new GithubAuthProvider();
  // }
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then(async (result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result)
      // let credential
      // if (name === 'g') {
      // } else {
      //   credential = GithubAuthProvider.credentialFromResult(result)
      // }
      const uid = result.user.uid
      console.log(result.user)
      console.log(result)
      // const credential = OAuthProvider.credentialFromResult(result);
      // const accessToken = credential.accessToken;
      // const idToken = credential.idToken;
      const docRef = doc(dbservice, `members/${uid}`)
      const docSnap = await getDoc(docRef)
      const docsRef = query(collection(dbservice, "members"));
      const docs = await getDocs(docsRef);
      const docsLength = docs.docs.length;
      const userData = docSnap.data()
      if (!userData) {
        await setDoc(doc(dbservice, 'members', `${uid}`), {
          // uid: result.user.uid,
          // displayName: result.user.email,
          // points: 0,
          // profileImage: null,
          // profileImageUrl: null,
          // followers: [],
          // followings: [],
          // messagingToken: null,
          // ranking: docsLength,
          // createdCards: [],
          // connectedCards: [],
          // profileColor: "#2196f3",
          // followerNum: 0,
          // followingNum: 0,
          // locationConfirmed: false,
        })
        const user = doc(dbservice, `members/${uid}`);
        const storageRef = ref(storage, uid);
        uploadString(storageRef, "null", "raw").then((snapshot) => {
          console.log("Uploaded a blob or file!");
        });
        getDownloadURL(storageRef)
          .then(async (url) => {
            await updateDoc(user, { profileImageUrl: url });
          })
          .catch((error) => {
            console.log(error);
          });

        let profileImage
        let profileColor
        const profileImageNumber = Math.random()
        const profileColorNumber = Math.random()
        if (profileColorNumber < 1 / 3) {
          profileColor = 'profileRed'
        } else if (profileImageNumber < 2 / 3) {
          profileColor = 'profileBlue'
        } else {
          profileColor = 'profileGold'
        }
        if (profileImageNumber < 0.5) {
          profileImage = 'animal'
        } else {
          profileImage = 'plant'
        }
        const reference = ref(storage, `${profileImage}${profileColor}.png`);
        console.log(reference)
        getDownloadURL(reference).then((url) => {
          console.log(url)
          updateDoc(docRef, { profileImage: false, profileColor: profileColor, defaultProfile: url });
        })
      }
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log('result ' + result)
      console.log('user ' + user.email)
      console.log('user ' + user.uid)
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      let credential
      if (name === 'g') {
        credential = GoogleAuthProvider.credentialFromError(error);
      } else {
        credential = GithubAuthProvider.credentialFromError(error);
      }
      // ...
    });
}
const onSocialClickGoogle = () => {
  const providerGoogle = new GoogleAuthProvider();
  const emails = providerGoogle.addScope('https://www.googleapis.com/auth/contacts.readonly');
  console.log(emails)
  signInWithPopup(auth, providerGoogle.addScope('email')).then(async (result) => {
    // result.user.updateProfile({
    //   displayName: result.user.email
    // })

    const uid = result.user.uid
    const email = result.user.email
    console.log(result)
    console.log(result.user)
    // const credential = OAuthProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;
    // const idToken = credential.idToken;
    const docRef = doc(dbservice, `members/${uid}`)
    const docSnap = await getDoc(docRef)
    const userData = docSnap.data()
    const docsRef = query(collection(dbservice, "members"));
    const docs = await getDocs(docsRef);
    const docsLength = docs.docs.length;
    if (!userData) {
      const auth = getAuth();
      if (auth.currentUser) {
        updateProfile(auth.currentUser, {
          displayName: result.user.email,
        }).then(() => {
          // Profile updated!
          // ...
        }).catch((error) => {
          // An error occurred
          // ...
        });
      }
      // await setDoc(doc(dbservice, 'members', `${uid}`), {
      //   uid: result.user.uid,
      //   displayName: result.user.email,
      //   points: 0,
      //   profileImage: null,
      //   profileImageUrl: null,
      //   followers: [],
      //   followings: [],
      //   messagingToken: null,
      //   ranking: docsLength,
      //   createdCards: [],
      //   connectedCards: [],
      //   profileColor: "#2196f3",
      //   followerNum: 0,
      //   followingNum: 0,
      //   locationConfirmed: false,
      //   defaultProfile: ''
      // })
      setDocUser({ uid: uid, email: email })
      await updateProfile(result.user, {
        displayName: result.user.email,
      }).catch((error) => {
        console.log("error");
      });
      const user = doc(dbservice, `members/${uid}`);
      const storageRef = ref(storage, uid);
      uploadString(storageRef, "null", "raw").then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      getDownloadURL(storageRef)
        .then(async (url) => {
          await updateDoc(user, { profileImageUrl: url });
        })
        .catch((error) => {
          console.log(error);
        });
      let profileImage
      let profileColor
      const profileImageNumber = Math.random()
      const profileColorNumber = Math.random()
      if (profileColorNumber < 1 / 3) {
        profileColor = 'profileRed'
      } else if (profileImageNumber < 2 / 3) {
        profileColor = 'profileBlue'
      } else {
        profileColor = 'profileGold'
      }
      if (profileImageNumber < 0.5) {
        profileImage = 'animal'
      } else {
        profileImage = 'plant'
      }
      const reference = ref(storage, `${profileImage}${profileColor}.png`);
      console.log(reference)
      getDownloadURL(reference).then((url) => {
        console.log(url)
        updateDoc(docRef, { profileImage: false, profileColor: profileColor, defaultProfile: url });
      })
    }
  }).catch((error) => {
    console.log(error)
  })
}
const onSocialClickMicrosoft = () => {
  const providerMicrosoft = new OAuthProvider('microsoft.com');
  signInWithPopup(auth, providerMicrosoft).then(async (result) => {
    const uid = result.user.uid
    const email = result.user.email
    console.log(result.user)
    // const credential = OAuthProvider.credentialFromResult(result);
    // const accessToken = credential.accessToken;
    // const idToken = credential.idToken;
    const docRef = doc(dbservice, `members/${uid}`)
    const docSnap = await getDoc(docRef)
    const userData = docSnap.data()
    const docsRef = query(collection(dbservice, "members"));
    const docs = await getDocs(docsRef);
    const docsLength = docs.docs.length;
    if (!userData) {
      // await setDoc(doc(dbservice, 'members', `${uid}`), {
      //   uid: result.user.uid,
      //   displayName: result.user.email,
      //   points: 0,
      //   profileImage: null,
      //   profileImageUrl: null,
      //   followers: [],
      //   followings: [],
      //   messagingToken: null,
      //   ranking: docsLength,
      //   createdCards: [],
      //   connectedCards: [],
      //   profileColor: "#2196f3",
      //   followerNum: 0,
      //   followingNum: 0,
      //   locationConfirmed: false,
      //   defaultProfile: ''
      // })
      setDocUser({ uid: uid, email: email })
      await updateProfile(result.user, {
        displayName: result.user.email,
      }).catch((error) => {
        console.log("error");
      });
      const user = doc(dbservice, `members/${uid}`);
      const storageRef = ref(storage, uid);
      uploadString(storageRef, "null", "raw").then((snapshot) => {
        console.log("Uploaded a blob or file!");
      });
      getDownloadURL(storageRef)
        .then(async (url) => {
          await updateDoc(user, { profileImageUrl: url });
        })
        .catch((error) => {
          console.log(error);
        });
      let profileImage
      let profileColor
      const profileImageNumber = Math.random()
      const profileColorNumber = Math.random()
      if (profileColorNumber < 1 / 3) {
        profileColor = 'profileRed'
      } else if (profileImageNumber < 2 / 3) {
        profileColor = 'profileBlue'
      } else {
        profileColor = 'profileGold'
      }
      if (profileImageNumber < 0.5) {
        profileImage = 'animal'
      } else {
        profileImage = 'plant'
      }
      const reference = ref(storage, `${profileImage}${profileColor}.png`);
      console.log(reference)
      getDownloadURL(reference).then((url) => {
        console.log(url)
        updateDoc(docRef, { profileImage: false, profileColor: profileColor, defaultProfile: url });
      })
    }
  }).catch((error) => {
    console.log(error)
  })
}
const onSocialClickTwitter = () => {
  const providerTwitter = new TwitterAuthProvider()
  signInWithPopup(auth, providerTwitter).then(async (result) => {
    console.log(result)
    const credential = TwitterAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;
    // const docRef = doc(dbservice, `members/${uid}`)
    // const docSnap = await getDoc(docRef)
    // const userData = docSnap.data()
    // if (!userData) {
    //     await setDoc(doc(dbservice, 'members', `${uid}`), {
    //         uid: result.user.uid,
    //         displayName: result.user.displayName,
    //         points: 0,
    //         profileColor: '#2196f3',
    //         profileImage: null,
    //         profileImageUrl: null,
    //         followerNum: 0,
    //         followingNum: 0,
    //         followers: [],
    //         followings: [],
    //         messagingToken: null,
    //     })
    // }
    console.log(accessToken)
    console.log(idToken)
  }).catch((error) => {
    console.log(error)
  })
}

const onSocialClickFacebook = () => {
  const providerFacebook = new FacebookAuthProvider()
  signInWithPopup(auth, providerFacebook).then(async (result) => {
    // const uid = result.user.uid
    console.log(result)
    const credential = OAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    const idToken = credential.idToken;
    // const docRef = doc(dbservice, `members/${uid}`)
    // const docSnap = await getDoc(docRef)
    // const userData = docSnap.data()
    // if (!userData) {
    //     await setDoc(doc(dbservice, 'members', `${uid}`), {
    //         uid: result.user.uid,
    //         displayName: result.user.displayName,
    //         points: 0,
    //         profileColor: '#2196f3',
    //         profileImage: null,
    //         profileImageUrl: null,
    //         followerNum: 0,
    //         followingNum: 0,
    //         followers: [],
    //         followings: [],
    //         messagingToken: null,
    //     })
    // }
    console.log(accessToken)
    console.log(idToken)
  }).catch((error) => {
    console.log(error)
  })
}
// signInWithPopup(auth, providerMicrosoft).then(() => {
//     const credential = OAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;
//     const idToken = credential.idToken;
// }).catch((error) => {
//     console.log(error)
// })


export { auth, dbservice, messaging, onSocialClick, onSocialClickFacebook, onSocialClickGoogle, onSocialClickMicrosoft, onSocialClickTwitter, storage };

