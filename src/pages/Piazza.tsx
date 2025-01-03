import { useRef, useEffect, useState, useMemo, lazy } from "react";
import "./Chatting.css";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import PiazzaDialogs from 'src/muiComponents/PiazzaDialogs'
import PiazzaSwitch from 'src/muiComponents/PiazzaSwitch'
import { webSocket, onClick } from 'src/webSocket.tsx'
// import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux'
import { User } from "firebase/auth";
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { Link, useLocation } from 'react-router-dom'
import ChattingDialogs from 'src/muiComponents/ChattingDialogs'
import { changeNewMessageTrue } from 'src/stateSlices/newMessageSlice'
import Avatars from 'src/muiComponents/Avatars'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Props {
  userObj: User
}
function Piazza({ userObj }: Props) {
  const messagesEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState<[]>([]);
  const [changeMessage, setChangeMessage] = useState<boolean>(true)
  const [privateTarget, setPrivateTarget] = useState("");
  const [user, setUser] = useState(null)
  const [selectUser, setSelectUser] = useState(false)
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
  const [displayedName, setDisplayedName] = useState(null)
  const dispatch = useDispatch()
  const {state} = useLocation()
  const multiple = state?.multiple
  const conversation = state?.conversation

  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation } = message;
      setMsgList((prev) => [
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
      // const myDocRef = doc(dbservice, `chats_group/${piazzaUid}`)
      // const myDocSnap = await getDoc(myDocRef)
      // const myChattings = myDocSnap.data()
      // const piazzaCheckedList = myChattings.piazzaChecked || []
      // if (piazzaCheckedList.indexOf(userObj.uid) === -1) {
      //   piazzaCheckedList.push(userObj.uid)
      //   await updateDoc(myDocRef, {
      //     ...myChattings, 
      //     piazzaChecked: piazzaCheckedList,
      //   })
      // }
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
      setMsgList((prev) => [
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
  // useEffect(() => {
  //   if (!webSocket) return;
  //   function sLoginCallback(msg) {
  //     setMsgList((prev) => [
  //       ...prev,
  //       {
  //         msg: `${msg} joins the chat`,
  //         type: "welcome",
  //         id: "",
  //       },
  //     ]);
  //   }
  //   webSocket.on("sLogin", sLoginCallback);
  //   return () => {
  //     webSocket.off("sLogin", sLoginCallback);
  //   };
  // }, []);

  useEffect(() => {
    scrollToBottom();
    
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
  }, [msgList]);

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  
  const onSendSubmitHandler = async (event) => {
    event.preventDefault();
    const message = msg
    const userUid = userObj.uid
    const userName = userObj.displayName
    const messageClockNumber = Date.now()
    const messageClock = new Date().toString()
    let toUserRef
    let toUser
    let messagingToken
    if (state.chattingUid) {
      toUserRef = doc(dbservice, `members/${state.chattingUid}`)
      toUser = await getDoc(toUserRef)
      messagingToken = toUser.data()?.messagingToken
    }
    // console.log(toUser.data().messagingToken)
    // const messagingToken = toUser.data()?.messagingToken
    
    const sendData = {
      msg: message,
      userUid: userUid,
      id: userName,
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      target: privateTarget,
      conversation: conversation,
      conversationUid: state.chattingUid,
      conversationName: state.displayName,
      profileUrl: profileUrl,
      sendingToken: messagingToken,
    };
    // const year = new Date().toString()
    if (multiple) {
      if (sendData && message) {
        webSocket.emit("piazzaMessage", sendData);
        onForm()
      }
    } else {
      if (message) {
        if (msgList.length !== 0) {
          webSocket.emit("message", sendData);
          console.log('message')
        } else {
          webSocket.emit("messageNew", sendData);
          console.log('messageNew')
        }
        onFormConversation()
        onMembersConversation()
      }
    }
    setMsg("");
  };

  const onChangeMsgHandler = (e) => {
    setMsg(e.target.value);
  };

  const onSetPrivateTarget = async ({ userUid, displayName }) => {
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setSelectUser(true)
    setDisplayedName(displayName)
  };
  
  const handleClose = () => {
    setSelectUser(false)
  }

  const onForm = async () => {
    try {
      const message = msg
      const userUid = userObj.uid
      const userName = userObj.displayName
      const messageClock = new Date().toString()
      const messageClockNumber = Date.now()
      if (message) {
        await addDoc(collection(dbservice, 'chats_group'), {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          profileImageUrl: profileUrl,
          profileColor: profileColor,
          piazzaChecked: [userObj.uid]
        })
        setMsgList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: null, profileImageUrl: profileUrl, profileColor: profileColor }]);
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    const messageList = async () => {
      const messagesArray = []
      const messageRef = collection(dbservice, 'chats_group')
      const messagesCollection = query(messageRef, orderBy('messageClockNumber'))
      const messages = await getDocs(messagesCollection);
      messages.forEach((document) => {
        const message = document.data().message
        const userUid = document.data().userUid
        const userName = document.data().userName
        const messageClock = document.data().messageClock
        const messageClockNumber = document.data().messageClockNumber
        const profileColor = document.data()?.profileColor
        const profileImageUrl = document.data()?.profileImageUrl
        messagesArray.push({ msg: message, type: "me", userUid: userUid, id: userName, messageClockNumber: messageClockNumber, messageClock: messageClock, conversation: null, profileColor: profileColor, profileImageUrl: profileImageUrl })
        setMsgList(messagesArray);
      });
    }
    const messageListMembers = async (conversation) => {
      const messageRef = collection(dbservice, `chats_${conversation}`)
      const messagesCollection = query(messageRef, orderBy('messageClockNumber'))
      const messages = await getDocs(messagesCollection);
      const messagesArray = []
      messages.forEach((doc) => {
        const message = doc.data().message
        const userUid = doc.data().userUid
        const userName = doc.data().userName
        const messageClock = doc.data().messageClock
        const messageClockNumber = doc.data().messageClockNumber || 0
        messagesArray.push({ msg: message, type: "me", userUid: userUid, id: userName, messageClock: messageClock, messageClockNumber: messageClockNumber })
        setMsgList(messagesArray)
      });
    }
    if (changeMessage) {
      if (multiple) {
        messageList()
        setChangeMessage(false)
      } else {
        messageListMembers(conversation)
        setChangeMessage(false)
      }
    }
  }, [changeMessage])
  const onFormConversation = async () => {
    const message = msg
    try {
      const userUid = userObj.uid
      const userName = userObj.displayName
      const messageClockNumber = Date.now()
      const messageClock = new Date().toString()
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      let userOneProfileUrl
      let userTwoProfileUrl
      if (state.userUid < state.chattingUid) {
        userOne = state.userUid
        userTwo = state.chattingUid
        userOneDisplayName = userObj.displayName
        userTwoDisplayName = state.displayName
        userOneProfileUrl = profileUrl
        userTwoProfileUrl = state.profileUrl
      } else {
        userOne = state.chattingUid
        userTwo = state.userUid
        userOneDisplayName = state.displayName
        userTwoDisplayName = userObj.displayName
        userOneProfileUrl = state.profileUrl
        userTwoProfileUrl = profileUrl
      }
      if (!userOneProfileUrl) {
        const userRef = doc(dbservice, `members/${userOne}`)
        const userSnap = await getDoc(userRef)
        const userUrl = userSnap.data()?.profileImageUrl
        userOneProfileUrl = userUrl
      }
      if (!userTwoProfileUrl) {
        const userRef = doc(dbservice, `members/${userTwo}`)
        const userSnap = await getDoc(userRef)
        const userUrl = userSnap.data()?.profileImageUrl
        userTwoProfileUrl = userUrl
      }
      // console.log(state)
      // console.log(profileUrl)
      if (message) {
        const messageObj = {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          userOne: userOne,
          userTwo: userTwo,
          userOneDisplayName: userOneDisplayName,
          userTwoDisplayName: userTwoDisplayName,
          userOneProfileUrl: userOneProfileUrl,
          userTwoProfileUrl: userTwoProfileUrl
        }
        console.log(messageObj)
        await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
        const myDocRef = doc(dbservice, `members/${userUid}`)
        const myDocSnap = await getDoc(myDocRef)
        const myChattings = myDocSnap.data().chattings || {}
        const userDocRef = doc(dbservice, `members/${state.chattingUid}`)
        const userDocSnap = await getDoc(userDocRef)
        const userChattings = userDocSnap.data().chattings || {}
        const userChattingsNumber = userChattings[conversation]?.messageCount || 0
        myChattings[conversation] = messageObj
        userChattings[conversation] = {...messageObj, messageCount: userChattingsNumber+1}
        await updateDoc(myDocRef, {
          chattings: myChattings
        })
        await updateDoc(userDocRef, {
          chattings: userChattings
        })
        setMsgList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: conversation }]);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onMembersConversation = async () => {
    try {
      const userUid = userObj.uid
      const chattingUid = state.chattingUid
      const myDocRef = doc(dbservice, `members/${userUid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data().conversation || []
      const userDocRef = doc(dbservice, `members/${chattingUid}`)
      const userDocSnap = await getDoc(userDocRef)
      const userConversation = userDocSnap.data().conversation || []
      if (myConversation.indexOf(conversation) === -1) {
        await updateDoc(myDocRef, {
          conversation: [...myConversation, conversation]
        })
        dispatch(changeNewMessageTrue())
      }
      if (userConversation.indexOf(conversation) === -1) { 
        await updateDoc(userDocRef, {
          conversation: [...userConversation, conversation]
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div className='flex text-2xl p-5 w-screen'>
        <div className='w-screen'>
          {multiple ? '단체 대화' : `개인 대화 ${state?.displayName}`}
        </div>
        {multiple && 
          <div className='flex w-2/3 pt-1 justify-end'>
            <PiazzaSwitch />
          </div>
        }
      </div>
      <div className="app-container">
        <div className="wrap">
          <div className="chat-box">
            <ul className="chat">
              {msgList.map((v, index) => {
                  let userDirection
                  const clock = new Date(v.messageClock)
                  if (v.userUid === userObj.uid) {
                    userDirection = 'text-right'
                  } else {
                    userDirection = 'text-left'
                  }
                  let previousUid
                  let passingClock
                  let displayClock = 'true'
                  if (index > 0) {
                    previousUid = msgList[index-1].userUid
                  }
                  if (index < msgList.length-1) {
                    if (msgList[index+1].userUid === userObj.uid) {
                      passingClock = new Date(msgList[index+1].messageClock)
                      if (clock.getFullYear() === passingClock.getFullYear()) {
                        if (clock.getMonth() === passingClock.getMonth()) {
                          if (clock.getDate() === passingClock.getDate()) {
                            if (clock.getHours() === passingClock.getHours()) {
                              if (clock.getMinutes() === passingClock.getMinutes()) {
                                displayClock = 'false'
                              }
                            }
                          }
                        }
                      }
                    }
                  }
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
                  if (messageMonth < 10) {
                    messageMonth = '0'+messageMonth
                  } 
                  if (messageDate.length === 1) {
                    messageDate = '0'+messageDate
                  }
                  
                  return (
                      <li className={userDirection}>
                        {previousUid !== v.userUid &&
                          <div>
                            <div className={`flex justify-${v.userUid !== userObj.uid ? 'start' : 'end'}`}>
                              {userDirection === 'text-left' ?
                              <div className='flex gap-3'>
                                <Avatar onClick={() => onSetPrivateTarget({userUid: v.userUid, displayName: v.id})} className={'bg-profile-blue'}>
                                  <AvatarImage src={v.profileImageUrl} />
                                  <AvatarFallback className='text-xl border-none	'>{v.id[0]}</AvatarFallback>
                                </Avatar>
                                <div>{v.id}</div>
                              </div>
                              :
                              <div className='flex gap-3'>
                                <div>{v.id}</div>
                                <Avatar onClick={() => onSetPrivateTarget({userUid: v.userUid, displayName: v.id})} className={'bg-profile-blue'}>
                                  <AvatarImage src={v.profileImageUrl} />
                                  <AvatarFallback className='text-xl border-none	'>{v.id[0]}</AvatarFallback>
                                </Avatar>
                              </div>
                              }
                            </div>
                          </div>
                        }
                        {v.userUid !== userObj.uid ? 
                          <div className='flex gap-3 justify-start'>
                            <div className='other rounded-tr-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1'>{v.msg}</div>
                            {displayClock === 'true' && 
                              <div>{clock.getFullYear()}-{messageMonth}-{messageDate} {messageAmpm} {messageHours}:{clock.getMinutes()}</div>
                            }
                          </div>
                        :
                          <div className='flex gap-3 justify-end'>
                            {displayClock === 'true' &&
                              <div>{clock.getFullYear()}-{messageMonth}-{messageDate} {messageAmpm} {messageHours}:{clock.getMinutes()}</div>
                            }
                            <div className='me rounded-tl-lg rounded-bl-lg rounded-br-lg p-1 bg-light-1 dark:bg-dark-1'>{v.msg}</div>
                          </div>
                        }
                      </li>
                  )
                  }
                )
              }
              <li ref={messagesEndRef} />
            </ul>
            <form className="flex gap-px" onSubmit={onSendSubmitHandler}>
              <input
                className='w-full p-3 rounded bg-light-1 dark:bg-dark-1'
                placeholder="메세지를 작성해 주세요"
                onChange={onChangeMsgHandler}
                value={msg}
                autoFocus
              />
              <button className='w-1/6 rounded bg-light-2 dark:bg-dark-2' type="submit">전송</button>
            </form>
          </div>
          <PiazzaDialogs multiple={multiple} selectUser={selectUser} user={user} handleClose={handleClose} userObj={userObj} handleMsgList={(newState: []) => setMsgList(newState)} handleChangeMessage={(newState: boolean) => setChangeMessage(newState)} displayedName={displayedName}/>
        </div>
      </div>
    </>
  );
}

export default Piazza;
