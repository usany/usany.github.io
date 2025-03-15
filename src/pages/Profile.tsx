import { useState, useEffect, useMemo, useCallback } from 'react'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import PageTitle from 'src/muiComponents/PageTitle'
import ProfileAvatar from 'src/muiComponents/ProfileAvatar'
import ProfileCards from 'src/muiComponents/ProfileCards'
import ProfileActions from 'src/muiComponents/ProfileActions'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { useImmer } from "use-immer"
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth'

interface Props {
  userObj: User,
}
function Profile({ userObj }: Props) {
  const [attachment, setAttachment] = useState('')
  const {state} = useLocation()
  const [profileDialog, setProfileDialog] = useState(false)
  const profileColor = useSelector(state => state.profileColor.value)
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
    setAlliesCollection((draft) => {
      const followers = draft.find((todo) => todo.id === 'followers');
      followers.list = list
    })
  }
  const handleFollowings = ({ number, list }) => {
    setAlliesCollection((draft) => {
      const followings = draft.find((todo) => todo.id === 'followings');
      followings.list = list
    })
  }
  const dispatch = useDispatch()

  useEffect(() => {
    const bringAllies = async () => {
      let docRef
      if (userObj.uid === state.element.uid) {
        docRef = doc(dbservice, `members/${userObj.uid}`)
      } else {
        docRef = doc(dbservice, `members/${state.element.uid}`)
      }
      const myDocSnap = await getDoc(docRef)
      const {followers, followings} = myDocSnap.data()
      const alliesObj = [
        {id: 'followers', list: followers || []},
        {id: 'followings', list: followings || []}
      ]
      setAlliesCollection(alliesObj)
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
    dispatch(changeBottomNavigation(5))
  }, [state])
  const handleClose = () => {
    setProfileDialog(false)
  }
  // const actions = [
  //   { action: 'borrow', number: borrowMessage.length+borrowRegisteredMessage.length,
  //     fill: 'red'},
  //   { action: 'lend', number: lendMessage.length+lendRegisteredMessage.length,
  //     fill: 'blue'},
  // ]
  // const labels = {
  //   number: {
  //     label: 'total',
  //   },
  //   borrow: {
  //     label: 'borrow',
  //     color: '#2563eb',
  //   },
  //   lend: {
  //     label: 'lend',
  //     color: '#60a5fa',
  //   },
  // } satisfies ChartConfig
  // const totalNumber = actions.reduce((acc, curr) => acc + curr.number, 0)

  return (
    <div>
      <PageTitle title={`${state.element.uid === userObj.uid ? '내' : state.element.displayName} 프로필`}/>
      <ProfileAvatar userObj={userObj} user={state.element} handleProfileDialog={() => setProfileDialog(true)} />
      <AvatarDialogs userObj={userObj} profileDialog={profileDialog} attachment={attachment} changeAttachment={(newState: string) => setAttachment(newState)}  handleClose={handleClose} />
      <ProfileActions userObj={userObj} user={state.element} alliesCollection={alliesCollection} handleFollowers={handleFollowers} handleFollowings={handleFollowings}/>
      <ProfileCards user={state.element} alliesCollection={alliesCollection}/>
    </div>
  )
}

export default Profile