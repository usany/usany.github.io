import { useState, useEffect, useLayoutEffect, Suspense } from 'react'
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import {
  collection,
  query,
  where,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  deleteDoc,
  updateDoc,
  limit,
} from 'firebase/firestore'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { User } from 'firebase/auth'
import ChattingStacks from 'src/pages/main/chatting/ChattingStacks'
import Chats from 'src/pages/main/chatting/Chats'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedList } from 'src/components/ui/animated-list'
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material'
import { useGetPiazzaQuery } from 'src/stateSlices/piazza'

interface Props {
  userObj: User
}
const MessageStacks = ({ userObj }: Props) => {
  const [piazzaMessage, setPiazzaMessage] = useState<{
    username: string
    message: string
  } | null>(null)
  // const [chattings, setChattings] = useState({})
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
  const { data, error, isLoading } = useGetPiazzaQuery('query')

  const piazza = async () => {
    const piazzaRef = collection(dbservice, 'chats_group')
    const piazzaCollection = query(
      piazzaRef,
      orderBy('messageClockNumber', 'desc'),
      limit(1),
    )
    const piazzaMessages = await getDocs(piazzaCollection)
    return piazzaMessages
  }
  const piazzaSwitch = useSelector<boolean>((state) => state.piazzaSwitch.value)

  const messages = useQuery({
    queryKey: ['messages'],
    queryFn: piazza,
    suspense: true,
  })
  useEffect(() => {
    if (piazzaSwitch === 'true') {
      messages.data?.forEach((doc) => {
        if (!piazzaMessage) {
          setPiazzaMessage({
            username: doc.data().userName,
            messageClock: doc.data().messageClock,
            messageClockNumber: doc.data().messageClockNumber,
            message: doc.data().message,
            piazzaChecked: doc.data().piazzaChecked || [],
          })
        }
      })
    }
  })
  useEffect(() => {
    if (!webSocket) return
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, conversation } = message
      console.log(msg)
      setPiazzaMessage({
        message: msg,
        messageClock: messageClock,
        username: id,
        piazzaChecked: [id],
      })
    }
    webSocket.on('sMessagePiazza', sMessageCallback)
    return () => {
      webSocket.off('sMessagePiazza', sMessageCallback)
    }
  }, [])

  const clock = new Date(piazzaMessage?.messageClock)

  return (
    <>
      <ClickAwayListener
        onClickAway={() => {
          setLongPressChat(null)
          setOnLongPress(0)
        }}
      >
        <div>
          <AnimatedList>
            {piazzaSwitch === 'true' && (
              <Chats
                userObj={userObj}
                profileUrl={''}
                conversation={''}
                displayName={''}
                chattingUid={''}
                multiple={true}
                clock={clock}
                message={piazzaMessage}
                longPressChat={longPressChat}
                changeLongPressChat={(newValue) => setLongPressChat(newValue)}
                onLongPress={onLongPress}
                changeOnLongPress={(newValue) => setOnLongPress(newValue)}
              />
            )}
          </AnimatedList>
          <ChattingStacks
            userObj={userObj}
            longPressChat={longPressChat}
            changeLongPressChat={(newValue) => setLongPressChat(newValue)}
            onLongPress={onLongPress}
            changeOnLongPress={(newValue) => setOnLongPress(newValue)}
          />
        </div>
      </ClickAwayListener>
    </>
  )
}

export default MessageStacks
