import { useState, useEffect, useReducer } from 'react'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Link } from 'react-router-dom'

const ProfileConnects = ({
  userObj,
  user,
  alliesCollection,
  handleFollowers,
  handleFollowings
}) => {
  // const [myFollowingList, setMyFollowingList] = useState([])
  // const [otherFollowerNumber, setOtherFollowerNumber] = useState(null)
  // const [otherFollowerList, setOtherFollowerList] = useState([])
  // const [userFollowersList, setUserFollowersList] = useState([])
  const [conversation, setConversation] = useState('')
  // const [followButton, setFollowButton] = useState(true)
  const followButton = alliesCollection[0].list.indexOf(userObj.uid) === -1
  const followUser = async (uid) => {
    const myDocRef = doc(dbservice, `members/${userObj.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${user.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    const myFollowerNum = myDocSnap.data().followerNum
    const myFollowingNum = myDocSnap.data().followingNum
    const otherUserFollowerNum = otherUserDocSnap.data().followerNum
    const otherUserFollowingNum = otherUserDocSnap.data().followingNum
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowings.indexOf(user.uid) === -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum+1,
          followings: [...myFollowings, user.uid]
        })
      }
    } else {
      await updateDoc(myDocRef, {
        followingNum: 1,
        followings: [user.uid]
      })
    }
    if (otherUserFollowerNum) {
      if (otherFollowers.indexOf(userObj.uid) === -1) { 
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum+1,
          followers: [...otherFollowers, userObj.uid]
        })
        handleFollowers({number: otherUserFollowerNum+1, list: [...otherFollowers, userObj.uid]})
      }
    } else {
      await updateDoc(otherUserDocRef, {
        followerNum: 1,
        followers: [userObj.uid]
      })
      handleFollowers({number:1, list: [userObj.uid]})
    }
  }
  const unfollowUser = async (uid) => {
    const myDocRef = doc(dbservice, `members/${userObj.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const otherUserDocRef = doc(dbservice, `members/${user.uid}`)
    const otherUserDocSnap = await getDoc(otherUserDocRef)
    const myFollowerNum = myDocSnap.data().followerNum
    const myFollowingNum = myDocSnap.data().followingNum
    const otherUserFollowerNum = otherUserDocSnap.data().followerNum
    const otherUserFollowingNum = otherUserDocSnap.data().followingNum
    const myFollowers = myDocSnap.data().followers || []
    const myFollowings = myDocSnap.data().followings || []
    const otherFollowers = otherUserDocSnap.data().followers || []
    const otherFollowings = otherUserDocSnap.data().followings || []
    if (myFollowingNum) {
      if (myFollowings.indexOf(uid) !== -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum-1,
          followings: myFollowings.filter((element) => element !== user.uid)
        })
      }
    }
    
    if (otherUserFollowerNum) {
      if (otherFollowers.indexOf(userObj.uid) !== -1) { 
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum-1,
          followers: otherFollowers.filter((element) => element !== userObj.uid)
        })
        handleFollowers({number: otherUserFollowerNum-1, list: otherFollowers.filter((element) => element !== userObj.uid)})
      }
    }
  }
  useEffect(() => {
    if (user.uid < userObj.uid) {
      setConversation(user.uid[0]+user.uid[1]+user.uid[2]+user.uid[3]+user.uid[4]+user.uid[5]+userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5])
    } else {
      setConversation(userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5]+user.uid[0]+user.uid[1]+user.uid[2]+user.uid[3]+user.uid[4]+user.uid[5])
    }
  }, [])
  
  return (
    <div>
      <div className='flex justify-center pt-10'>
        {followButton ?
        <Button variant='outlined' sx={{overflow: 'hidden'}} onClick={() => {
          followUser(user.uid)
        }}>
          팔로우 {user.displayName}
        </Button>
        :
        <Button variant='outlined' sx={{overflow: 'hidden'}} onClick={() => {
          unfollowUser(user.uid)
        }}>
          팔로우 취소 {user.displayName}
        </Button>
        }
        <Link to='/piazza' state={{conversation: conversation, displayName: user.displayName, userUid: userObj.uid, chattingUid: user.uid, multiple: false, profileUrl: user.profileImageUrl}}>
          <Button variant='outlined' sx={{overflow: 'hidden'}}>메세지 전송</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProfileConnects