import { useState, useEffect, useMemo } from 'react'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import PageTitle from 'src/muiComponents/PageTitle'
import ProfileAvatar from 'src/muiComponents/ProfileAvatar'
import ProfileForm from 'src/muiComponents/ProfileForm'
import ProfileCards from 'src/muiComponents/ProfileCards'
import ProfileActions from 'src/muiComponents/ProfileActions'
import ProfileConnects from 'src/muiComponents/ProfileConnects'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors';
import { useBottomNavigationStore, useAvatarColorStore } from 'src/store'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

interface Props {
  userObj: {uid: string, displayName: string},
}

function Profile({ userObj }: Props) {
  const [attachment, setAttachment] = useState('')
  const {state} = useLocation()
  const [profileDialog, setProfileDialog] = useState(false)
  const profileColor = useAvatarColorStore((state) => state.profileColor)
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)


  useEffect(() => {
    getDownloadURL(ref(storage, 'screen.jpg'))
    .then((url) => {
        setAttachment(url)
    })
    .catch((error) => {
        console.log(error)
    });
  }, [])
  

  useEffect(() => {
    handleBottomNavigation(5)
  })
  
  const handleClose = () => {
    setProfileDialog(false)
  }

  return (
    <div>
      <PageTitle title={`${state.element.displayName} 프로필`}/>
      {state.element.uid === userObj.uid ?
        <div>
          <ProfileAvatar userObj={userObj} userUid={state.element.uid} handleProfileDialog={() => setProfileDialog(true)} attachment={attachment} profileColor={profileColor} />
          <AvatarDialogs userObj={userObj} profileDialog={profileDialog} attachment={attachment} changeAttachment={(newState) => setAttachment(newState)}  handleClose={handleClose} />
          <ProfileForm userObj={userObj} />
        </div>
      :
        <div>
          <div className='flex justify-center pt-5'>
            <Avatar alt={state.element.displayName} sx={{ fontSize:'100px', width: '200px', height: '200px', bgcolor: state.element?.profileColor || blue[500] }} src='./src'/>
          </div>
          <ProfileConnects userObj={userObj} user={state.element}/>
        </div>
      }
      <ProfileCards user={state.element} />
    </div>
  )
}

export default Profile