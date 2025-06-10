import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { PlusCircle } from "lucide-react";
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
  chattingUser: {
    uid: string
    displayName: string
    profileImage: boolean
    defaulProfile: string
    profileUrl: string
  } | null
  userObj: User
  multiple: boolean
  messages: string
  handleMessages: (newValue: string) => void
  messagesList: []
  handleMessagesList: (newValue: []) => void
}
function PiazzaForm({ chattingUser, userObj, multiple, messages, handleMessages, messagesList, handleMessagesList }: Props) {
  const profileColor = useSelector(state => state.profileColor.value)
  const piazzaForm = useSelector((state) => state.piazzaForm.value)
  const profile = useSelectors(state => state.profile.value)
  const dispatch = useDispatch()
  const { state } = useLocation()
  const conversation = state?.conversation
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  console.log(chattingUser)
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
    if (chattingUser) {
      toUserRef = doc(dbservice, `members/${chattingUser.uid}`)
      toUser = await getDoc(toUserRef)
      messagingToken = toUser.data()?.messagingToken
    }
    const profileImageUrl = profile.profileImage ? profile.profileUrl : profile.defaultProfile
    const sendData = {
      msg: message,
      userUid: userUid,
      id: userName,
      messageClockNumber: messageClockNumber,
      messageClock: messageClock,
      // target: privateTarget,
      conversation: conversation,
      conversationUid: chattingUser?.uid,
      conversationName: chattingUser?.displayName,
      profileUrl: profileImageUrl,
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
      const profileImageUrl = profile?.profileImageUrl
      const defaultProfile = profile?.defaultProfile
      const profileImage = profile?.profileImage
      if (message) {
        await addDoc(collection(dbservice, 'chats_group'), {
          userUid: userUid,
          userName: userName,
          message: message,
          messageClock: messageClock,
          messageClockNumber: messageClockNumber,
          profileImageUrl: profileImageUrl,
          defaultProfile: defaultProfile,
          profileColor: profileColor,
          piazzaChecked: [userObj.uid],
          profileImage: profileImage
        })
        handleMessagesList((prev) => [...prev, {
          msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: null, profileColor: profileColor,
          messageClockNumber: messageClockNumber,
          defaultProfile: defaultProfile,
          profileImageUrl: profileImageUrl,
          profileImage: profileImage || false,
        }]);
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
      const profileImage = profile.profileImage
      const otherProfileImage = chattingUser.profileImage
      const profileImageUrl = profile.profileImageUrl
      const otherProfileUrl = chattingUser.profileImageUrl
      const defaultProfile = profile.defaultProfile
      const otherDefaultProfile = chattingUser.defaultProfile
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      let userOneProfileUrl
      let userTwoProfileUrl
      let userOneDefaultProfile
      let userTwoDefaultProfile
      let userOneProfileImage
      let userTwoProfileImage
      if (userObj.uid < chattingUser.uid) {
        userOne = userObj.uid
        userTwo = chattingUser.uid
        userOneDisplayName = userObj.displayName
        userTwoDisplayName = chattingUser.displayName
        userOneProfileUrl = profileImageUrl
        userTwoProfileUrl = otherProfileUrl
        userOneDefaultProfile = defaultProfile
        userTwoDefaultProfile = otherDefaultProfile
        userOneProfileImage = profile.profileImage
        userTwoProfileImage = chattingUser.profileImage
      } else {
        userOne = chattingUser.uid
        userTwo = userObj.uid
        userOneDisplayName = chattingUser.displayName
        userTwoDisplayName = userObj.displayName
        userOneProfileUrl = otherProfileUrl
        userTwoProfileUrl = profileImageUrl
        userOneDefaultProfile = otherDefaultProfile
        userTwoDefaultProfile = defaultProfile
        userOneProfileImage = chattingUser.profileImage
        userTwoProfileImage = profile.profileImage
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
          userTwoProfileUrl: userTwoProfileUrl,
          userOneDefaultProfile: userOneDefaultProfile,
          userTwoDefaultProfile: userTwoDefaultProfile,
          userOneProfileImage: userOneProfileImage,
          userTwoProfileImage: userTwoProfileImage
        }

        await addDoc(collection(dbservice, `chats_${conversation}`), messageObj)
        const myDocRef = doc(dbservice, `members/${userUid}`)
        const myDocSnap = await getDoc(myDocRef)
        const myChattings = myDocSnap.data().chattings || {}
        const userDocRef = doc(dbservice, `members/${chattingUser.uid}`)
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
        handleMessagesList((prev) => [...prev, {
          msg: message, type: "me", userUid: userObj.uid, id: userObj.displayName, messageClock: messageClock, conversation: conversation,
          userName: userName,
          messageClockNumber: messageClockNumber,
          userOne: userOne,
          userTwo: userTwo,
          userOneDisplayName: userOneDisplayName,
          userTwoDisplayName: userTwoDisplayName,
          userOneProfileUrl: userOneProfileUrl,
          userTwoProfileUrl: userTwoProfileUrl,
          userOneDefaultProfile: userOneDefaultProfile,
          userTwoDefaultProfile: userTwoDefaultProfile,
          userOneProfileImage: userOneProfileImage,
          userTwoProfileImage: userTwoProfileImage
        }]);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const onMembersConversation = async () => {
    try {
      const userUid = userObj.uid
      const chattingUid = chattingUser.uid
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
      {piazzaForm ?
        <form className="fixed w-screen bottom-0 flex gap-px" onSubmit={onSendSubmitHandler}>
          <button className='px-1 rounded bg-light-2 dark:bg-dark-2' type="submit">{send[index]}</button>
          <input
            className='w-full p-3 rounded bg-light-1 dark:bg-dark-1'
            placeholder={forms[index]}
            onChange={onChangeMsgHandler}
            value={messages}
            autoFocus
          />
          <button className='w-1/6 rounded bg-light-2 dark:bg-dark-2' type="submit">{send[index]}</button>
        </form>
        :
        <form className="fixed w-screen bottom-[60px] flex gap-px" onSubmit={onSendSubmitHandler}>
          <button className='px-1 rounded bg-light-2 dark:bg-dark-2' type="submit"><PlusCircle /></button>
          <input
            className='w-full p-3 rounded bg-light-1 dark:bg-dark-1'
            placeholder={forms[index]}
            onChange={onChangeMsgHandler}
            value={messages}
            autoFocus
          />
          <button className='w-1/6 rounded bg-light-2 dark:bg-dark-2' type="submit">{send[index]}</button>
        </form>
      }
    </>
  );
}

export default PiazzaForm;
