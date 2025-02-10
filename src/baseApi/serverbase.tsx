import { getAuth, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, getRedirectResult  } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getMessaging } from "firebase/messaging";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { doc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc",
  authDomain: "remake-36fe0.firebaseapp.com",
  projectId: "remake-36fe0",
  storageBucket: "remake-36fe0.appspot.com",
  messagingSenderId: "206737336631",
  appId: "1:206737336631:web:55648c3ea182e23c3052b2"
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
const providerMicrosoft = new OAuthProvider('microsoft.com');
// providerMicrosoft.setCustomParameters({
//     prompt: "consent",
//     tenant: "723e1730-9623-4a7c-a8ee-b616ecd5e89f",
// })

const onSocialClick = async (event) => {
    const {
        target: {name},
    } = event;
    let provider
    if (name === 'g') {
        provider = new GoogleAuthProvider();
    } else {
        provider = new GithubAuthProvider();
    }
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let credential
        if (name === 'g') {
            credential = GoogleAuthProvider.credentialFromResult(result)
        } else {
            credential = GithubAuthProvider.credentialFromResult(result)
        }
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log('result '+result)
        console.log('user '+user.email)
        console.log('user '+user.uid)
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

const onSocialClickMicrosoft = () => {
    signInWithPopup(auth, providerMicrosoft).then((result) => {
        console.log(result)
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
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


export {auth, onSocialClick, onSocialClickMicrosoft, dbservice, storage, messaging}