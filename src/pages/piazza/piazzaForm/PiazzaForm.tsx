import { Card, CardContent, MenuItem, Select } from "@mui/material";
import { User } from "firebase/auth";
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { AlarmCheck, PlusCircle, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { dbservice } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";
import Popups from "src/pages/core/Popups";
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
function PiazzaForm({ handleCalls, chattingUser, userObj, multiple, messages, handleMessages, messagesList, handleMessagesList }: Props) {
  const profileColor = useSelector(state => state.profileColor.value)
  const piazzaForm = useSelector((state) => state.piazzaForm.value)
  const profile = useSelectors(state => state.profile.value)
  const dispatch = useDispatch()
  const { state } = useLocation()
  const conversation = state?.conversation
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'
  const [calls, setCalls] = useState(false)
  const onSendSubmitHandler = async (event) => {
    event.preventDefault();
    const message = messages
    const userUid = userObj.uid
    const userName = userObj.displayName
    const messageClockNumber = Date.now()
    const messageClock = new Date().toString()
    const profileImageUrl = profile?.profileImageUrl
    const defaultProfile = profile?.defaultProfile
    const profileImage = profile?.profileImage
    let toUserRef
    let toUser
    let messagingToken
    if (chattingUser) {
      toUserRef = doc(dbservice, `members/${chattingUser.uid}`)
      toUser = await getDoc(toUserRef)
      messagingToken = toUser.data()?.messagingToken
    }
    const profileUrl = profile.profileImage ? profile.profileImageUrl : profile.defaultProfile
    console.log(profile)
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
      profileImage: profileImage,
      defaultProfile: defaultProfile,
      profileImageUrl: profileImageUrl,
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
  useEffect(() => {
    if (calls) {
      const muteButton = document.getElementById('mute')
      const streamButton = document.getElementById('stream')
      const videoSelect = document.getElementById('videoInput')
      let muted = false
      let streamOff = false
      function handleMuteClick() {
        promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
        console.log(promise.getAudioTracks())
        if (!muted) {
          muteButton.innerText = 'unmute'
          muted = true
        } else {
          muteButton.innerText = 'mute'
          muted = false
        }
      }
      function handleStreamClick() {
        promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
        console.log(promise.getVideoTracks())
        if (!streamOff) {
          streamButton.innerText = 'turn stream on'
          streamOff = true
        } else {
          streamButton.innerText = 'turn stream off'
          streamOff = false
        }
      }
      const myFace = document.getElementById('myFace')
      let promise
      async function getMedia() {
        try {
          const constraints = {
            video: true,
            audio: true,
          }
          promise = await navigator.mediaDevices.getUserMedia(constraints);
          promise.getVideoTracks().forEach(track => track.enabled = !track.enabled)
          promise.getAudioTracks().forEach(track => track.enabled = !track.enabled)
          // myFace.srcObject = promise
          getDevices()
        } catch (error) {
          console.log(error)
        }
      }
      getMedia()
      async function getDevices() {
        try {
          const devices = await navigator.mediaDevices.enumerateDevices()
          const videoDevices = devices.filter((device) => device.kind === 'videoinput')
          videoDevices.forEach((device) => {
            const option = document.createElement('option')
            option.value = device.deviceId
            option.innerText = device.label
            videoSelect?.appendChild(option)
          })
          console.log(videoDevices)
        } catch (error) {
          console.log(error)
        }
      }
    }
  })
  const getCalls = () => {
    setCalls(true)
    handleCalls()
  }
  // console.log(conversation)
  return (
    <>
      {piazzaForm ?
        <form className="fixed w-screen bottom-0 flex gap-px" onSubmit={onSendSubmitHandler}>
          <button onClick={() => getCalls()} className='px-1 rounded bg-light-2 dark:bg-dark-2' type="submit"><PlusCircle /></button>
          <select className='w-10'>
            <option>video</option>
            <option>audio</option>
          </select>
          <Select
            value={item}
            onChange={changeItem}
          >
            <MenuItem value={'우산'}>{languages === 'ko' ? '우산' : 'Usan'}</MenuItem>
            <MenuItem value={'양산'}>{languages === 'ko' ? '양산' : 'Yangsan'}</MenuItem>
          </Select>
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
          {/* <select className='w-10'>
            <option>video</option>
            <option>audio</option>
          </select>
          <Select
          value={item}
          onChange={changeItem}
          >
            <MenuItem value={'우산'}>{languages === 'ko' ? '우산' : 'Usan'}</MenuItem>
            <MenuItem value={'양산'}>{languages === 'ko' ? '양산' : 'Yangsan'}</MenuItem>
          </Select> */}
          {conversation && conversation !== 'piazza' &&
            <Popups
              trigger={<button className='px-1 h-full rounded bg-light-2 dark:bg-dark-2' type="submit"><PlusCircle /></button>}
              title={<div>전화 선택</div>}
              content={<div className='flex justify-center gap-5 p-5'>
                <Card
                  className='colorOne'
                  sx={{
                    height: '100%'
                  }}
                  onClick={() => getCalls()}
                >
                  <CardContent>
                    <div className='flex flex-col items-center gap-5'>
                      <UserRound />
                      <div>화상 전화</div>
                    </div>
                  </CardContent>
                </Card>
                <Card
                  className='colorOne'
                  sx={{
                    height: '100%'
                  }}
                >
                  <CardContent>
                    <div className='flex flex-col items-center gap-5'>
                      <AlarmCheck />
                      <div>음성 전화</div>
                    </div>
                  </CardContent>
                </Card>
              </div>}
            />
          }
          <input
            className='w-full p-3 rounded bg-light-1 dark:bg-dark-1'
            placeholder={forms[index]}
            onChange={onChangeMsgHandler}
            value={messages}
            autoFocus
          />
          <button className='w-1/6 rounded bg-light-2 dark:bg-dark-2' type="submit">{send[index]}</button>
        </form >
      }
    </>
  );
}

export default PiazzaForm;
