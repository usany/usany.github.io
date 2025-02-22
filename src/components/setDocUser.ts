import { useState, useEffect } from "react";
import { auth, onSocialClick, dbservice } from "src/baseApi/serverbase";
import {
  updateProfile,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { doc, setDoc } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  uploadString,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import staticMail from "src/assets/signMail.svg";
import AuthDialogs from "./AuthDialogs";

const storeSetDoc = async ({ uid, email }) => {
  const ranking = 10;
  await setDoc(doc(dbservice, "members", `${uid}`), {
    uid: uid,
    displayName: email,
    points: 0,
    profileImage: null,
    profileImageUrl: null,
    followers: [],
    followings: [],
    messagingToken: null,
    ranking: ranking,
    createdCards: [],
    connectedCards: [],
    profileColor: "#2196f3",
    followerNum: 0,
    followingNum: 0,
  });
};

export default storeSetDoc;
