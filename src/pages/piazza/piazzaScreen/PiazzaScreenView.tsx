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
import Avatars from 'src/pages/core/Avatars'
import Popups from 'src/pages/core/Popups'
import SpecificsTradesTitle from 'src/pages/core/specifics/SpecificsTradesTitle'
import { webSocket } from 'src/webSocket.tsx'
import PiazzaDialogsContent from './piazzaDialogs/PiazzaDialogsContent'

interface Props {
  userObj: User
  handleMultiple: (newValue: boolean) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
  multiple: boolean
}

function PiazzaScreenView({
  chattingUser,
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
  console.log(chattingUser)
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
        profileImageUrl,
        defaultProfile,
        profileImage,
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
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          profileImage: profileImage
          // profileColor: profileColor,
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
        piazzaData
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
          ...piazzaData
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
        const defaultProfile = document.data()?.defaultProfile
        const profileImage = document.data()?.profileImage
        const piazzaData = document.data()
        messagesArray.push({
          msg: message,
          // type: 'me',
          userUid: userUid,
          id: userName,
          messageClockNumber: messageClockNumber,
          messageClock: messageClock,
          conversation: null,
          // profileColor: profileColor,
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          profileImage: profileImage || false,
          ...piazzaData
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
        const profileImageUrl = doc.data()?.profileImageUrl
        const defaultProfile = doc.data()?.defaultProfile
        const profileImage = doc.data()?.profileImage
        const piazzaData = doc.data()
        messagesArray.push({
          msg: message,
          // type: 'me',
          userUid: userUid,
          id: userName,
          messageClockNumber: messageClockNumber,
          messageClock: messageClock,
          conversation: null,
          // profileColor: profileColor,
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          profileImage: profileImage || false,
          ...piazzaData
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
      <>
        <div
          ref={boxRef}
          className={`p-1 border-t rounded-xl overflow-auto`}
        >
          <ul>
            {isLoading && <div className='flex justify-center bg-light-2 dark:bg-dark-2 rounded'>로딩</div>}
            {messagesList.map((value, index) => {
              let passingValue
              if (multiple) {
                passingValue = value
              } else {
                console.log(value.userUid === userObj.uid)
                if (value.userUid === value.userOne) {
                  passingValue = {
                    userUid: value.userOne,
                    id: value.userOneDisplayName,
                    profileImage: value.userOneProfileImage,
                    defaultProfile: value.userOneDefaultProfile,
                    profileImageUrl: value.userOneProfileUrl
                  }
                } else {
                  passingValue = {
                    userUid: value.userTwo,
                    id: value.userTwoDisplayName,
                    profileImage: value.userTwoProfileImage,
                    defaultProfile: value.userTwoDefaultProfile,
                    profileImageUrl: value.userTwoProfileUrl
                  }
                }
              }
              let userDirection
              const clock = new Date(value.messageClock)
              if (value.userUid === userObj.uid) {
                userDirection = 'text-right'
              } else {
                userDirection = 'text-left'
              }
              let previousUid
              let passingClock
              let displayClock = 0
              if (index > 0) {
                previousUid = messagesList[index - 1].userUid
              }
              if (index < messagesList.length - 1) {
                if (messagesList[index + 1].userUid === userObj.uid) {
                  passingClock = new Date(messagesList[index + 1].messageClock)
                  if (clock.getFullYear() === passingClock.getFullYear()) {
                    if (clock.getMonth() === passingClock.getMonth()) {
                      if (clock.getDate() === passingClock.getDate()) {
                        if (clock.getHours() === passingClock.getHours()) {
                          if (
                            clock.getMinutes() === passingClock.getMinutes()
                          ) {
                            displayClock = 1
                          }
                        }
                      }
                    }
                  }
                }
              }
              let messageAmpm
              let messageHours = clock.getHours()
              let messageMonth = (clock.getMonth() + 1).toString()
              let messageDate = clock.getDate().toString()
              if (messageHours >= 13) {
                messageAmpm = '오후'
                if (messageHours !== 12) {
                  messageHours = messageHours - 12
                }
              } else {
                messageAmpm = '오전'
                if (messageHours === 0) {
                  messageHours = messageHours + 12
                }
              }
              if (clock.getMonth() + 1 < 10) {
                messageMonth = '0' + messageMonth
              }
              if (messageDate.length === 1) {
                messageDate = '0' + messageDate
              }
              console.log(value)
              return (
                <li
                  key={index}
                  ref={index === continueNumber ? messagesEndRef : null}
                  className={userDirection}
                >
                  {previousUid !== value.userUid && (
                    <div>
                      <div
                        className={`flex justify-${value.userUid !== userObj.uid ? 'start' : 'end'}`}
                      >
                        {userDirection === 'text-left' ? (
                          <div className="flex gap-3">
                            <Popups
                              trigger={
                                <Avatars
                                  element={passingValue}
                                  piazza={() =>
                                    onDrawer({
                                      userUid: passingValue.userUid,
                                      displayName: passingValue.id,
                                    })
                                  }
                                  profile={false}
                                // uid={userObj.uid}
                                // profileColor=""
                                // profileUrl={value.profileImageUrl}
                                // defaultProfileUrl={value.profileImageUrl}
                                // uid={userObj.uid}
                                // profile={false}
                                // profileColor=""
                                // profileUrl={value?.profileImageUrl}
                                // piazza={() =>
                                //   onDrawer({
                                //     userUid: value.userUid,
                                //     displayName: value.id,
                                //   })
                                // }
                                />
                              }
                              title={<SpecificsTradesTitle />}
                              content={<PiazzaDialogsContent
                                initiateContinuing={() => setContinuing(null)}
                                multiple={multiple}
                                handleMultiple={handleMultiple}
                                user={user}
                                userObj={userObj}
                                handleMessagesList={handleMessagesList}
                                displayedName={displayedName}
                              />}
                            />
                            {/* <Avatars
                              uid={userObj.uid}
                              profile={false}
                              profileColor=""
                              profileUrl={value?.profileImageUrl}
                              piazza={() =>
                                onDrawer({
                                  userUid: value.userUid,
                                  displayName: value.id,
                                })
                              }
                            /> */}
                            {/* <Avatar onClick={() => {
                              document.getElementById('drawer')?.click()
                              onPrivate({ userUid: value.userUid, displayName: value.id })
                            }} className={'bg-profile-blue'}>
                              <AvatarImage src={value?.profileImageUrl} />
                              <AvatarFallback className='text-xl border-none	'>{value?.id[0]}</AvatarFallback>
                            </Avatar> */}
                            <div>{value.id}</div>
                          </div>
                        ) : (
                          <div className="flex gap-3">
                            <div>{value.id}</div>
                            <Popups
                              trigger={
                                <Avatars
                                  element={passingValue}
                                  piazza={() =>
                                    onDrawer({
                                      userUid: passingValue.userUid,
                                      displayName: passingValue.id,
                                    })
                                  }
                                  profile={false}
                                // uid={userObj.uid}
                                // profileColor=""
                                // profileUrl={value.profileImageUrl}
                                // defaultProfileUrl={value.defaultProfile}
                                />
                              }
                              title={<SpecificsTradesTitle />}
                              content={<PiazzaDialogsContent
                                initiateContinuing={() => setContinuing(null)}
                                multiple={multiple}
                                handleMultiple={handleMultiple}
                                user={user}
                                userObj={userObj}
                                handleMessagesList={handleMessagesList}
                                displayedName={displayedName}
                              />}
                            />
                            {/* <Avatars
                              uid={userObj.uid}
                              profile={false}
                              profileColor=""
                              profileUrl={value?.profileImageUrl}
                              piazza={() =>
                                onDrawer({
                                  userUid: value.userUid,
                                  displayName: value.id,
                                })
                              }
                            /> */}
                            {/* <Avatar onClick={() => {
                              document.getElementById('drawer')?.click()
                              onPrivate({ userUid: value.userUid, displayName: value.id })
                            }} className={'bg-profile-blue'}>
                              <AvatarImage src={value?.profileImageUrl} />
                              <AvatarFallback className='text-xl border-none	'>{value?.id[0]}</AvatarFallback>
                            </Avatar> */}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {value.userUid !== userObj.uid ? (
                    <div className="flex gap-3 justify-start">
                      <div className="other rounded-tr-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1">
                        {value.msg}
                      </div>
                      <div>
                        {clock.getFullYear()}-{messageMonth}-{messageDate}{' '}
                        {languages === 'ko' && messageAmpm} {messageHours}:
                        {clock.getMinutes() < 10 && '0'}
                        {clock.getMinutes()}
                        {languages === 'en' && (messageAmpm === '오전' ? 'am' : 'pm')}
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3 justify-end">
                      <div>
                        {clock.getFullYear()}-{messageMonth}-{messageDate}{' '}
                        {languages === 'ko' && messageAmpm} {messageHours}:
                        {clock.getMinutes() < 10 && '0'}
                        {clock.getMinutes()}
                        {languages === 'en' && (messageAmpm === '오전' ? 'am' : 'pm')}
                      </div>
                      <div className="me rounded-tl-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1">
                        {value.msg}
                      </div>
                    </div>
                  )}
                </li>
              )
            })}
            <li ref={messagesEndRef} />
          </ul>
        </div>
      </>
      {/* <PiazzaDialogs
        multiple={multiple}
        handleMultiple={handleMultiple}
        user={user}
        userObj={userObj}
        handleMessagesList={handleMessagesList}
        displayedName={displayedName}
        initiateContinuing={() => setContinuing(null)}
      /> */}
    </>
  )
}

export default PiazzaScreenView
