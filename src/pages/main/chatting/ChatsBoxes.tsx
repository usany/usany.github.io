import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { User } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chip from '@mui/material/Chip';
import staticImage from 'src/assets/blue.png';
interface Props {
  userObj: User
  profileUrl: string
  displayName: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[],
    messageCount: number,
  }
}

const ChatsBoxes = ({ userObj, profileUrl, displayName, multiple, clock, message }: Props) => {
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
  if (clock.getMonth()+1 < 10) {
    messageMonth = '0'+messageMonth
  } 
  if (messageDate.length === 1) {
    messageDate = '0'+messageDate
  }

  return (
    <div className='flex p-3'>
      <Avatar>
        <AvatarImage src={multiple ? staticImage : profileUrl} />
        <AvatarFallback>{multiple ? "CN" : displayName[0]}</AvatarFallback>
      </Avatar>
      <div className='flex flex-col w-screen'>
        <div className='flex justify-between'>
          <div className='w-1/2 px-3 overflow-hidden'>{multiple ? '단체 대화' : displayName}</div> 
          <div className='flex flex-col px-3'>
            <div className='flex justify-end'>{clock.getFullYear()}-{messageMonth}-{messageDate} {messageAmpm} {messageHours}:{clock.getMinutes() < 10 && '0'}{clock.getMinutes()}</div>
          </div>
        </div>
        <div className='flex justify-between px-3'>
          <div>{message?.message}</div>
          <div>
            {message?.piazzaChecked && message?.piazzaChecked.indexOf(userObj.uid) === -1 &&
              <Chip sx={{height: '20px'}} label={'새 대화'} color='primary'/>
            }
            {message?.messageCount > 0 &&
              <Chip sx={{height: '20px'}} label={message.messageCount} color='primary'/>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatsBoxes