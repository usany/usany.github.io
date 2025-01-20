import { useState, useEffect, useLayoutEffect, useRef } from 'react'
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';
// import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
// import { webSocket, onClick } from 'src/webSocket.tsx'
// import { useSelector, useDispatch } from 'react-redux'
import { User } from 'firebase/auth';
// import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Chip from '@mui/material/Chip';
// import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import staticImage from 'src/assets/blue.png';
import useLongPress from 'src/hooks/useLongPress';
import ChatsBoxes from 'src/muiComponents/ChatsBoxes'
import DeleteIcon from '@mui/icons-material/Delete';
import { dbservice } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';

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

  const chatsRef = useRef()
  useLongPress(chatsRef, () => {
    if (longPressChat && !onLongPress) {
      setLongPressed(true)
      changeOnLongPress(onLongPress+1)
      console.log('practice')
    }
  })
  // useEffect(() => {
  //   if (longPressChat && longPressChat !== conversation) {
  //     setLongPressed(false)
  //   }
  // }, [longPressChat])
  useEffect(() => {
    if (!longPressChat && !onLongPress) {
      console.log('sample')
      setLongPressed(false)
      changeOnLongPress(0)
    }
  }, [longPressChat, onLongPress])
  
  // const onDelete = async ({ conversation }) => {
    
  //   const userRef = doc(dbservice, `members/${userObj.uid}`)
  //   const userDoc = await getDoc(userRef)
  //   const userChattings = userDoc.data().chattings || {}
  //   const userConversation = userDoc.data().conversation || []
  //   Reflect.deleteProperty(userChattings, conversation)
  //   if (userConversation.indexOf(conversation) !== -1) {
  //     userConversation.splice(userConversation.indexOf(conversation), 1)
  //   }
  //   updateDoc(userRef, {chattings: userChattings});
  //   updateDoc(userRef, {conversation: userConversation});
  // }
  return (
    <div className={`${longPressed && 'flex py-5'}`}>
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
    {longPressed && 
    <div onClick={() => onDelete({conversation: conversation})}>
      <Chip label={<DeleteIcon />} color='error'/>
    </div>
    }
    </div>
  )
}

export default Chats