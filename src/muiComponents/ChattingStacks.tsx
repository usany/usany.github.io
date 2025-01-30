import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { webSocket, onClick } from 'src/webSocket.tsx'
import { User } from 'firebase/auth';
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import Chats from 'src/muiComponents/Chats'

interface Props {
  userObj: User
  chattings: {}
  handleChattings: ({}) => void
}

const ChattingStacks = ({ userObj, chattings, handleChattings, longPressChat, changeLongPressChat, onLongPress, changeOnLongPress }: Props) => {
  const [sortedMyConversationUid, setSortedMyConversationUid] = useState([])
  const [profileUrls, setProfileUrls] = useState([])
  const [newMessage, setNewMessage] = useState(true)
  useEffect(() => {
    const myChatting = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data()?.chattings || {}
      const conversation = Object.keys(myConversation).map((element) => {
        let displayName
        let chattingUid
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
          setProfileUrls(newObject)
        })
        .catch((error) => {
          console.log(error)
        });
      })
      handleChattings(myConversation)
      setNewMessage(false)
    }
    if (newMessage) {
      myChatting()
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
      handleChattings(newChattings)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback);
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback);
    };
  });
  
  useEffect(() => {
    const sorted = Object.keys(chattings).sort((elementOne, elementTwo) => {return chattings[elementTwo].messageClockNumber-chattings[elementOne].messageClockNumber})
    setSortedMyConversationUid(sorted)
  }, [chattings])

  const onDelete = async ({ conversation }) => {
    const newSortedMyConversationUid = sortedMyConversationUid
    newSortedMyConversationUid.splice(sortedMyConversationUid.indexOf(conversation), 1)
    console.log(newSortedMyConversationUid)
    setSortedMyConversationUid(newSortedMyConversationUid)
    setNewMessage(true)
    const userRef = doc(dbservice, `members/${userObj.uid}`)
    const userDoc = await getDoc(userRef)
    const userChattings = userDoc.data().chattings || {}
    const userConversation = userDoc.data().conversation || []
    Reflect.deleteProperty(userChattings, conversation)
    if (userConversation.indexOf(conversation) !== -1) {
      userConversation.splice(userConversation.indexOf(conversation), 1)
    }
    updateDoc(userRef, {chattings: userChattings});
    updateDoc(userRef, {conversation: userConversation});
  }

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
            <Chats userObj={userObj} profileUrl={profileUrl} conversation={element} displayName={displayName} chattingUid={chattingUid} multiple={false} clock={clock} message={chattings[element]} longPressChat={longPressChat} changeLongPressChat={changeLongPressChat} onLongPress={onLongPress} changeOnLongPress={changeOnLongPress} onDelete={onDelete}/>
          )
        }
      })}
    </>
  );
}

export default ChattingStacks