import { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { Link, useLocation } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import ChattingDialogs from 'src/muiComponents/ChattingDialogs'
import { useBottomNavigationStore, useNewMessageStore } from 'src/store'

// const webSocket = io("http://localhost:5000");
function Chatting({ userObj }: {
  userObj: {uid: string, displayName: string},
}) {
  const messagesEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const [changeMessage, setChangeMessage] = useState(true)
  const [privateTarget, setPrivateTarget] = useState("");
  const [user, setUser] = useState(null)
  const [selectUser, setSelectUser] = useState(false)
  const {state} = useLocation()
  const conversation = state.conversation
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  const handleNewMessageTrue = useNewMessageStore((state) => state.handleNewMessageTrue)

  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, conversation } = message;
      setMsgList((prev) => [
        ...prev,
        {
          msg: msg,
          userUid: userUid,
          type: target ? "private" : "other",
          id: id,
          messageClock: messageClock,
          conversation: conversation
        },
      ]);
    }
    if (msgList.length === 0) {
      console.log('msgList')
      webSocket.on(`sNewMessage`, sMessageCallback);
      return () => {
        webSocket.off(`sNewMessage`, sMessageCallback);
      };
    }
    webSocket.on(`sMessage${conversation}`, sMessageCallback);
    return () => {
      webSocket.off(`sMessage${conversation}`, sMessageCallback);
    };
  }, []);

  useEffect(() => {
    handleBottomNavigation(5)
  })
  useEffect(() => {
    scrollToBottom();
  }, [msgList]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      messageClock: messageClock,
      messageClockNumber: messageClockNumber,
      target: privateTarget,
      conversation: conversation,
      conversationUid: state.chattingUid,
      conversationName: state.displayName
    };
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
    setMsg("");
  };
  const onChangeMsgHandler = (e) => {
    setMsg(e.target.value);
  };
  const onSetPrivateTarget = async (userUid) => {
    const userRef = doc(dbservice, `members/${userUid}`)
    const userDoc = await getDoc(userRef)
    const userElement = userDoc.data()
    setUser(userElement)
    setSelectUser(true)
  };
  const handleClose = () => {
    setSelectUser(false)
  }
  console.log(state)
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
      if (state.userUid < state.chattingUid) {
        userOne = state.userUid
        userTwo = state.chattingUid
        userOneDisplayName = userObj.displayName
        userTwoDisplayName = state.displayName
      } else {
        userOne = state.chattingUid
        userTwo = state.userUid
        userOneDisplayName = state.displayName
        userTwoDisplayName = userObj.displayName
      }
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
          userTwoDisplayName: userTwoDisplayName
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
  console.log(state)
  const onMembersConversation = async () => {
    const message = msg
    try {
      const userUid = userObj.uid
      const chattingUid = state.chattingUid
      // const userName = userObj.displayName
      // const messageClockNumber = Date.now()
      // const messageClock = new Date().toString()
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
        handleNewMessageTrue()
        // setNewMessage(true)
        // handleNewMessage()
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

  useEffect(() => {
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
      messageListMembers(conversation)
      setChangeMessage(false)
    }
  }, [])

  return (
    <div>
      <div className='flex text-2xl p-5'>
        개인 대화 {state.displayName}
      </div>
    <div className="app-container">
      <div className="wrap">
          <div className="chat-box">
            <ul className="chat">
              {msgList.map((v, i) => {
                if (v.type === "welcome") {
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
                        onClick={() => onSetPrivateTarget(v.userUid)}
                      >
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
              />
              <button type="submit">전송</button>
            </form>
          </div>
          <ChattingDialogs selectUser={selectUser} user={user} handleClose={handleClose} />
      </div>
    </div>
    </div>
  );
}

export default Chatting;
