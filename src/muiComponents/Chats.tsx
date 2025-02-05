import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';
import { Link } from 'react-router-dom'
import { User } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chip from '@mui/material/Chip';
import staticImage from 'src/assets/blue.png';
import useLongPress from 'src/hooks/useLongPress';
import ChatsBoxes from 'src/muiComponents/ChatsBoxes'
import DeleteIcon from '@mui/icons-material/Delete';
import { dbservice } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { changePiazzaSwitch } from 'src/stateSlices/piazzaSwitchSlice';

interface Props {
  userObj: User
  profileUrl: string
  conversation: string
  displayName: string
  chattingUid: string
  multiple: boolean
  clock: Date
  message: {
    message: string
    piazzaChecked: string[],
    messageCount: number,
  }
}


const Chats = ({ userObj, profileUrl, conversation, displayName, chattingUid, multiple, clock, message, longPressChat, changeLongPressChat, onLongPress, changeOnLongPress, onDelete }: Props) => {
  const [longPressed, setLongPressed] = useState(false)
  const dispatch = useDispatch()
  const chatsRef = useRef()
  useLongPress(chatsRef, () => {
    if (longPressChat && !onLongPress) {
      setLongPressed(true)
      changeOnLongPress(onLongPress+1)
    }
  })
  useEffect(() => {
    if (!longPressChat && !onLongPress) {
      setLongPressed(false)
      changeOnLongPress(0)
    }
  }, [longPressChat, onLongPress])
  
  return (
    <div className={`${longPressed && 'flex py-5'}`}>
    <ClickAwayListener onClickAway={() => {
      changeLongPressChat(null)
      changeOnLongPress(0)
    }}>
    <div ref={chatsRef} className={`${longPressed && 'longPress w-5/6 py-5'}`}
      onMouseDownCapture={() => {
        const longPress = conversation || 'piazza'
        changeLongPressChat(longPress)
      }}
      // onMouseUp={() => {
      //   setPressed(true)
      // }}
      onTouchStartCapture={() => {
        const longPress = conversation || 'piazza'
        changeLongPressChat(longPress)
      }}
    >
      <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CardActionArea>
          {!onLongPress ?
          <Link to='/piazza' state={{
            conversation: conversation, 
            displayName: displayName, 
            userUid: userObj.uid, 
            chattingUid: chattingUid,
            multiple: multiple,
          }}>
            <ChatsBoxes userObj={userObj} profileUrl={profileUrl} displayName={displayName} multiple={multiple} clock={clock} message={message} />
          </Link>
          :
          <div
            onClick={() => {
              if (onLongPress) {
                setLongPressed(!longPressed)
                if (longPressed) {
                  changeOnLongPress(onLongPress-1)
                } else {
                  changeOnLongPress(onLongPress+1)
                }
              }
            }}
          >
            <ChatsBoxes userObj={userObj} profileUrl={profileUrl} displayName={displayName} multiple={multiple} clock={clock} message={message} />
          </div>
          }
        </CardActionArea>
      </Card>
    </div>
    </ClickAwayListener>
    {longPressed && 
      // <>
      //   {conversation ?
      //     <div className='h-full' onClick={() => onDelete({conversation: conversation})}>
      //       <Chip label={<DeleteIcon />} color='error'/>
      //     </div>
      //   :
      //     <div className='h-full' onClick={() => {
      //       if (conversation) {
      //         onDelete({conversation: conversation})
      //       } else {
      //         dispatch(changePiazzaSwitch('false'))
      //       }
      //     }}>
      //       <Chip label={<DeleteIcon />} color='error'/>
      //     </div>
      //   }
      // </>
      <div className='h-full' onClick={() => {
        if (conversation) {
          onDelete({conversation: conversation})
        } else {
          dispatch(changePiazzaSwitch('false'))
        }
      }}>
        <Chip label={<DeleteIcon />} color='error'/>
      </div>
    }
    </div>
  )
}

export default Chats