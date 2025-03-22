import { User } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, startAfter, updateDoc } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { dbservice } from 'src/baseApi/serverbase';
import Avatars from "src/pages/core/Avatars";
import PiazzaDialogs from 'src/pages/piazza/piazzaScreen/piazzaDialogs/PiazzaDialogs';
import { webSocket } from 'src/webSocket.tsx';

interface Props {
  userObj: User
  handleMultiple: (newValue: boolean) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
  multiple: boolean
}

function PiazzaScreen({ userObj, multiple, handleMultiple, messagesList, handleMessagesList }: Props) {
  const messagesEndRef = useRef(null);
  const boxRef = useRef(null);
  const [user, setUser] = useState(null)
  const [displayedName, setDisplayedName] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [continuing, setContinuing] = useState(null);
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
  const { state } = useLocation()
  const conversation = state?.conversation

  const onPrivate = async ({ userUid, displayName }) => {
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setDisplayedName(displayName)
  };
  const onDrawer = ({ userUid, displayName }) => {
    document.getElementById('drawer')?.click()
    onPrivate({ userUid: userUid, displayName: displayName })
  }
  const scrollNumber = 10
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation } = message;
      handleMessagesList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? "private" : "other",
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null,
          profileImageUrl: profileUrl,
          profileColor: profileColor
        },
      ]);
    }
    webSocket.on("sMessagePiazza", sMessageCallback);
    return () => {
      webSocket.off("sMessagePiazza", sMessageCallback);
    };
  }, []);
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation } = message;
      handleMessagesList((prev) => [
        ...prev,
        {
          msg: msg,
          type: target ? "private" : "other",
          userUid: userUid,
          id: id,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          conversation: null
        },
      ]);
    }
    webSocket.on(`sMessage${conversation}`, sMessageCallback);
    return () => {
      webSocket.off(`sMessage${conversation}`, sMessageCallback);
    };
  }, []);
  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
    // if (!continuing) {
    // }

    const checkMessage = async () => {
      if (multiple) {
        const piazzaRef = collection(dbservice, 'chats_group')
        const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
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
          chattings: myChattings
        })
      }
    }
    checkMessage()
  }, [messagesList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  console.log(continuing?.data())
  useEffect(() => {
    const messageList = async () => {
      const messagesArray = []
      const messageRef = collection(dbservice, 'chats_group')
      const messagesCollection = query(messageRef, orderBy('messageClockNumber', 'desc'), limit(scrollNumber),
        startAfter(continuing ? continuing : ""))
      const messages = await getDocs(messagesCollection);
      messages.forEach((document) => {
        if (messagesArray.length === scrollNumber - 1) {
          setContinuing(document)
        }
        const message = document.data().message
        const userUid = document.data().userUid
        const userName = document.data().userName
        const messageClock = document.data().messageClock
        const messageClockNumber = document.data().messageClockNumber
        const profileColor = document.data()?.profileColor
        const profileImageUrl = document.data()?.profileImageUrl
        messagesArray.push({ msg: message, type: "me", userUid: userUid, id: userName, messageClockNumber: messageClockNumber, messageClock: messageClock, conversation: null, profileColor: profileColor, profileImageUrl: profileImageUrl })
        // if (index === 0) {
        //   console.log(document)
        //   setContinuing(document)
        // }
      });
      messagesArray.reverse()
      // handleMessagesList(messagesArray)
      handleMessagesList([...messagesArray, ...messagesList]);
      setIsLoading(false)
    }
    const messageListMembers = async (conversation) => {
      const messageRef = collection(dbservice, `chats_${conversation}`)
      const messagesCollection = query(messageRef, orderBy('messageClockNumber', 'desc'), limit(scrollNumber),
        startAfter(continuing ? continuing : ""))
      const messages = await getDocs(messagesCollection);
      const messagesArray = []
      messages.forEach((doc, index) => {
        const message = doc.data().message
        const userUid = doc.data().userUid
        const userName = doc.data().userName
        const messageClock = doc.data().messageClock
        const messageClockNumber = doc.data().messageClockNumber || 0
        messagesArray.push({ msg: message, type: "me", userUid: userUid, id: userName, messageClock: messageClock, messageClockNumber: messageClockNumber })
      });
      messagesArray.reverse()
      handleMessagesList(messagesArray)
      setIsLoading(false)
    }
    if (multiple) {
      if (isLoading || !messagesList.length) {
        messageList()
      }
    } else {
      if (isLoading || !messagesList.length) {
        messageListMembers(conversation)
      }
    }
  }, [isLoading])
  // console.log(isLoading)
  const handleScroll = () => {
    if (
      // boxRef.current.getBoundingClientRect().height + Math.round(boxRef.current.scrollTop) !==
      // boxRef.current.offsetHeight ||
      boxRef.current.scrollTop !== 0 ||
      isLoading
    ) {
      // console.log(document.documentElement.offsetHeight);
      return;
    } else {
      console.log("scroll");
      setIsLoading(true);
    }
  };
  useEffect(() => {
    boxRef.current?.addEventListener("scroll", handleScroll);
    return () => boxRef.current?.removeEventListener("scroll", handleScroll);
  }, [isLoading]);
  return (
    <>
      <div className="flex flex-col pt-5">
        <div ref={boxRef} className="p-1 border-t rounded-xl max-h-[60vh] overflow-auto">
          <ul>
            {isLoading && <div>loading</div>}
            {messagesList.map((value, index) => {
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
                          if (clock.getMinutes() === passingClock.getMinutes()) {
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
              let messageDate = (clock.getDate()).toString()
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

              return (
                <li key={index} ref={index === scrollNumber - 1 ? messagesEndRef : null} className={userDirection}>
                  {previousUid !== value.userUid &&
                    <div>
                      <div className={`flex justify-${value.userUid !== userObj.uid ? 'start' : 'end'}`}>
                        {userDirection === 'text-left' ?
                          <div className='flex gap-3'>
                            <Avatars profile={false} profileColor="" profileUrl={value?.profileImageUrl} fallback="" piazza={() => onDrawer({ userUid: value.userUid, displayName: value.id })} />
                            {/* <Avatar onClick={() => {
                              document.getElementById('drawer')?.click()
                              onPrivate({ userUid: value.userUid, displayName: value.id })
                            }} className={'bg-profile-blue'}>
                              <AvatarImage src={value?.profileImageUrl} />
                              <AvatarFallback className='text-xl border-none	'>{value?.id[0]}</AvatarFallback>
                            </Avatar> */}
                            <div>{value.id}</div>
                          </div>
                          :
                          <div className='flex gap-3'>
                            <div>{value.id}</div>
                            <Avatars profile={false} profileColor="" profileUrl={value?.profileImageUrl} fallback="" piazza={() => onDrawer({ userUid: value.userUid, displayName: value.id })} />
                            {/* <Avatar onClick={() => {
                              document.getElementById('drawer')?.click()
                              onPrivate({ userUid: value.userUid, displayName: value.id })
                            }} className={'bg-profile-blue'}>
                              <AvatarImage src={value?.profileImageUrl} />
                              <AvatarFallback className='text-xl border-none	'>{value?.id[0]}</AvatarFallback>
                            </Avatar> */}
                          </div>
                        }
                      </div>
                    </div>
                  }
                  {value.userUid !== userObj.uid ?
                    <div className='flex gap-3 justify-start'>
                      <div className='other rounded-tr-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1'>{value.msg}</div>
                      <div>{clock.getFullYear()}-{messageMonth}-{messageDate} {messageAmpm} {messageHours}:{clock.getMinutes() < 10 && '0'}{clock.getMinutes()}</div>
                    </div>
                    :
                    <div className='flex gap-3 justify-end'>
                      <div>{clock.getFullYear()}-{messageMonth}-{messageDate} {messageAmpm} {messageHours}:{clock.getMinutes() < 10 && '0'}{clock.getMinutes()}</div>
                      <div className='me rounded-tl-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1'>{value.msg}</div>
                    </div>
                  }
                </li>
              )
            }
            )
            }
            <li ref={messagesEndRef} />
          </ul>
        </div>
      </div>
      <PiazzaDialogs multiple={multiple} handleMultiple={handleMultiple} user={user} userObj={userObj} handleMessagesList={handleMessagesList} displayedName={displayedName} />
    </>
  );
}

export default PiazzaScreen;
