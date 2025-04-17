import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadString
} from "firebase/storage";
import { useState } from "react";
import staticMail from "src/assets/signMail.svg";
import {
  auth,
  dbservice,
  storage
} from "src/baseApi/serverbase";
import { useSelectors } from "src/hooks/useSelectors.tsx";
import AuthDialogs from "./AuthDialogs.tsx";
// import storeSetDoc from "../../../components/setDocUser.ts";

const AuthForm = ({ signIn }) => {
  const [account, setAccount] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const languages = useSelectors((state) => state.languages.value)
  const onSubmitSignIn = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, account.email, account.password);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        const errorMessage = "로그인 실패: 계정을 확인해 주세요";
        setError(errorMessage);
      }
    }
  };
  const onSubmitSignUp = async (event) => {
    event.preventDefault();
    try {
      const data = await createUserWithEmailAndPassword(
        auth,
        account.email,
        account.password
      );
      // storeSetDoc({ uid: data.user.uid, email: data.user.email });
      const docsRef = query(collection(dbservice, "members"));
      const docs = await getDocs(docsRef);
      const docsLength = docs.docs.length;
      await setDoc(doc(dbservice, "members", `${data.user.uid}`), {
        uid: data.user.uid,
        displayName: data.user.email,
        points: 0,
        profileImage: null,
        profileImageUrl: null,
        followers: [],
        followings: [],
        messagingToken: null,
        ranking: docsLength,
        createdCards: [],
        connectedCards: [],
        profileColor: "#2196f3",
        followerNum: 0,
        followingNum: 0,
        locationConfirmed: false,
        defaultProfile: ''
      });
      await updateProfile(data.user, {
        displayName: data.user.email,
      }).catch((error) => {
        console.log("error");
      });
      const user = doc(dbservice, `members/${data.user.uid}`);
      const storageRef = ref(storage, data.user.uid);
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
      // console.log(storageRef);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        const errorMessage = "로그인 실패: 계정을 확인해 주세요";
        setError(errorMessage);
      } else if (
        error.message === "Firebase: Error (auth/email-already-in-use)."
      ) {
        const errorMessage = "회원가입 실패: 이미 가입된 계정입니다";
        setError(errorMessage);
      } else if (error.message === "Firebase: Error (auth/invalid-email).") {
        const errorMessage = "회원가입 실패: 계정을 확인해 주세요";
        setError(errorMessage);
      } else {
        console.log(error.message);
      }
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setAccount({ email: value, password: account.password });
    } else if (name === "password") {
      setAccount({ ...account, password: value });
    }
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col border border-solid w-1/2 rounded-lg pt-5">
        <form
          id={signIn ? "auth" : "signUp"}
          className="pt-3"
          onSubmit={signIn ? onSubmitSignIn : onSubmitSignUp}
        >
          <div className="flex justify-center px-3">
            <TextField
              label={languages === 'ko' ? "이메일" : 'email'}
              value={account.email}
              onChange={onChange}
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required
            />
          </div>
          <div className="flex justify-center px-3">
            <TextField
              label={languages === 'ko' ? "비밀번호" : 'password'}
              value={account.password}
              onChange={onChange}
              variant="outlined"
              name="password"
              type="password"
              fullWidth
              required
            />
          </div>
          <div className="flex flex-col justify-center p-3">
            <Button
              variant="outlined"
              startIcon={<img src={staticMail} className="w-[20px]" />}
              form={signIn ? "auth" : "signUp"}
              type="submit"
            >
              {signIn ? (languages === 'ko' ? "로그인" : 'Sign in') : (languages === 'ko' ? "회원가입" : 'Register')}
            </Button>
            <span>{error}</span>
          </div>
        </form>
        <AuthDialogs />
      </div>
    </div>
  );
};

export default AuthForm;
