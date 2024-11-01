import { useRef, useEffect, useState, useMemo } from "react";
import "./Chatting.css";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import PiazzaDialogs from 'src/muiComponents/PiazzaDialogs'
import PiazzaSwitch from 'src/muiComponents/PiazzaSwitch'
import { bottomNavigationStore } from 'src/store'
import { webSocket, onClick } from 'src/webSocket.tsx'

// const webSocket = io("http://localhost:5000");
function Piazza({ userObj, piazzaSwitch }:
  {
    userObj: {uid: string, displayName: string},
    setBottomNavigation: (newState: number) => void,
    piazzaSwitch: {current: string | null}
  }
) {
  const messagesEndRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState<[]>([]);
  const [changeMessage, setChangeMessage] = useState<boolean>(true)
  const [privateTarget, setPrivateTarget] = useState("");
  const [user, setUser] = useState(null)
  const [selectUser, setSelectUser] = useState(false)
  const setBottomNavigation = bottomNavigationStore((state) => state.setBottomNavigation)
  
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
          conversation: null
        },
      ]);
      setNewMessage(true)
    }
    webSocket.on("sMessagePiazza", sMessageCallback);
    return () => {
      webSocket.off("sMessagePiazza", sMessageCallback);
    };
  }, []);

  useEffect(() => {
    if (!webSocket) return;
    function sLoginCallback(msg) {
      setMsgList((prev) => [
        ...prev,
        {
          msg: `${msg} joins the chat`,
          type: "welcome",
          id: "",
        },
      ]);
    }
    webSocket.on("sLogin", sLoginCallback);
    return () => {
      webSocket.off("sLogin", sLoginCallback);
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [msgList]);

  useEffect(() => {
    setBottomNavigation(5)
  })

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
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      target: privateTarget,
      conversation: null
    };
    // const year = new Date().toString()
    // console.log(year)
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

  const onForm = async () => {
    try {
      const message = msg
      const userUid = userObj.uid
      const userName = userObj.displayName
      const messageClock = new Date().toString()
      const messageClockNumber = Date.now()
      if (message){
        await addDoc(collection(dbservice, 'chats_group'), {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber 
        })
        setMsgList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: null }]);
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
      messages.forEach((doc) => {
        const message = doc.data().message
        const userUid = doc.data().userUid
        const userName = doc.data().userName
        const messageClock = doc.data().messageClock
        const messageClockNumber = doc.data().messageClockNumber
        messagesArray.push({ msg: message, type: "me", userUid: userUid, id: userName, messageClockNumber: messageClockNumber, messageClock: messageClock, conversation: null })
        setMsgList(messagesArray);
      });
    }
    if (changeMessage) { 
      messageList()
      setChangeMessage(false)
    }
  }, [changeMessage])

  const onClick = (piazzaSwitch) => {
    if (piazzaSwitch.current === 'true') {
      window.localStorage.setItem('piazza', 'false')
      piazzaSwitch.current = 'false'
    } else {
      window.localStorage.setItem('piazza', 'true')
      piazzaSwitch.current = 'true'
    }
    console.log(piazzaSwitch.current)
  }
  
  return (
    <div>
      <div className='flex text-2xl p-5'>
        <div className='w-screen'>
          단체 대화
        </div>
        <div className='flex w-2/3 pt-1 justify-end'>
          <PiazzaSwitch piazzaSwitch={piazzaSwitch} onClick={() => onClick(piazzaSwitch)} />
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
                  autoFocus
                />
                <button type="submit">전송</button>
              </form>
            </div>
            <PiazzaDialogs selectUser={selectUser} user={user} handleClose={handleClose} userObj={userObj} handleMsgList={(newState: []) => setMsgList(newState)} handleChangeMessage={(newState: boolean) => setChangeMessage(newState)}/>
        </div>
      </div>
    </div>
  );
}

export default Piazza;
