import { useState, useEffect, useLayoutEffect } from 'react'
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
import { useAvatarColorStore, useAvatarImageStore } from 'src/store'
import { storage } from "src/baseApi/serverbase";
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";

function Lists({ elements, multiple, userSearch, loadedImage, loadedImageIndex }) {
  const avatarImage = useAvatarImageStore((state) => state.avatarImage)
  return (
    <div>
      {!userSearch &&
        <div className='flex justify-between w-screen'>
          <div className='flex'>
            <div className='flex flex-col justify-center px-5'>
              {multiple ? '유저':'내'}  랭킹
            </div>
            <div>
              <div>{multiple ? '유저':'내'} 이름</div> 
              <div>포인트</div> 
            </div>
          </div>
          <div className='flex flex-col justify-center px-5'>
            프로필
          </div>
        </div>
      }
    <List sx={{ width: '100%', 
      // maxWidth: 360,
      bgcolor: 'background.paper' }}>
      {elements.map((element, index) => {
        console.log(element)
        console.log(element.displayName)
        // console.log(element.profileImage)
        let userNameConfirm = true
        if (userSearch) {
          for (let number = 0; number < userSearch.length; number++) {
            if (element?.displayName[number] !== userSearch[number]) {
              userNameConfirm = false
            }
          }
        }
        if (userNameConfirm) {
          return (
            <div key={index} className={`flex overflow-hidden ranking-${index+1}`}>
              <ListItem>
                <div className='flex justify-between w-screen'>
                <div className='flex'>
                {!multiple ? 
                <div className='flex flex-col justify-center px-5'>
                  {element.rank}
                </div>
                :
                <div className='flex flex-col justify-center px-5'>
                  {index+1}
                </div>
                }
                <ListItemAvatar>
                  {
                    multiple ?
                    <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src={element?.profileImageUrl || './src'} variant="rounded" />
                    :
                    <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || blue[500] }} src={element?.profileImageUrl || './src'} variant="rounded" />                  
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
                </div>
                <div>
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
                </div>
              </ListItem>
              <Divider variant="inset" component="li" />
            </div>
          )
      }})}
    </List>
    </div>
  )
}

export default Lists
