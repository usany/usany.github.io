import { doc, setDoc } from "firebase/firestore"
import { dbservice } from "src/baseApi/serverbase"


const userMembers = async ({uid, }) => {
    await setDoc(doc(dbservice, 'members', uid), {
        uid: uid,
        displayName: data.user.email,
        points: 0,
        profileColor: '#2196f3',
        profileImage: null,
        profileImageUrl: null,
        followerNum: 0,
        followingNum: 0,
        followers: [],
        followings: [],
        messagingToken: null,
    })
}

export default userMembers