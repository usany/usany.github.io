import { doc, setDoc } from "firebase/firestore";
import { dbservice } from "src/baseApi/serverbase";

const setDocUser = async ({ uid, email, ranking }) => {
  await setDoc(doc(dbservice, "members", `${uid}`), {
    uid: uid,
    displayName: email,
    points: 0,
    profileImage: false,
    profileImageUrl: '',
    defaultProfile: '',
    followers: [],
    followings: [],
    messagingToken: '',
    ranking: ranking,
    createdCards: [],
    connectedCards: [],
    borrowDoneCount: [],
    lendDoneCount: [],
    locationConfirmed: '',
    conversation: [],
    chattings: {},
    certificated: false
    // profileColor: "#2196f3",
    // followerNum: 0,
    // followingNum: 0,
  });
};

export default setDocUser;
