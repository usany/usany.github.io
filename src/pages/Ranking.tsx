import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import StarBorder from '@mui/icons-material/StarBorder';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Settings from '@mui/icons-material/Settings';
import People from '@mui/icons-material/People';
import PermMedia from '@mui/icons-material/PermMedia';
import Dns from '@mui/icons-material/Dns';
import Public from '@mui/icons-material/Public';
import { Link } from 'react-router-dom'

function Ranking({ isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setBottomNavigation, profileColor }) {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            uid: document.uid,
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
        // if (newArray[newArrayLength-1].id === userObj.uid) {
        //   console.log(newArray)
        //   const rankerArray = [{
        //     id: userObj.id,
        //     ...document.data(),
        //     newArrayLength
        //   }]
        //   setRanker(rankerArray)
        // }
    })
  }, [])
  
  useEffect(() => {
    setBottomNavigation(5)
  })

  return (
    <div className='flex flex-col pb-20'>
      <InboxIcon />
      <DraftsIcon />
      <SendIcon />
      <StarBorder />
      <ImageIcon />
      <WorkIcon />
      <FolderIcon />
      <DeleteIcon />
      <Settings />
      <People />
      <PermMedia />
      <Dns />
      <Public />
      <div className='flex text-2xl p-5'>
          유저 랭킹
      </div>
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
                <div key={index} className={'flex ranking-'+String(index+1)}>
                    <ListItem>
                      <div className='px-5'>
                        {/* {rank.indexOf(element)+1} */}
                        {index+1}
                      </div>
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
                      {/* <ListItemText
                        primary={element.displayName}
                        secondary={
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {element.points}
                            </Typography>
                        }
                      /> */}
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
              )
            })}
          {/* <div>{ranker[1].rank}</div> */}
          {/* {ranker.map((element, index) => {
            return (
            )
          })} */}
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
                      <div className='flex'>
                        <div className='px-5'>
                          {/* {rank.indexOf(element)+1} */}
                          {index+1}
                        </div>
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
                      {/* <ListItemText
                        primary={element.displayName}
                        secondary={
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {element.points}
                            </Typography>
                        }
                      /> */}
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
        </List>
        </div>
    </div>  
  )
}

export default Ranking
