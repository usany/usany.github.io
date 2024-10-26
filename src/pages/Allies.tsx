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
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { blue } from '@mui/material/colors';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

function Allies({ setCheck }) {
  // const [rank, setRank] = useState([])
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const {state} = useLocation()
  const navigate = useNavigate()
 
  useEffect(() => {
    usersCollection()
    // allies()
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
                          <Link to='/'
                            state = {{
                              element: element,
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
                          <Link to='/'
                            state = {{
                              element: element,
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
