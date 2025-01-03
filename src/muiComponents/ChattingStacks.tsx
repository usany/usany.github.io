import { useState, useEffect, useLayoutEffect } from 'react'
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { User } from 'firebase/auth';
// import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import Chip from '@mui/material/Chip';
import Chats from 'src/muiComponents/Chats'

interface Props {
  userObj: User
  chattings: {}
  handleChattings: ({}) => void
}

const ChattingStacks = ({ userObj, chattings, handleChattings }: Props) => {
  const [sortedMyConversationUid, setSortedMyConversationUid] = useState([])
  const [profileUrls, setProfileUrls] = useState([])
  const newMessage = useSelector(state => state.newMessage.value)
  useEffect(() => {
    const myChatting = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data()?.chattings || {}
      const conversation = Object.keys(myConversation).map((element) => {
        let displayName
        let chattingUid
        // let profileImageUrl
        if (userObj.uid === myConversation[element].userOne) {
          displayName = myConversation[element].userTwoDisplayName
          chattingUid = myConversation[element].userTwo
        } else {
          displayName = myConversation[element].userOneDisplayName
          chattingUid = myConversation[element].userOne
        } 
        getDownloadURL(ref(storage, `${chattingUid}`))
        .then((url) => {
          const newObject = profileUrls
          newObject[chattingUid] = {profileUrl: url, displayName: displayName}
          // myConversation[element].profileImageUrl = url
          setProfileUrls(newObject)
        })
        .catch((error) => {
          console.log(error)
        });
      })
      handleChattings(myConversation)
    }
    if (newMessage) {
      myChatting()
      // handleNewMessageFalse()
    }
  }, [newMessage])
  
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName, profileUrl } = message;
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      let userOneProfileUrl
      let userTwoProfileUrl
      const messageCount = chattings[conversation].messageCount+1
      if (userUid < conversationUid) {
        userOne = userUid
        userTwo = conversationUid
        userOneDisplayName = id
        userTwoDisplayName = conversationName
        userOneProfileUrl = profileUrl
      } else {
        userOne = conversationUid
        userTwo = userUid
        userOneDisplayName = conversationName
        userTwoDisplayName = id
        userTwoProfileUrl = profileUrl
      }
      const replaceObj = {userUid: userUid, userName: id, userOne: userOne, userOneDisplayName: userOneDisplayName, userTwo: userTwo, userTwoDisplayName: userTwoDisplayName, message: msg, messageClock: messageClock, messageClockNumber: messageClockNumber, userOneProfileUrl: userOneProfileUrl, userTwoProfileUrl: userTwoProfileUrl, messageCount: messageCount}      // const location = chats.map((element) => element.conversation).indexOf(conversation)
      const newChattings = {...chattings, [conversation]: replaceObj}
      // setChattings(newChattings)
      handleChattings(newChattings)
    }
    sortedMyConversationUid.map((element) => {
      webSocket.on(`sMessage${element}`, sMessageCallback);
      return () => {
        webSocket.off(`sMessage${element}`, sMessageCallback);
      };
    })
  });
  useEffect(() => {
    if (!webSocket) return;
    function sNewMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName } = message;
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
      const messageCount = chattings[conversation].messageCount
      if (userUid < conversationUid) {
        userOne = userUid
        userTwo = conversationUid
        userOneDisplayName = id
        userTwoDisplayName = conversationName
      } else {
        userOne = conversationUid
        userTwo = userUid
        userOneDisplayName = conversationName
        userTwoDisplayName = id
      }
      const replaceObj = {userUid: userUid, userName: id, userOne: userOne, userOneDisplayName: userOneDisplayName, userTwo: userTwo, userTwoDisplayName: userTwoDisplayName, message: msg, messageClock: messageClock, messageClockNumber: messageClockNumber, messageCount: messageCount}
      const newChattings = {...chattings, [conversation]: replaceObj}
      // setChattings(newChattings)
      handleChattings(newChattings)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback);
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback);
    };
  });
  
  // const sortedMyConversationUid = Object.keys(chattings).sort((elementOne, elementTwo) => {return chattings[elementTwo].messageClockNumber-chattings[elementOne].messageClockNumber})
  const checkedMessage = async ({ conversation }) => {
    const myDocRef = doc(dbservice, `members/${userObj.uid}`)
    const myDocSnap = await getDoc(myDocRef)
    const myChattings = myDocSnap.data().chattings
    myChattings[conversation].messageCount = 0
    await updateDoc(myDocRef, {
      chattings: myChattings
    })
  }

  useEffect(() => {
    const sorted = Object.keys(chattings).sort((elementOne, elementTwo) => {return chattings[elementTwo].messageClockNumber-chattings[elementOne].messageClockNumber})
    setSortedMyConversationUid(sorted)
  }, [chattings])
  return (
    <>
      {sortedMyConversationUid.map((element, index) => {
        const clock = new Date(chattings[element].messageClock)
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
        if (clock.getMonth() < 10) {
          messageMonth = '0'+messageMonth
        } 
        if (messageDate.length === 1) {
          messageDate = '0'+messageDate
        } 
      
        if (chattings[element]) {
          let displayName
          let chattingUid
          let profileUrl
          if (userObj.uid === chattings[element].userOne) {
            displayName = chattings[element].userTwoDisplayName
            chattingUid = chattings[element].userTwo
            profileUrl = chattings[element].userTwoProfileUrl
          } else {
            displayName = chattings[element].userOneDisplayName
            chattingUid = chattings[element].userOne
            profileUrl = chattings[element].userOneProfileUrl
          }
          return (
            <>
              <Chats userObj={userObj} profileUrl={profileUrl} conversation={element} displayName={displayName} chattingUid={chattingUid} multiple={false} clock={clock} message={chattings[element]} />
            </>
          )
        }
      })}
    </>
  );
}

export default ChattingStacks