import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import ChattingStacks from 'src/pages/core/chatting/ChattingStacks'

interface Props {
  userObj: User
}
const MessageStacks = ({ userObj }: Props) => {
  // const [piazzaMessage, setPiazzaMessage] = useState<{
  //   username: string
  //   message: string
  // } | null>(null)
  // const [chattings, setChattings] = useState({})
  const [longPressChat, setLongPressChat] = useState(null)
  const [longPressChatsList, setLongPressChatsList] = useState([])
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
  // const { data, error, isLoading } = useGetPiazzaQuery('query')
  // const piazza = async () => {
  //   const piazzaRef = collection(dbservice, 'chats_group')
  //   const piazzaCollection = query(
  //     piazzaRef,
  //     orderBy('messageClockNumber', 'desc'),
  //     limit(1),
  //   )
  //   const piazzaMessages = await getDocs(piazzaCollection)
  //   return piazzaMessages
  // }
  // const piazzaSwitch = useSelector<boolean>((state) => state.piazzaSwitch.value)

  // const messages = useQuery({
  //   queryKey: ['messages'],
  //   queryFn: piazza,
  //   suspense: true,
  // })
  // useEffect(() => {
  //   const piazza = async () => {
  //     const piazzaRef = collection(dbservice, 'chats_group')
  //     const piazzaCollection = query(
  //       piazzaRef,
  //       orderBy('messageClockNumber', 'desc'),
  //       limit(1),
  //     )
  //     const piazzaMessages = await getDocs(piazzaCollection)
  //     piazzaMessages.forEach((doc) => {
  //       if (!piazzaMessage) {
  //         setPiazzaMessage({
  //           username: doc.data().userName,
  //           messageClock: doc.data().messageClock,
  //           messageClockNumber: doc.data().messageClockNumber,
  //           message: doc.data().message,
  //           piazzaChecked: doc.data().piazzaChecked || [],
  //         })
  //       }
  //     })
  //   }
  //   if (piazzaSwitch === 'true') {
  //     piazza()
  //   }
  // })
  // useEffect(() => {
  //   if (!webSocket) return
  //   function sMessageCallback(message) {
  //     const { msg, userUid, id, target, messageClock, conversation } = message
  //     console.log(msg)
  //     setPiazzaMessage({
  //       message: msg,
  //       messageClock: messageClock,
  //       username: id,
  //       piazzaChecked: [id],
  //     })
  //   }
  //   webSocket.on('sMessagePiazza', sMessageCallback)
  //   return () => {
  //     webSocket.off('sMessagePiazza', sMessageCallback)
  //   }
  // }, [])

  // const clock = new Date(piazzaMessage?.messageClock)

  return (
    <>
      <div>
        <div>
          {/* <AnimatedList>
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
                longPressChatsList={longPressChatsList}
                changeLongPressChat={(newValue) => setLongPressChat(newValue)}
                changeLongPressChatsList={(newValue) => setLongPressChatsList(newValue)}
                onLongPress={onLongPress}
                changeOnLongPress={(newValue) => setOnLongPress(newValue)}
              />
            )}
          </AnimatedList> */}
          <ChattingStacks
            userObj={userObj}
            longPressChat={longPressChat}
            longPressChatsList={longPressChatsList}
            changeLongPressChat={(newValue) => setLongPressChat(newValue)}
            changeLongPressChatsList={(newValue) => setLongPressChatsList(newValue)}
            onLongPress={onLongPress}
            changeOnLongPress={(newValue) => setOnLongPress(newValue)}
          />
        </div>
      </div>
    </>
  )
}

export default MessageStacks
