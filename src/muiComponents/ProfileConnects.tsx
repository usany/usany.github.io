import { useState, useEffect, useReducer } from 'react'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors';
import { useBottomNavigationStore, useAvatarColorStore } from 'src/store'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'

const ProfileConnects = ({
  userObj,
  user
}) => {
  const [myFollowingList, setMyFollowingList] = useState([])
  const [otherFollowerNumber, setOtherFollowerNumber] = useState(null)
  const [otherFollowerList, setOtherFollowerList] = useState([])
  const [userFollowersList, setUserFollowersList] = useState([])
  const [followButton, setFollowButton] = useState(true)
  const [conversation, setConversation] = useState('')

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
      if (myFollowingList.indexOf(user.uid) === -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum+1,
          followings: [...myFollowings, user.uid]
        })
        // setMyFollowingNumber(myFollowingNum+1)
        setMyFollowingList([...myFollowings, user.uid])
      }
    } else {
      await updateDoc(myDocRef, {
        followingNum: 1,
        followings: [user.uid]
      })
      // setMyFollowingNumber(1)
      setMyFollowingList([user.uid])
    }
    if (otherUserFollowerNum) {
      if (otherFollowerList.indexOf(userObj.uid) === -1) { 
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum+1,
          followers: [...otherFollowers, userObj.uid]
        })
        setOtherFollowerNumber(otherFollowerNumber+1)
        setOtherFollowerList([...otherFollowers, userObj.uid])
      }
    } else {
      await updateDoc(otherUserDocRef, {
        followerNum: 1,
        followers: [userObj.uid]
      })
      setOtherFollowerNumber(1)
      setOtherFollowerList([userObj.uid])
    }
    setFollowButton(false)
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
      if (myFollowingList.indexOf(user.uid) !== -1) {
        await updateDoc(myDocRef, {
          followingNum: myFollowingNum-1,
          followings: myFollowings.filter((element) => element !== user.uid)
        })
        // setMyFollowerNumber(myFollowingNum-1)
        // setMyFollowerList(myFollowings.filter((element) => element !== state.element.uid))
      }
    }
    if (otherUserFollowerNum) {
      if (otherFollowerList.indexOf(userObj.uid) !== -1) { 
        await updateDoc(otherUserDocRef, {
          followerNum: otherUserFollowerNum-1,
          followers: otherFollowers.filter((element) => element !== userObj.uid)
        })
        setOtherFollowerNumber(otherFollowerNumber-1)
        setOtherFollowerList(otherFollowers.filter((element) => element !== userObj.uid))
      }
    }
    setFollowButton(true)
  }
  useEffect(() => {
    if (user.uid < user.uid) {
      setConversation(user.uid[0]+user.uid[1]+user.uid[2]+user.uid[3]+user.uid[4]+user.uid[5]+userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5])
    } else {
      setConversation(userObj.uid[0]+userObj.uid[1]+userObj.uid[2]+userObj.uid[3]+userObj.uid[4]+userObj.uid[5]+user.uid[0]+user.uid[1]+user.uid[2]+user.uid[3]+user.uid[4]+user.uid[5])
    }
  }, [])
  return (
    <div>
      <div className='flex justify-center'>
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
        <Link to='/chatting' state={{conversation: conversation, displayName: user.displayName, userUid: userObj.uid, chattingUid: user.uid}}>
          <Button variant='outlined' sx={{overflow: 'hidden'}}>메세지 전송</Button>
        </Link>
      </div>
    </div>
  );
}

export default ProfileConnects