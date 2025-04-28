import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { dbservice } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";
import { changeNewMessageTrue } from 'src/stateSlices/newMessageSlice';
import { webSocket } from 'src/webSocket.tsx';

const forms = {
  ko: '메세지를 작성해 주세요',
  en: 'Input message'
}
const send = {
  ko: '전송',
  en: 'send'
}
interface Props {
  userObj: User
  multiple: boolean
  messages: string
  handleMessages: (newValue: string) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
}
function PiazzaForm({ userObj, multiple, messages, handleMessages, messagesList, handleMessagesList }: Props) {
  const profileColor = useSelector(state => state.profileColor.value)
  const profileUrl = useSelector(state => state.profileUrl.value)
  const dispatch = useDispatch()
  const { state } = useLocation()
  const conversation = state?.conversation
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  const onSendSubmitHandler = async (event) => {
    event.preventDefault();
    const message = messages
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

    const sendData = {
      msg: message,
      userUid: userUid,
      id: userName,
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      // target: privateTarget,
      conversation: conversation,
      conversationUid: state.chattingUid,
      conversationName: state.displayName,
      profileUrl: profileUrl,
      sendingToken: messagingToken,
    };
    if (multiple) {
      if (sendData && message) {
        webSocket.emit("piazzaMessage", sendData);
        onForm()
      }
    } else {
      if (message) {
        if (messagesList.length !== 0) {
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
    handleMessages("");
  };

  const onChangeMsgHandler = (e) => {
    handleMessages(e.target.value);
  };

  const onForm = async () => {
    try {
      const message = messages
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
        handleMessagesList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: null, profileImageUrl: profileUrl, profileColor: profileColor }]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onFormConversation = async () => {
    const message = messages
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
        const userChattingsNumber = userChattings[conversation]?.messageCount || 0
        myChattings[conversation] = messageObj
        userChattings[conversation] = { ...messageObj, messageCount: userChattingsNumber + 1 }
        await updateDoc(myDocRef, {
          chattings: myChattings
        })
        await updateDoc(userDocRef, {
          chattings: userChattings
        })
        handleMessagesList((prev) => [...prev, { msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: conversation }]);
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
      <form className="fixed w-screen bottom-[60px] flex gap-px" onSubmit={onSendSubmitHandler}>
        <input
          className='w-full p-3 rounded bg-light-1 dark:bg-dark-1'
          placeholder={forms[index]}
          onChange={onChangeMsgHandler}
          value={messages}
          autoFocus
        />
        <button className='w-1/6 rounded bg-light-2 dark:bg-dark-2' type="submit">{send[index]}</button>
      </form>
    </>
  );
}

export default PiazzaForm;
