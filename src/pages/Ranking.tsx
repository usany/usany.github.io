import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import { useBottomNavigationStore, useAvatarImageStore } from 'src/store'
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Skeleton from '@mui/material/Skeleton';
import staticImg from 'src/assets/pwa-512x512.png';

function Ranking({ userObj }) {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])
  const [userSearch, setUserSearch] = useState('')
  const profileImage = useAvatarImageStore((state) => state.profileImage)
  const handleProfileImage = useAvatarImageStore((state) => state.handleProfileImage)
  const [loaded, setLoaded] = useState(false)
  // useEffect(() => {
  //   if (handleProfileImage) {
  //     setLoaded(true)
  //   }
  // })
  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    setUserSearch(value)
  }
  console.log(profileImage)
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            // uid: document.uid,
            ...document.data(),
        }));
        setRank(newArray)
        const newArrayLength = newArray.length
        newArray.map((document, index) => {
          if (document.uid === userObj.uid) {
            newArray[index].rank = index+1
            setRanker([newArray[index]])
          }
        })
    })
  }, [])
  console.log(ranker)
  useEffect(() => {
    handleBottomNavigation(5)
  })
  
  return (
    <div className='flex flex-col pb-20'>
      <div className='flex text-2xl p-5'>
        <div>
          유저 랭킹
        </div>
        <div className='px-5'>
          <TextField label='유저 이름' onChange={onChangeUserSearch}/>
        </div>
      </div>
      {/* <div className='flex justify-start p-5 text-2xl w-screen'>
          <div className='flex w-5/6'>빌리기 카드 목록</div>
      </div> */}
      {userSearch ?
      <List sx={{ width: '100%', 
        // maxWidth: 360,
        bgcolor: 'background.paper' }}>
          {rank.map((element, index) => {
            let userNameConfirm = true
            for (let number = 0; number < userSearch.length; number++) {
              if (element.displayName[number] !== userSearch[number]) {
                userNameConfirm = false
              }
            }
            if (userNameConfirm) {
            return(
              <div key={index} className={'flex ranking-'+String(index+1)}>
                  <ListItem>
                    <div className='px-5'>
                      {/* {rank.indexOf(element)+1} */}
                      {index+1}
                    </div>
                    <ListItemAvatar>
                      {loaded ?
                        <Skeleton />:
                        <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src={profileImage} />
                      }
                    </ListItemAvatar>
                    <div className='flex flex-col overflow-hidden'>
                      <div>
                        {element.displayName}
                      </div>
                      <div>
                        {element.points}
                      </div>
                    </div>
                    <div>
                    <div 
                      className='flex'
                    >
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
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
            )
          }
          })}
      </List>
      :
      <div>
      <div className='flex'>
        <div className='flex flex-col justify-center px-5'>
          내 랭킹
        </div>
        <div className='flex-col'>
          <div>내 이름</div> 
          <div>포인트</div> 
        </div>
      </div>
        <List sx={{ width: '100%', 
          // maxWidth: 360,
          bgcolor: 'background.paper' }}>
            {ranker.map((element, index) => {
              return(
                <div key={index} className={'flex overflow-hidden ranking-'+String(index+1)}>
                    <ListItem>
                      <div className='px-5'>
                        {element.rank}
                      </div>
                      <ListItemAvatar>
                        {profileImage ? 
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src={profileImage} />:
                          <Skeleton variant='circular'>
                            <Avatar />
                          </Skeleton>
                        }
                      </ListItemAvatar>
                      <div className='flex flex-col overflow-hidden'>
                        <div className='overflow-hidden'>
                          {element.displayName}
                        </div>
                        <div>
                          {element.points}
                        </div>
                      </div>
                      <div>
                      <div 
                        className='flex'
                      >
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
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
        </List>
      <div className='flex justify-between w-screen'>
        <div className='flex'>
          <div className='flex flex-col justify-center px-5'>
            유저 랭킹
          </div>
          <div className='flex-col'>
            <div>유저 이름</div> 
            <div>포인트</div> 
          </div>
        </div>
        <div className='flex flex-col justify-center px-5'>
          프로필
        </div>
      </div>
      <div>
        <List sx={{ width: '100%', 
          // maxWidth: 360,
          bgcolor: 'background.paper' }}>
          {rank.map((element, index) => {
                return(
                  <div key={index} className={'flex ranking-'+String(index+1)}>
                    <ListItem>
                      <div className='flex justify-between w-screen'>
                      <div className='flex overflow-hidden'>
                        <div className='flex flex-col justify-center px-5'>
                          {index+1}
                        </div>
                        <div className='flex flex-col justify-center'>
                        <ListItemAvatar>
                          <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src="./src" />
                        </ListItemAvatar>
                        </div>
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
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                )
          })}
        </List>
        </div>
        </div>
        }
    </div>  
  )
}

export default Ranking
