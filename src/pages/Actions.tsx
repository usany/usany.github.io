import { useState, useEffect } from 'react'
import Message from 'src/pages/Message'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
// import { formGroupClasses } from '@mui/material';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Checklist from '@mui/icons-material/Checklist'
// import styled from 'styled-components'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';

// const NavBtn = styled.button`
//   border: dashed;
// `
// const SignBtn = styled.div`
//   display: flex;
//   justify-content: center;
// `
function Actions({ profileColor, setProfileColor, isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setCounter, bottomNavigation, setBottomNavigation, userUid }) {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [newAccount, setNewAccount] = useState(false)
  // const [error, setError] = useState('')
  const [borrowRegisteredMessage, setBorrowRegisteredMessage] = useState([])
  const [borrowMessage, setBorrowMessage] = useState([])
  const [lendRegisteredMessage, setLendRegisteredMessage] = useState([])
  const [lendMessage, setLendMessage] = useState([])
  const [newDisplayName, setNewDisplayName] = useState('')
  const [num, setNum] = useState(null)
  const [profileChangeConfirmed, setProfileChangeConfirmed] = useState(null)
  const [attachment, setAttachment] = useState('')
  const [changeProfile, setChangeProfile] = useState(false)
  const [userProfile, setUserProfile] = useState(null)
  const {state} = useLocation()
  const navigate = useNavigate()
  const confirmProfile = async (newDisplayName) => {
    const tmp = query(collection(dbservice, `members`))
    const querySnapshot = await getDocs(tmp);
    let profileConfirmed = true
    querySnapshot.forEach((doc) => {
      if (newDisplayName === doc.data().displayName) {
        profileConfirmed = false
      }
    });
    if (profileConfirmed) {
      setProfileChangeConfirmed(true)
    } else {
      setProfileChangeConfirmed(false)
    }
    // })
    // console.log(
    //   get(query(collection(dbservice, `members`)))
    // )
    // Array(query(collection(dbservice, `members`))).map((member) => {
    //   console.log(member)
    // })
  }
  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
        target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
        console.log(finishedEvent);
        const {
            currentTarget: { result },
        } = finishedEvent;
        setAttachment(result);
    }
    console.log(theFile)
    reader.readAsDataURL(theFile)
  }
  const onClearAttachment = () => {
    setAttachment('')
    const fileInput = document.getElementById('img') || {value:null}
    fileInput.value = null
  }
  const handleClose = () => {
    setChangeProfile(false)
  }
  console.log(state)
  return (
    <div>
      <div className='flex text-2xl p-5'>
          {state.actions === 'completedLend' &&
            <div>
              {state.user}의 빌려주기 목록 
            </div>
          }
          {state.actions === 'completedBorrow' &&
            <div>
              {state.user}의 빌리기 목록 
            </div>
          }
      </div>
      {state.actions === 'completedLend' &&
        <div className='flex justify-center flex-wrap'>
          {state.lendRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)}
          {state.lendMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)}
        </div>
      }
      {state.actions === 'completedBorrow' &&
        <div className='flex justify-center flex-wrap'>
          {state.borrowRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)}
          {state.borrowMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} isLoggedIn={isLoggedIn} setValue={setValue} counter={counter} setCounter={setCounter}/>)}
        </div>
      }
      <div className='flex justify-center p-10'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div>
    </div>
  )
}

export default Actions
