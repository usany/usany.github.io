import { useAutoAnimate } from '@formkit/auto-animate/react'
import { User } from 'firebase/auth'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Chats from 'src/pages/core/chatting/Chats'
import { webSocket } from 'src/webSocket.tsx'
import { usePiazzaMessage } from './usePiazzaMessage'

interface Props {
  userObj: User
}

const ChattingStacks = ({
  userObj,
  chattings,
  changeChattings,
  sorted,
}: Props) => {
  const [longPressChat, setLongPressChat] = useState(null)
  const [longPressChatsList, setLongPressChatsList] = useState([])
  const changeLongPressChat = (newValue) => setLongPressChat(newValue)
  const changeLongPressChatsList = (newValue) => setLongPressChatsList(newValue)
  const [onLongPress, setOnLongPress] = useState(0)
  const changeOnLongPress = (newValue) => setOnLongPress(newValue)
  const [list] = useAutoAnimate()

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

  const piazzaSwitch = useSelector<boolean>((state) => state.piazzaSwitch.value)
  if (piazzaSwitch === 'true') {
    if (sorted.indexOf('piazza') === -1) {
      sorted.splice(0, 0, 'piazza')
    }
  }
  const { piazzaMessage, changePiazzaMessage } = usePiazzaMessage()

  useEffect(() => {
    if (!webSocket) return
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, conversation } = message
      changePiazzaMessage({
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

  useEffect(() => {
    if (!webSocket) return
    function sMessageCallback(message) {
      const {
        msg,
        userUid,
        id,
        target,
        messageClock,
        messageClockNumber,
        conversation,
        conversationUid,
        conversationName,
        profileUrl,
      } = message
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      let userOneProfileUrl
      let userTwoProfileUrl
      const messageCount = chattings[conversation].messageCount + 1
      if (userUid < conversationUid) {
        userOne = userUid
        userTwo = conversationUid
        userOneDisplayName = id
        userTwoDisplayName = conversationName
        userOneProfileUrl = profileUrl
      } else {
        userOne = conversationUid
        userTwo = userUid
        userOneDisplayName = conversationName
        userTwoDisplayName = id
        userTwoProfileUrl = profileUrl
      }
      const replaceObj = {
        userUid: userUid,
        userName: id,
        userOne: userOne,
        userOneDisplayName: userOneDisplayName,
        userTwo: userTwo,
        userTwoDisplayName: userTwoDisplayName,
        message: msg,
        messageClock: messageClock,
        messageClockNumber: messageClockNumber,
        userOneProfileUrl: userOneProfileUrl,
        userTwoProfileUrl: userTwoProfileUrl,
        messageCount: messageCount,
      }
      const newChattings = { ...chattings, [conversation]: replaceObj }
      changeChattings(newChattings)
    }
    sorted.map((element) => {
      if (element !== 'piazza') {
        webSocket.on(`sMessage${element}`, sMessageCallback)
        return () => {
          webSocket.off(`sMessage${element}`, sMessageCallback)
        }
      }
    })
  })
  useEffect(() => {
    if (!webSocket) return
    function sNewMessageCallback(message) {
      const {
        msg,
        userUid,
        id,
        target,
        messageClock,
        messageClockNumber,
        conversation,
        conversationUid,
        conversationName,
      } = message
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      const messageCount = chattings[conversation].messageCount
      if (userUid < conversationUid) {
        userOne = userUid
        userTwo = conversationUid
        userOneDisplayName = id
        userTwoDisplayName = conversationName
      } else {
        userOne = conversationUid
        userTwo = userUid
        userOneDisplayName = conversationName
        userTwoDisplayName = id
      }
      const replaceObj = {
        userUid: userUid,
        userName: id,
        userOne: userOne,
        userOneDisplayName: userOneDisplayName,
        userTwo: userTwo,
        userTwoDisplayName: userTwoDisplayName,
        message: msg,
        messageClock: messageClock,
        messageClockNumber: messageClockNumber,
        messageCount: messageCount,
      }
      const newChattings = { ...chattings, [conversation]: replaceObj }
      changeChattings(newChattings)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback)
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback)
    }
  })
  return (
    <div ref={list}>
      {sorted.map((element, index) => {
        if (element === 'piazza') {
          const clock = new Date(piazzaMessage?.messageClock)
          return (
            <>
              <Chats
                userObj={userObj}
                profileUrl={''}
                conversation={element}
                displayName={''}
                chattingUid={''}
                multiple={true}
                clock={clock}
                message={piazzaMessage}
                longPressChat={longPressChat}
                longPressChatsList={longPressChatsList}
                changeLongPressChat={changeLongPressChat}
                changeLongPressChatsList={changeLongPressChatsList}
                onLongPress={onLongPress}
                changeOnLongPress={changeOnLongPress}
                sorted={sorted}
                chattings={chattings}
                changeChattings={changeChattings}
              />
            </>
          )
        } else {
          const clock = new Date(chattings[element].messageClock)
          if (chattings[element]) {
            let displayName
            let chattingUid
            let profileUrl
            if (userObj.uid === chattings[element].userOne) {
              displayName = chattings[element].userTwoDisplayName
              chattingUid = chattings[element].userTwo
              profileUrl = chattings[element].userTwoProfileUrl
            } else {
              displayName = chattings[element].userOneDisplayName
              chattingUid = chattings[element].userOne
              profileUrl = chattings[element].userOneProfileUrl
            }
            return (
              <>
                <Chats
                  userObj={userObj}
                  profileUrl={profileUrl}
                  conversation={element}
                  displayName={displayName}
                  chattingUid={chattingUid}
                  multiple={false}
                  clock={clock}
                  message={chattings[element]}
                  longPressChat={longPressChat}
                  longPressChatsList={longPressChatsList}
                  changeLongPressChat={changeLongPressChat}
                  changeLongPressChatsList={changeLongPressChatsList}
                  onLongPress={onLongPress}
                  changeOnLongPress={changeOnLongPress}
                  sorted={sorted}
                  chattings={chattings}
                  changeChattings={changeChattings}
                />
              </>
            )
          }
        }
      })}
    </div>
  )
}

export default ChattingStacks
