import { useState, useEffect, useLayoutEffect } from 'react'
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { User } from 'firebase/auth';
import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chip from '@mui/material/Chip';

interface Props {
  userObj: User
  chattings: {}
  handleChattings: ({}) => void
}

const Chats = ({ userObj, profileUrl, conversation, displayName, chattingUid, multiple, clock, message }: Props) => {
  let messageAmpm
  let messageHours = clock.getHours()
  let messageMonth = (clock.getMonth()+1).toString()
  let messageDate = (clock.getDate()).toString()
  if (messageHours >= 13) {
    messageAmpm = '오후'
    if (messageHours !== 12) {
      messageHours = messageHours-12
    }
  } else {
    messageAmpm = '오전'
    if (messageHours === 0) {
      messageHours = messageHours+12
    }
  }
  if (clock.getMonth() < 10) {
    messageMonth = '0'+messageMonth
  } 
  if (messageDate.length === 1) {
    messageDate = '0'+messageDate
  } 

  return (
    <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
      <CardActionArea>
        <Link to='/piazza' state={{
          conversation: conversation, 
          displayName: displayName, 
          userUid: userObj.uid, 
          chattingUid: chattingUid,
          multiple: false,
        }}>
          <div className='flex p-3'>
            <div className=''>
              <Avatar>
                <AvatarImage src={multiple ? "https://github.com/shadcn.png" : profileUrl} />
                <AvatarFallback>{multiple ? "CN" : displayName[0]}</AvatarFallback>
                {/* {multiple ? 
                  :
                  <AvatarImage src={profileUrl} />
                  <AvatarFallback>CN</AvatarFallback>
                } */}
              </Avatar>
            </div>
            <div className='flex flex-col w-screen'>
              <div className='flex justify-between'>
                <div className='px-3'>단체 대화</div> 
                <div className='flex flex-col px-3'>
                  <div className='flex justify-end'>{clock.getFullYear()}-{messageMonth}-{messageDate} {messageAmpm} {messageHours}:{clock.getMinutes()}</div>
                </div>
              </div>
              <div className='flex justify-between px-3'>
                <div>{message?.message}</div>
                {message?.piazzaChecked.indexOf(userObj.uid) === -1 &&
                  <div>
                    <Chip sx={{height: '20px'}} label={'새 대화'} color='primary'/>
                  </div>
                }
              </div>
            </div>
          </div>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default Chats