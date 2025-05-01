import { User } from 'firebase/auth'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import { webSocket } from 'src/webSocket.tsx'
import PiazzaScreenView from './PiazzaScreenView'

interface Props {
  isKeyboardOpen: boolean
  userObj: User
  handleMultiple: (newValue: boolean) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
  multiple: boolean
}

function PiazzaScreen({
  isKeyboardOpen,
  userObj,
  multiple,
  handleMultiple,
  messagesList,
  handleMessagesList,
}: Props) {
  const messagesEndRef = useRef(null)
  const boxRef = useRef(null)
  const [user, setUser] = useState(null)
  const [displayedName, setDisplayedName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [continuing, setContinuing] = useState(null)
  const [continueNumber, setContinueNumber] = useState(0)
  const profileColor = useSelector((state) => state.profileColor.value)
  const profileUrl = useSelector((state) => state.profileUrl.value)
  const { state } = useLocation()
  const conversation = state?.conversation
  const languages = useSelectors((state) => state.languages.value)
  const onPrivate = async ({ userUid, displayName }) => {
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setDisplayedName(displayName)
  }
  const onDrawer = ({ userUid, displayName }) => {
    document.getElementById('drawer')?.click()
    onPrivate({ userUid: userUid, displayName: displayName })
  }
  const scrollNumber = 20
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
      } = message
      handleMessagesList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? 'private' : 'other',
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null,
          profileImageUrl: profileUrl,
          profileColor: profileColor,
        },
      ])
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
      } = message
      handleMessagesList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? 'private' : 'other',
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null,
        },
      ])
    }
    webSocket.on(`sMessage${conversation}`, sMessageCallback)
    return () => {
      webSocket.off(`sMessage${conversation}`, sMessageCallback)
    }
  }, [])
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant', // Optional if you want to skip the scrolling animation
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
    // if (!continuing) {
    // }

    const checkMessage = async () => {
      if (multiple) {
        const piazzaRef = collection(dbservice, 'chats_group')
        const piazzaCollection = query(
          piazzaRef,
          orderBy('messageClockNumber', 'desc'),
          limit(1),
        )
        const piazzaMessages = await getDocs(piazzaCollection)
        piazzaMessages.forEach(async (document) => {
          const myDocRef = doc(dbservice, `chats_group/${document.id}`)
          const myDocSnap = await getDoc(myDocRef)
          const myChattings = myDocSnap.data()
          const piazzaCheckedList = myChattings.piazzaChecked || []
          if (piazzaCheckedList.indexOf(userObj.uid) === -1) {
            piazzaCheckedList.splice(-1, userObj.uid, 0)
            piazzaCheckedList.push(userObj.uid)
            await updateDoc(myDocRef, {
              ...myChattings,
              piazzaChecked: piazzaCheckedList,
            })
          }
        })
      } else {
        const myDocRef = doc(dbservice, `members/${userObj.uid}`)
        const myDocSnap = await getDoc(myDocRef)
        const myChattings = myDocSnap.data().chattings
        myChattings[conversation].messageCount = 0
        await updateDoc(myDocRef, {
          chattings: myChattings,
        })
      }
    }
    checkMessage()
  }, [messagesList])
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }
  useEffect(() => {
    const messageList = async () => {
      const messagesArray = []
      const messageRef = collection(dbservice, 'chats_group')
      const messagesCollection = query(
        messageRef,
        orderBy('messageClockNumber', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const messages = await getDocs(messagesCollection)
      if (!messages.docs.length) {
        setContinueNumber(messages.docs.length)
      }
      messages.forEach((document) => {
        if (messagesArray.length === messages.docs.length - 1) {
          setContinuing(document)
          setContinueNumber(messages.docs.length - 1)
        }
        const message = document.data().message
        const userUid = document.data().userUid
        const userName = document.data().userName
        const messageClock = document.data().messageClock
        const messageClockNumber = document.data().messageClockNumber
        const profileColor = document.data()?.profileColor
        const profileImageUrl = document.data()?.profileImageUrl
        messagesArray.push({
          msg: message,
          type: 'me',
          userUid: userUid,
          id: userName,
          messageClockNumber: messageClockNumber,
          messageClock: messageClock,
          conversation: null,
          profileColor: profileColor,
          profileImageUrl: profileImageUrl,
        })
      })
      messagesArray.reverse()
      handleMessagesList([...messagesArray, ...messagesList])
      setIsLoading(false)
    }
    const messageListMembers = async (conversation) => {
      const messageRef = collection(dbservice, `chats_${conversation}`)
      const messagesCollection = query(
        messageRef,
        orderBy('messageClockNumber', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const messages = await getDocs(messagesCollection)
      const messagesArray = []
      if (!messages.docs.length) {
        setContinueNumber(messages.docs.length)
      }
      messages.forEach((doc, index) => {
        if (messagesArray.length === messages.docs.length - 1) {
          setContinuing(doc)
          setContinueNumber(messages.docs.length - 1)
        }
        const message = doc.data().message
        const userUid = doc.data().userUid
        const userName = doc.data().userName
        const messageClock = doc.data().messageClock
        const messageClockNumber = doc.data().messageClockNumber || 0
        messagesArray.push({
          msg: message,
          type: 'me',
          userUid: userUid,
          id: userName,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
        })
      })
      messagesArray.reverse()
      handleMessagesList([...messagesArray, ...messagesList])
      setIsLoading(false)
    }
    if (!conversation) {
      if (isLoading || !messagesList.length) {
        messageList()
      }
    } else {
      if (isLoading || !messagesList.length) {
        messageListMembers(conversation)
      }
    }
  }, [isLoading, conversation])
  // console.log(isLoading)
  const handleScroll = () => {
    if (
      // boxRef.current.getBoundingClientRect().height + Math.round(boxRef.current.scrollTop) !==
      // boxRef.current.offsetHeight ||
      boxRef.current.scrollTop !== 0 ||
      isLoading
    ) {
      // console.log(document.documentElement.offsetHeight);
      return
    } else {
      console.log('scroll')
      setIsLoading(true)
    }
  }
  useEffect(() => {
    boxRef.current?.addEventListener('scroll', handleScroll)
    return () => boxRef.current?.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  return (
    <>
      {isKeyboardOpen ?
        <div className='fixed bottom-[50px] w-screen h-full top-[65px] bg-light-3 dark:bg-dark-3 flex flex-col'>
          <PiazzaScreenView isKeyboardOpen={isKeyboardOpen} userObj={userObj} multiple={multiple} handleMultiple={handleMultiple} messagesList={messagesList} handleMessagesList={handleMessagesList} />
          {/* <PiazzaDialogs
            multiple={multiple}
            handleMultiple={handleMultiple}
            user={user}
            userObj={userObj}
            handleMessagesList={handleMessagesList}
            displayedName={displayedName}
            initiateContinuing={() => setContinuing(null)}
          /> */}
        </div>
        :
        <div className='fixed bottom-[110px] w-screen h-[65%] top-[150px] bg-light-3 dark:bg-dark-3 flex flex-col'>
          <PiazzaScreenView isKeyboardOpen={isKeyboardOpen} userObj={userObj} multiple={multiple} handleMultiple={handleMultiple} messagesList={messagesList} handleMessagesList={handleMessagesList} />
        </div>
      }
    </>
  )
}

export default PiazzaScreen
