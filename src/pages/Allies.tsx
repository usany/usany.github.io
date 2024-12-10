import { useState, useEffect } from 'react'
import AvatarDialogs from 'src/muiComponents/AvatarDialogs'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Checklist from '@mui/icons-material/Checklist'
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

function Allies() {
  // const [followers, setFollowers] = useState([])
  // const [followings, setFollowings] = useState([])
  const [elements, setElements] = useState([])
  const {state} = useLocation()
  const navigate = useNavigate()
 
  useEffect(() => {
    usersCollection()
  }, [])
  const usersCollection = async () => {
    // const followersCollection = []
    // const followingsCollection = []
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
        setElements(elementsCollection)
      }
      // if (state.alliesCollection.indexOf(element.data().uid) !== -1) {
      //   elementsCollection.push(element.data())
      //   setFollowings(followingsCollection)
      // }
    })
  }
  // const elements = state.followers ? followers : followings
  return (
    <div>
      <div className='flex text-2xl p-5'>
        {state.user.displayName}의 {state.followers ? '팔로워' : '팔로잉'} 
          {/* {state.followers &&
            <div>
            </div>
          }
          {!state.followers &&
            <div>
              {state.user.displayName}의 팔로잉 
            </div>
          } */}
      </div>
      <div>
        {/* {state.followers ?
          <div className='flex flex-col justify-center flex-wrap'>
            {followers?.map((element, index) => {
              return (
                <div key={index} className='flex'>
                  <div className='flex justify-between w-screen'>
                    <div className='flex'>
                      <ListItemAvatar>
                        <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor }} src="./src" />
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
                        <Link to='/profile'
                          state = {{
                            element: element,
                          }}
                        >
                          <CommentIcon />
                        </Link>
                      </IconButton>
                    </div>
                  </div>
                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
          </div>
          : */}
          <div className='flex flex-col justify-center flex-wrap'>
            {elements?.map((element, index) => {
              return (
                <div key={index}>
                  <div className='flex justify-between w-screen px-5'>
                      <div>
                        <ListItemAvatar>
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src="./src" />
                        </ListItemAvatar>
                      </div>
                      <div>
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
                          <Link to='/profile'
                            state = {{
                              element: element,
                            }}
                          >
                            <CommentIcon />
                          </Link>
                        </IconButton>
                      </div>
                  </div>
                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
          </div>
        {/* } */}
      </div>
      {/* <div className='flex justify-center p-10'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div> */}
    </div>
  )
}

export default Allies
