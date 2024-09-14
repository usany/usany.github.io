import { useState, useEffect } from 'react'
import Message from 'src/pages/Message'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
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
import AlliesList from 'src/pages/AlliesList'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

function Allies({ profileColor, setProfileColor, isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setCounter, bottomNavigation, setBottomNavigation, userUid }) {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [newAccount, setNewAccount] = useState(false)
  // const [error, setError] = useState('')
  // const [followersUids, setFollowersUids] = useState([])
  // const [followingsUids, setFollowingsUids] = useState([])
  const [rank, setRank] = useState([])
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  // const [followersName, setFollowersName] = useState([])
  // const [followingsName, setFollowingsName] = useState([])
  // const [checkAllies, setCheckAllies] = useState(false)
  const {state} = useLocation()
  const navigate = useNavigate()
  // const allies = async () => {
  //   const docRef = doc(dbservice, `members/${state.uid}`)
  //   const docSnap = await getDoc(docRef)
  //   const followersList = docSnap.data().followers || []
  //   const followingsList = docSnap.data().followings || []
  //   const followersCollection = []
  //   const followingsCollection = []
  //   const collectionRef = collection(dbservice, 'members')
  //   const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))

  //   followersList.forEach(async (element) => {
  //     const docRef = doc(dbservice, `members/${element}`)
  //     const docSnap = await getDoc(docRef)
  //     const follower = docSnap.data().uid
  //     followersCollection.push(follower)
  //     setFollowersName([...followersCollection, follower])
  //   })
  //   followingsList.forEach(async (element) => {
  //     const docRef = doc(dbservice, `members/${element}`)
  //     const docSnap = await getDoc(docRef)
  //     const following = docSnap.data().uid
  //     followingsCollection.push(following)
  //     setFollowingsName([...followingsCollection, following])
  //   })
  //   docs.forEach((element) => {
  //     if (followersName.indexOf(element.data().uid) !== -1) {
  //       setFollowers([...followers, {
  //         ...element.data(),
  //       }])
  //     }
  //     if (followingsName.indexOf(element.data().uid) !== -1) {
  //       setFollowings([...followings, {
  //         ...element.data(),
  //       }])
  //     }
  //   })
  // }
  useEffect(() => {
    // allies()
    usersCollection()
    // setCheckAllies(true)
  }, [])
  const usersCollection = async () => {
    const followersCollection = []
    const followingsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
        followersCollection.push(element.data())
        setFollowers(followersCollection)
      }
      if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
        followingsCollection.push(element.data())
        setFollowings(followingsCollection)
      }
    })
  }
  // if (checkAllies) {
  //   usersCollection()
  //   setCheckAllies(false)
  // }
  // useEffect(() => {
  //   if (checkAllies) {
  //   if (checkAllies) {
  //     usersCollection()
  //     setCheckAllies(false)
  //   }
  // }
  // }, [])
  // console.log(followings)
  // console.log(state)
  return (
    <div>
      <div className='flex text-2xl p-5'>
          {state.allies === 'followers' &&
            <div>
              {state.displayName}의 follower 
            </div>
          }
          {state.allies === 'followings' &&
            <div>
              {state.displayName}의 following 
            </div>
          }
      </div>
      <List sx={{ width: '100%', 
          bgcolor: 'background.paper' }}>
        {state.allies === 'followers' &&
          <div className='flex flex-col justify-center flex-wrap'>
            {followers?.map((element, index) => {
              return (
                <div key={index} className='flex'>
                    <ListItem>
                      <div className='flex justify-between w-screen'>
                      <div className='flex'>
                        <ListItemAvatar>
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src="./src" />
                        </ListItemAvatar>
                        <div className='flex flex-col overflow-hidden'>
                          <div>
                            {element.displayName}
                          </div>
                          <div>
                            {element.points}
                          </div>
                        </div>
                      </div>
                      <div>
                        <IconButton aria-label="comment">
                          <Link to='/postings/profile'
                            state = {{
                              // msgObj: msgObj,
                              // isOwner: isOwner,
                              // num: num,
                              // points: points,
                              element: element,
                              // isLoggedIn: isLoggedIn,
                              // uid: userObj.uid,
                              // displayName: userObj.displayName,
                              // setValue: setValue
                              // setCounter: setCounter
                            }}
                          >
                            <CommentIcon />
                          </Link>
                        </IconButton>
                      </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
          </div>
        }
        {state.allies === 'followings' &&
          <div className='flex flex-col justify-center flex-wrap'>
            {followings?.map((element, index) => {
              return (
                <div key={index} className='flex'>
                    <ListItem>
                      <div className='flex justify-between w-screen px-5'>
                      <div className='flex'>
                        <ListItemAvatar>
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src="./src" />
                        </ListItemAvatar>
                        <div className='flex flex-col overflow-hidden'>
                          <div>
                            {element.displayName}
                          </div>
                          <div>
                            {element.points}
                          </div>
                        </div>
                      </div>
                      <div>
                        <IconButton aria-label="comment">
                          <Link to='/postings/profile'
                            state = {{
                              // msgObj: msgObj,
                              // isOwner: isOwner,
                              // num: num,
                              // points: points,
                              element: element,
                              // isLoggedIn: isLoggedIn,
                              // uid: userObj.uid,
                              // displayName: userObj.displayName,
                              // setValue: setValue
                              // setCounter: setCounter
                            }}
                          >
                            <CommentIcon />
                          </Link>
                        </IconButton>
                      </div>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
          </div>
        }
      </List>
      <div className='flex justify-center p-10'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div>
    </div>
  )
}

export default Allies
