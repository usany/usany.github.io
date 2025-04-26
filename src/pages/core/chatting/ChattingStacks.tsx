import { User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { dbservice } from 'src/baseApi/serverbase'
import { AnimatedList } from 'src/components/ui/animated-list'
import Chats from 'src/pages/core/chatting/Chats'
import { webSocket } from 'src/webSocket.tsx'

interface Props {
  userObj: User
}

const ChattingStacks = ({
  userObj,
  longPressChat,
  longPressChatsList,
  changeLongPressChat,
  changeLongPressChatsList,
  onLongPress,
  changeOnLongPress,
}: Props) => {
  // const [sortedMyConversationUid, setSortedMyConversationUid] = useState([])
  // const [profileUrls, setProfileUrls] = useState([])
  // const [newMessage, setNewMessage] = useState(true)
  const [chattings, setChattings] = useState({})
  const sorted = Object.keys(chattings).sort((elementOne, elementTwo) => {
    return (
      chattings[elementTwo].messageClockNumber -
      chattings[elementOne].messageClockNumber
    )
  })
  const [piazzaMessage, setPiazzaMessage] = useState<{
    username: string
    message: string
  } | null>(null)

  const piazzaSwitch = useSelector<boolean>((state) => state.piazzaSwitch.value)
  if (piazzaSwitch === 'true') {
    sorted.splice(0, 0, 'piazza')
  }

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
  useEffect(() => {
    const piazza = async () => {
      const piazzaRef = collection(dbservice, 'chats_group')
      const piazzaCollection = query(
        piazzaRef,
        orderBy('messageClockNumber', 'desc'),
        limit(1),
      )
      const piazzaMessages = await getDocs(piazzaCollection)
      piazzaMessages.forEach((doc) => {
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
    if (piazzaSwitch === 'true') {
      piazza()
    }
  })
  // console.log(sorted)
  useEffect(() => {
    const bringChattings = async () => {
      const docRef = doc(dbservice, `members/${userObj.uid}`)
      const docSnap = await getDoc(docRef)
      const newChattings = docSnap.data()?.chattings || {}
      setChattings(newChattings)
    }
    bringChattings()
    // onSnapshot(doc(dbservice, `members/${userObj.uid}`), (snapshot) => {
    //   const newChattings = snapshot.data()?.chattings || {}
    //   if (!sorted.length) {
    //     setChattings(newChattings)
    //   }
    // })
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
      } // const location = chats.map((element) => element.conversation).indexOf(conversation)
      const newChattings = { ...chattings, [conversation]: replaceObj }
      setChattings(newChattings)
    }
    const sorted = Object.keys(chattings).sort((elementOne, elementTwo) => {
      return (
        chattings[elementTwo].messageClockNumber -
        chattings[elementOne].messageClockNumber
      )
    })
    sorted.map((element) => {
      webSocket.on(`sMessage${element}`, sMessageCallback)
      return () => {
        webSocket.off(`sMessage${element}`, sMessageCallback)
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
      setChattings(newChattings)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback)
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback)
    }
  })

  // useEffect(() => {
  //   const sorted = Object.keys(chattings).sort((elementOne, elementTwo) => {return chattings[elementTwo].messageClockNumber-chattings[elementOne].messageClockNumber})
  //   setSortedMyConversationUid(sorted)
  // }, [chattings])

  const onDelete = async ({ conversation }) => {
    const newSortedMyConversationUid = sorted
    newSortedMyConversationUid.splice(sorted.indexOf(conversation), 1)
    // console.log(newSortedMyConversationUid)
    // setSortedMyConversationUid(newSortedMyConversationUid)
    // setNewMessage(true)
    changeLongPressChat(null)
    const userRef = doc(dbservice, `members/${userObj.uid}`)
    const userDoc = await getDoc(userRef)
    const userChattings = userDoc.data().chattings || {}
    const userConversation = userDoc.data().conversation || []
    Reflect.deleteProperty(userChattings, conversation)
    if (userConversation.indexOf(conversation) !== -1) {
      userConversation.splice(userConversation.indexOf(conversation), 1)
    }
    setChattings(userChattings)
    updateDoc(userRef, { chattings: userChattings })
    updateDoc(userRef, { conversation: userConversation })
  }

  return (
    <div className='flex flex-col gap-1'>
      {sorted.map((element, index) => {
        let clock
        if (element === 'piazza') {
          clock = new Date(piazzaMessage?.messageClock)
          return (
            <AnimatedList>
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
                changeLongPressChat={changeLongPressChat}
                changeLongPressChatsList={changeLongPressChatsList}
                onLongPress={onLongPress}
                changeOnLongPress={changeOnLongPress}
              />
            </AnimatedList>
          )
        } else {
          clock = new Date(chattings[element].messageClock)
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
              <AnimatedList>
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
                  onDelete={onDelete}
                />
              </AnimatedList>
            )
          }
        }
      })}
    </div>
  )
}

export default ChattingStacks
