import { doc, setDoc } from "firebase/firestore";
import { dbservice } from "src/baseApi/serverbase";

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
    defaultProfile: ''
  });
};

export default storeSetDoc;
