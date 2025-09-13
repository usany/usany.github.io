import Button from '@mui/material/Button'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks'
import { useTexts } from 'src/hooks'

const ProfileConnects = ({ alliesCollection, handleFollowers }) => {
  const { follow, cancelFollow, sendMessage } = useTexts()
  const [conversation, setConversation] = useState('')
  const profile = useSelectors((state) => state.profile.value)
  const { state } = useLocation()
  const user = state?.element || profile
  
  const followButton = alliesCollection[0].list.indexOf(profile?.uid) === -1
  const followUser = async () => {
    const myDocRef = doc(dbservice, `members/${profile?.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${user.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    // const myFollowerNum = myDocSnap.data().followers.length
    const myFollowingNum = myDocSnap.data()?.followings
      ? myDocSnap.data().followings.length
      : 0
    const otherUserFollowerNum = otherUserDocSnap.data()?.followers
      ? otherUserDocSnap.data().followers.length
      : 0
    // const otherUserFollowingNum = otherUserDocSnap.data().followings.length
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowings.indexOf(user.uid) === -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum + 1,
          followings: [...myFollowings, user.uid],
        })
      }
    } else {
      await updateDoc(myDocRef, {
        followingNum: 1,
        followings: [user.uid],
      })
    }
    if (otherUserFollowerNum) {
      if (otherFollowers.indexOf(profile?.uid) === -1) {
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum + 1,
          followers: [...otherFollowers, profile?.uid],
        })
        handleFollowers({
          list: [...otherFollowers, profile?.uid],
        })
      }
    } else {
      await updateDoc(otherUserDocRef, {
        followerNum: 1,
        followers: [profile?.uid],
      })
      handleFollowers({ list: [profile?.uid] })
    }
  }
  const unfollowUser = async (uid) => {
    const myDocRef = doc(dbservice, `members/${profile?.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${user.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    // const myFollowerNum = myDocSnap.data().followers.length
    const myFollowingNum = myDocSnap.data()?.followings
      ? myDocSnap.data().followings.length
      : 0
    const otherUserFollowerNum = otherUserDocSnap.data()?.followers
      ? otherUserDocSnap.data().followers.length
      : 0
    // const otherUserFollowingNum = otherUserDocSnap.data().followings.length
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowings.indexOf(uid) !== -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum - 1,
          followings: myFollowings.filter((element) => element !== user.uid),
        })
      }
    }

    if (otherUserFollowerNum) {
      if (otherFollowers.indexOf(profile?.uid) !== -1) {
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum - 1,
          followers: otherFollowers.filter(
            (element) => element !== profile?.uid,
          ),
        })
        handleFollowers({
          list: otherFollowers.filter((element) => element !== profile?.uid),
        })
      }
    }
  }

  useEffect(() => {
    if (user.uid < profile?.uid) {
      setConversation(
        user.uid[0] +
          user.uid[1] +
          user.uid[2] +
          user.uid[3] +
          user.uid[4] +
          user.uid[5] +
          profile?.uid[0] +
          profile?.uid[1] +
          profile?.uid[2] +
          profile?.uid[3] +
          profile?.uid[4] +
          profile?.uid[5],
      )
    } else {
      setConversation(
        profile?.uid[0] +
          profile?.uid[1] +
          profile?.uid[2] +
          profile?.uid[3] +
          profile?.uid[4] +
          profile?.uid[5] +
          user.uid[0] +
          user.uid[1] +
          user.uid[2] +
          user.uid[3] +
          user.uid[4] +
          user.uid[5],
      )
    }
  }, [])
  return (
    <div>
      <div className="flex justify-center pt-10">
        {followButton ? (
          <Button
            variant="outlined"
            sx={{ overflow: 'hidden' }}
            onClick={() => {
              followUser(user.uid)
            }}
          >
            {follow} {user.displayName}
          </Button>
        ) : (
          <Button
            variant="outlined"
            sx={{ overflow: 'hidden' }}
            onClick={() => {
              unfollowUser(user.uid)
            }}
          >
            {cancelFollow} {user.displayName}
          </Button>
        )}
        <Link
          to="/piazza"
          state={{
            conversation: conversation,
            displayName: user.displayName,
            userUid: profile?.uid,
            chattingUid: user.uid,
            multiple: false,
            profileUrl: user.profileImageUrl,
          }}
        >
          <Button variant="outlined" sx={{ overflow: 'hidden' }}>
            {sendMessage}
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default ProfileConnects
