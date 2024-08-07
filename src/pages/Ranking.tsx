import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

function Ranking({ isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter }) {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setRank(newArray)
        const newArrayLength = newArray.length
        newArray.map((document, index) => {
          if (document.id === userObj.uid) {
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
    setValue(5)
  })

  return (
    <div className='flex flex-col pb-20'>
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
                        <Avatar alt={element.displayName} sx={{ bgcolor: blue[500] }} src="./src" />
                      </ListItemAvatar>
                      <div className='flex flex-col overflow-hidden'>
                        <div>
                          {element.displayName}
                        </div>
                        <div>
                          {element.points}
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
      <div className='flex'>
        <div className='flex flex-col justify-center px-5'>
          유저 랭킹
        </div>
        <div className='flex-col'>
          <div>유저 이름</div> 
          <div>포인트</div> 
        </div>
      </div>
        <List sx={{ width: '100%', 
          // maxWidth: 360,
          bgcolor: 'background.paper' }}>
          {rank.map((element, index) => {
                return(
                  <div key={index} className={'flex ranking-'+String(index+1)}>
                    <ListItem>
                      <div className='px-5'>
                        {/* {rank.indexOf(element)+1} */}
                        {index+1}
                      </div>
                      <ListItemAvatar>
                        <Avatar alt={element.displayName} sx={{ bgcolor: blue[500] }} src="./src" />
                      </ListItemAvatar>
                      <div className='flex flex-col overflow-hidden'>
                        <div>
                          {element.displayName}
                        </div>
                        <div>
                          {element.points}
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
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                )
          })}
        </List>
    </div>  
  )
}

export default Ranking
