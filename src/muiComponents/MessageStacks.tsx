import { useState, useEffect, useLayoutEffect, Suspense } from 'react'
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { User } from 'firebase/auth';
import ChattingStacks from 'src/muiComponents/ChattingStacks'
import Chats from 'src/muiComponents/Chats'
import { useQuery } from '@tanstack/react-query'
// import { useSelector, useDispatch } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Badge from '@mui/material/Badge';
// import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedList } from 'src/src/components/ui/animated-list';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';

interface Props {
  userObj: User
}
const MessageStacks = ({ userObj }: Props) => {
  const [piazzaMessage, setPiazzaMessage] = useState<{username: string, message: string} | null>(null)
  const [chattings, setChattings] = useState({})
  const [piazzaUid, setPiazzaUid] = useState('')
  const [longPressChat, setLongPressChat] = useState(null)
  const [onLongPress, setOnLongPress] = useState(0)
  useEffect(() => {
    if (!onLongPress) {
      setLongPressChat(null)
    }
  }, [onLongPress])
  useEffect(() => {
    if (!longPressChat) {
      setOnLongPress(0)
    }
  }, [longPressChat])
  const piazza = async () => {
    const piazzaRef = collection(dbservice, 'chats_group')
    const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
    const piazzaMessages = await getDocs(piazzaCollection)
    return piazzaMessages
  }
  const piazzaSwitch = useSelector<boolean>(state => state.piazzaSwitch.value)

  const messages = useQuery({queryKey: ['messages'], queryFn: piazza, suspense: true})
  useEffect(() => {
    if (piazzaSwitch === 'true') {
      messages.data?.forEach((doc) => {
        if (!piazzaMessage) {
          setPiazzaUid(doc.id)
          setPiazzaMessage({username: doc.data().userName, messageClock: doc.data().messageClock, messageClockNumber: doc.data().messageClockNumber, message: doc.data().message, piazzaChecked: doc.data().piazzaChecked || []})
        }
      })
    }
  })
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, conversation } = message;
      console.log(msg)
      setPiazzaMessage(
        {
          message: msg,
          messageClock: messageClock,
          username: id,
          piazzaChecked: [id]
        }
      );
    }
    webSocket.on("sMessagePiazza", sMessageCallback);
    return () => {
      webSocket.off("sMessagePiazza", sMessageCallback);
    };
  }, []);

  const clock = new Date(piazzaMessage?.messageClock)
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
    <>
      <ClickAwayListener onClickAway={() => {
        setLongPressChat(null)
        setOnLongPress(0)
      }}>
      <div>
      <AnimatedList>
        {piazzaSwitch === 'true' && <Chats userObj={userObj} profileUrl={''} conversation={''} displayName={''} chattingUid={''} multiple={true} clock={clock} message={piazzaMessage} longPressChat={longPressChat} changeLongPressChat={(newValue) => setLongPressChat(newValue)} onLongPress={onLongPress} changeOnLongPress={(newValue) => setOnLongPress(newValue)}/>}
      </AnimatedList>
      <AnimatedList>
        <ChattingStacks userObj={userObj} chattings={chattings} handleChattings={(newValue) => setChattings(newValue)} longPressChat={longPressChat} changeLongPressChat={(newValue) => setLongPressChat(newValue)} onLongPress={onLongPress} changeOnLongPress={(newValue) => setOnLongPress(newValue)}/>
      </AnimatedList>
      </div>
      </ClickAwayListener>
    </>
  );
}

export default MessageStacks