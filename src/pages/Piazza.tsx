import { useRef, useEffect, useState, useMemo } from "react";
import "./Chatting.css";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import PiazzaDialogs from 'src/muiComponents/PiazzaDialogs'
import PiazzaSwitch from 'src/muiComponents/PiazzaSwitch'
import { webSocket, onClick } from 'src/webSocket.tsx'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux'
import { User } from "firebase/auth";
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'

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
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation } = message;
      console.log(msg)
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
    if (sendData && message) {
      webSocket.emit("message", sendData);
      // const { data, uid, id, target } = sendData;
      // setMsgList((prev) => [
      //   ...prev,
      //   {
      //     msg: data,
      //     type: target ? "private" : "other",
      //     id: id,
      //   },
      // ]);
      onForm()
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
    if (changeMessage) { 
      messageList()
      setChangeMessage(false)
    }
  }, [changeMessage])

  return (
    <div>
      <div className='flex text-2xl p-5'>
        <div className='w-screen'>
          단체 대화
        </div>
        <div className='flex w-2/3 pt-1 justify-end'>
          <PiazzaSwitch />
        </div>
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
                          <Avatar alt={v.id} sx={{ bgcolor: v.profileColor || blue[500] }} src={v.profileImageUrl || './src'} variant="rounded" />
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
          <PiazzaDialogs selectUser={selectUser} user={user} handleClose={handleClose} userObj={userObj} handleMsgList={(newState: []) => setMsgList(newState)} handleChangeMessage={(newState: boolean) => setChangeMessage(newState)} displayedName={displayedName}/>
        </div>
      </div>
    </div>
  );
}

export default Piazza;
