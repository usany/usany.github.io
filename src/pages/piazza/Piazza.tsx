import { User } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import PiazzaForm from 'src/pages/piazza/piazzaForm/PiazzaForm'
import PiazzaScreen from 'src/pages/piazza/piazzaScreen/PiazzaScreen'
import PiazzaTitle from 'src/pages/piazza/piazzaTitle/PiazzaTitle'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import PiazzaMorphingDialogAudioCall from './components/PiazzaMorphingDialogAudioCall'
import PiazzaMorphingDialogVideoCall from './components/PiazzaMorphingDialogVideoCall'

interface Props {
  userObj: User
}
function Piazza({ userObj }: Props) {
  const [messages, setMessages] = useState('')
  const [messagesList, setMessagesList] = useState<[]>([])
  const dispatch = useDispatch()
  const { state } = useLocation()
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [chattingUser, setChattingUser] = useState(null)
  const [chatUid, setChatUid] = useState('')
  const [chatDisplayName, setChatDisplayName] = useState('')
  const [searchParams] = useSearchParams()
  const handleChatUid = (newValue: string) => {
    setChatUid(newValue)
  }
  const handleChatDisplayName = (newValue: string) => {
    setChatDisplayName(newValue)
  }
  const conversation = location.search.slice(location.search.indexOf('=') + 1)
  useEffect(() => {
    if (state) {
      setChatUid(state.chattingUid)
      setChatDisplayName(state.displayName)
    } else {
      setChatUid('')
      setChatDisplayName('')
    }
  }, [conversation])
  useEffect(() => {
    const bringChattingUser = async () => {
      if (chatUid) {
        const toUserRef = doc(dbservice, `members/${chatUid}`)
        const toUser = await getDoc(toUserRef)
        setChattingUser(toUser.data())
      }
    }
    if (conversation) {
      bringChattingUser()
    }
  }, [conversation, chatUid])
  const piazzaForm = useSelector((state) => state.piazzaForm.value)
  useEffect(() => {
    const listener = () => {
      const newState =
        window.screen.height - 300 >
        (window.visualViewport?.height || window.screen.height)
      if (isKeyboardOpen !== newState) {
        setIsKeyboardOpen(newState)
      }
    }
    window.addEventListener('resize', listener)
    if (typeof visualViewport !== 'undefined') {
      window.visualViewport?.addEventListener('resize', listener)
    }
    visualViewport?.addEventListener('resize', listener)
    if (typeof visualViewport !== 'undefined') {
      visualViewport?.addEventListener('resize', listener)
    }
    return () => {
      if (typeof visualViewport !== 'undefined') {
        window.visualViewport?.removeEventListener('resize', listener)
      }
    }
  }, [isKeyboardOpen])

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  useEffect(() => {
    if (searchParams.get('call') === 'video') {
      document.getElementById('videoCall')?.click()
    }
    if (searchParams.get('call') === 'audio') {
      document.getElementById('audioCall')?.click()
    }
  }, [])
  return (
    <>
      {!isKeyboardOpen && (
        <PiazzaTitle multiple={!conversation} displayName={chatDisplayName} />
      )}
      <PiazzaScreen
        isKeyboardOpen={piazzaForm}
        userObj={userObj}
        messagesList={messagesList}
        handleMessagesList={(newValue) => setMessagesList(newValue)}
        handleChatUid={handleChatUid}
        handleChatDisplayName={handleChatDisplayName}
      />
      <PiazzaForm
        chattingUser={chattingUser}
        userObj={userObj}
        multiple={!conversation}
        messages={messages}
        handleMessages={(newValue) => setMessages(newValue)}
        messagesList={messagesList}
        handleMessagesList={(newValue) => setMessagesList(newValue)}
      />
      <PiazzaMorphingDialogVideoCall
        userObj={userObj}
        chattingUser={chattingUser}
        conversation={conversation}
      />
      <PiazzaMorphingDialogAudioCall
        userObj={userObj}
        chattingUser={chattingUser}
        conversation={conversation}
      />
    </>
  )
}

export default Piazza
