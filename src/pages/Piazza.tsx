import { useRef, useEffect, useState, useMemo, lazy } from "react";
import "./Chatting.css";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import PiazzaDialogs from 'src/muiComponents/PiazzaDialogs'
import PiazzaSwitch from 'src/muiComponents/PiazzaSwitch'
import { webSocket, onClick } from 'src/webSocket.tsx'
import Avatar from '@mui/material/Avatar';
import { useSelector, useDispatch } from 'react-redux'
import { User } from "firebase/auth";
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { Link, useLocation } from 'react-router-dom'
import ChattingDialogs from 'src/muiComponents/ChattingDialogs'
import { changeNewMessageTrue } from 'src/stateSlices/newMessageSlice'

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
  }, [msgList]);

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const onSendSubmitHandler = (e) => {
    e.preventDefault();
    const message = msg
    const userUid = userObj.uid
    const userName = userObj.displayName
    const messageClockNumber = Date.now()
    const messageClock = new Date().toString()
    const sendData = {
      msg: message,
      userUid: userUid,
      id: userName,
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      target: privateTarget,
      conversation: null
    };
    // const year = new Date().toString()
    if (multiple) {
      if (sendData && message) {
        webSocket.emit("message", sendData);
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
          profileColor: profileColor
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
      console.log(state)
      console.log(profileUrl)
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
        await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
        const myDocRef = doc(dbservice, `members/${userUid}`)
        const myDocSnap = await getDoc(myDocRef)
        const myChattings = myDocSnap.data().chattings || {}
        const userDocRef = doc(dbservice, `members/${state.chattingUid}`)
        const userDocSnap = await getDoc(userDocRef)
        const userChattings = userDocSnap.data().chattings || {}
        myChattings[conversation] = messageObj
        userChattings[conversation] = messageObj
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
    <div>
      <div className='flex text-2xl p-5'>
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
              {msgList.map((v, i) => {
                if (v.type === "welcome") {
                  return (
                    <li className="welcome">
                    <div className="line" />
                    <div>{v.msg}</div>
                    <div className="line" />
                  </li>
                  )
                } else {
                  let userDirection
                  if (v.userUid === userObj.uid) {
                    userDirection = 'me'
                  } else {
                    userDirection = 'other'
                  }
                  return (
                      <li
                        className={userDirection}
                        key={`${i}_li`}
                        name={v.id}
                        data-id={v.id}
                        onClick={() => onSetPrivateTarget({userUid: v.userUid, displayName: v.id})}
                      >
                        <div className={`flex justify-${v.userUid !== userObj.uid ? 'start' : 'end'}`}>
                          <Avatar alt={v.id} sx={{ bgcolor: v.profileColor || '#2196f3' }} src={v.profileImageUrl || './src'} variant="rounded" />
                        </div>
                        <div
                          className={
                            v.id === privateTarget ? "private-user" : "userId"
                          }
                          data-id={v.id}
                          name={v.id}
                        >
                          {v.id}
                        </div>
                        {v.userUid !== userObj.uid ? 
                        <div className='flex justify-start'>
                        <div className={'other'} data-id={v.id} name={v.id}>
                          {v.msg}
                        </div>
                        <div data-id={v.id} name={v.id}>
                          {v.messageClock}
                        </div>
                        </div>
                        :
                        <div className='flex justify-end'>
                        <div data-id={v.id} name={v.id}>
                          {v.messageClock}
                        </div>
                        <div className={'me'} data-id={v.id} name={v.id}>
                          {v.msg}
                        </div>
                        </div>
                        }
                      </li>
                  )
                }
                  }
                )
              }
              <li ref={messagesEndRef} />
            </ul>
            <form className="send-form" onSubmit={onSendSubmitHandler}>
              <input
                placeholder="메세지를 작성해 주세요"
                onChange={onChangeMsgHandler}
                value={msg}
                autoFocus
              />
              <button type="submit">전송</button>
            </form>
          </div>
          {multiple ? 
            <PiazzaDialogs selectUser={selectUser} user={user} handleClose={handleClose} userObj={userObj} handleMsgList={(newState: []) => setMsgList(newState)} handleChangeMessage={(newState: boolean) => setChangeMessage(newState)} displayedName={displayedName}/>
            :
            <ChattingDialogs selectUser={selectUser} user={user} handleClose={handleClose} />
          }
        </div>
      </div>
    </div>
  );
}

export default Piazza;
