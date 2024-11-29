import { useState, useEffect, useMemo, useCallback } from 'react'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import PageTitle from 'src/muiComponents/PageTitle'
import ProfileAvatar from 'src/muiComponents/ProfileAvatar'
import ProfileForm from 'src/muiComponents/ProfileForm'
import ProfileCards from 'src/muiComponents/ProfileCards'
import ProfileActions from 'src/muiComponents/ProfileActions'
// import ProfileActions from 'src/muiComponents/ProfileActions'
import ProfileConnects from 'src/muiComponents/ProfileConnects'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
// import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors';
import { useBottomNavigationStore, useAvatarColorStore } from 'src/store'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Check } from "lucide-react"
import { useImmer } from "use-immer"
import { Label, Pie, PieChart } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface Props {
  userObj: {uid: string, displayName: string},
}

function Profile({ userObj }: Props) {
  const [attachment, setAttachment] = useState('')
  const {state} = useLocation()
  const [profileDialog, setProfileDialog] = useState(false)
  const profileColor = useAvatarColorStore((state) => state.profileColor)
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  const [allies, setAllies] = useState({
    followers: {
      number: 0,
      list: []
    },
    followings: {
      number: 0,
      list: []
    }
  })
  const [alliesCollection, setAlliesCollection] = useImmer([
    {
      id: 'followers',
      list: []
    },
    {
      id: 'followings',
      list: []
    }
  ])
  const handleFollowers = ({ number, list }) => {
    setAllies({followers: {number: number, list: list}, followings: allies.followings})
    setAlliesCollection((draft) => {
      const followers = draft.find((todo) => todo.id === 'followers');
      followers.list = list
    })
  }
  const handleFollowings = ({ number, list }) => {
    setAllies({...allies, followings: {number: number, list: list}})
    setAlliesCollection((draft) => {
      const followings = draft.find((todo) => todo.id === 'followings');
      followings.list = list
    })
  }
  console.log(alliesCollection)
  useEffect(() => {
    const bringAllies = async () => {
      let docRef
      if (userObj.uid === state.element.uid) {
        docRef = doc(dbservice, `members/${userObj.uid}`)
      } else {
        docRef = doc(dbservice, `members/${state.element.uid}`)
      }
      const myDocSnap = await getDoc(docRef)
      const {followerNum, followingNum, followers, followings} = myDocSnap.data()
      const alliesObj = {
        followers: {number: followerNum || 0, list: followers || []},
        followings: {number: followingNum || 0, list: followings || []}
      }
      // handleFollowers(alliesObj.followers)
      // handleFollowings(alliesObj.followings)
      console.log(alliesObj)
      console.log(state.element.uid)
      setAllies(alliesObj)
    }
    bringAllies()
  }, [state])
  useEffect(() => {
    document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [state]);
  useEffect(() => {
    handleBottomNavigation(5)
  })
  const handleClose = () => {
    setProfileDialog(false)
  }
  
  return (
    <div>
      <PageTitle title={`${state.element.displayName} 프로필`}/>
      <ProfileAvatar userObj={userObj} user={state.element} handleProfileDialog={() => setProfileDialog(true)} attachment={attachment} profileColor={profileColor} />
      <AvatarDialogs userObj={userObj} profileDialog={profileDialog} attachment={attachment} changeAttachment={(newState) => setAttachment(newState)}  handleClose={handleClose} />
      <ProfileActions userObj={userObj} user={state.element} allies={allies} handleFollowers={handleFollowers} handleFollowings={handleFollowings}/>
      <ProfileCards user={state.element} allies={allies}/>
    </div>
  )
}

export default Profile