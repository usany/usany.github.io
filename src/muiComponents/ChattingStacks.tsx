import { useState, useEffect, useLayoutEffect } from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { useAvatarColorStore, useNewMessageStore } from 'src/store'
import { useSelector, useDispatch } from 'react-redux'
import { change } from 'src/stateSlices/cardAccordionSlice'


const ChattingStacks = ({ userObj, 
  // handleMessageLoaded 
}) => {
  const [chattings, setChattings] = useState({})
  const newMessage = useSelector(state => state.newMessage.value)
  // const newMessage = useNewMessageStore((state) => state.newMessage)

  useEffect(() => {
    const myChatting = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data()?.chattings || {}
      setChattings(myConversation)
      // handleMessageLoaded(true)
    }
    if (newMessage) {
      myChatting()
      console.log('sample')
      // handleNewMessageFalse()
    }
  }, [newMessage])

  // useEffect(() => {
  //   const myChatting = async () => {
  //     const myDocRef = doc(dbservice, `members/${userObj.uid}`)
  //     const myDocSnap = await getDoc(myDocRef)
  //     const myConversation = myDocSnap.data()?.conversation || ['none']
  //     setMyConversationUid(myConversation)
  //   }
  //   if (myConversationUid.length === 0 || newMessage) {
  //     myChatting()
  //     handleNewMessageFalse()
  //   }
  // }, [newMessage])
  // useEffect(() => {
  //   const myChattings = () => {
  //     myConversationUid.map(async (element, index) => {
  //       const chattingRef = collection(dbservice, `chats_${element}`)
  //       const chattingCollection = query(chattingRef, orderBy('messageClockNumber'), limit(1))
  //       const chattingMessages = await getDocs(chattingCollection)
  //       chattingMessages.forEach(async (document) => {
  //         const documentObj = document.data()
  //         let userDocRef
  //         let conversationUid
  //         if (userObj.uid === documentObj.userOne) {
  //           userDocRef = doc(dbservice, `members/${documentObj.userTwo}`)
  //           conversationUid = documentObj.userTwo
  //         } else {
  //           userDocRef = doc(dbservice, `members/${documentObj.userOne}`)
  //           conversationUid = documentObj.userOne
  //         }
  //         const userDocSnap = await getDoc(userDocRef)
  //         const userDisplayName = userDocSnap.data()?.displayName
  //         const newMessage = {conversation: element, username: documentObj.userName, message: documentObj.message, 
  //           conversationUid: conversationUid,
  //           userDisplayName: userDisplayName
  //         }
  //         if (chats.length < myConversationUid.length) {
  //           const check = chats.map((elements) => elements.conversation).indexOf(element)
  //           if (check === -1) {
  //             handleChats([...chats, newMessage])
  //           }
  //         }
  //       })
  //     })
  //   }
  //   if (myConversationUid.length !== 0) {
  //     myChattings()
  //   }
  // })
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName } = message;
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
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
      const replaceObj = {userUid: userUid, userName: id, userOne: userOne, userOneDisplayName: userOneDisplayName, userTwo: userTwo, userTwoDisplayName: userTwoDisplayName, message: msg, messageClock: messageClock, messageClockNumber: messageClockNumber}      // const location = chats.map((element) => element.conversation).indexOf(conversation)
      // let conversationsCollection = [...chats]
      // if (location === -1) {
      //   conversationsCollection = [replaceObj, ...conversationsCollection]
      // } else {
      //   conversationsCollection.splice(location, 1, replaceObj)
      // }
      // handleChats(conversationsCollection)
      
      const newChattings = {...chattings, [conversation]: replaceObj}
      setChattings(newChattings)
      // const newChattings = {...chattings}
      // newChattings[conversation] = replaceObj
      // setChattings(newChattings)
    
    }
    sortedMyConversationUid.map((element) => {
      webSocket.on(`sMessage${element}`, sMessageCallback);
      return () => {
        webSocket.off(`sMessage${element}`, sMessageCallback);
      };
    })
  }, [chattings]);
  useEffect(() => {
    if (!webSocket) return;
    function sNewMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName } = message;
      let userOne
      let userTwo
      let userOneDisplayName
      let userTwoDisplayName
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
      const replaceObj = {userUid: userUid, userName: id, userOne: userOne, userOneDisplayName: userOneDisplayName, userTwo: userTwo, userTwoDisplayName: userTwoDisplayName, message: msg, messageClock: messageClock, messageClockNumber: messageClockNumber}
      // const location = chats.map((element) => element.conversation).indexOf(conversation)
      // let conversationsCollection = [...chats]
      // if (location === -1) {
      //   console.log('location')
      //   conversationsCollection = [replaceObj, ...conversationsCollection]
      // } else {
      //   console.log('locations')
      //   conversationsCollection.splice(location, 1, replaceObj)
      // }
      // handleChats(conversationsCollection)

      const newChattings = {...chattings, [conversation]: replaceObj}
      setChattings(newChattings)
      // const newChattings = {...chattings}
      // newChattings[conversation] = replaceObj
      // setChattings(newChattings)
      
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback);
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback);
    };
  });

  // useEffect(() => {
  //   if (chats.length === myConversationUid.length ) {
  //     handleMessageLoaded(true)
  //   }
  // })
  const sortedMyConversationUid = Object.keys(chattings).sort((elementOne, elementTwo) => {return chattings[elementTwo].messageClockNumber-chattings[elementOne].messageClockNumber})
  
  return (
    <>
      {sortedMyConversationUid.map((element, index) => {
        if (chattings[element]) {
          let displayName
          let chattingUid
          if (userObj.uid === chattings[element].userOne) {
            displayName = chattings[element].userTwoDisplayName
            chattingUid = chattings[element].userTwo
          } else {
            displayName = chattings[element].userOneDisplayName
            chattingUid = chattings[element].userOne
          } 
          
          return (
            <Card key={index} sx={{ flexGrow: 1, overflow: 'hidden' }}>
              <CardActionArea>
                <Link to='/chatting' state={{
                  conversation: element, displayName: displayName, userUid: userObj.uid, chattingUid: chattingUid
                }}>
                  <Stack spacing={2} direction="column" sx={{ flexGrow: 1, overflow: 'hidden', p: 1 }}>
                    <div>chatting {userObj.uid === chattings[element].userOne ? chattings[element].userTwoDisplayName : chattings[element].userOneDisplayName}</div>
                    <div>{chattings[element].messageClock}</div>
                    <div>{chattings[element].messageClockNumber}</div>
                    <Typography noWrap>{chattings[element]?.message}</Typography>
                  </Stack>
                </Link>
              </CardActionArea>
            </Card>
          )
        }
      })}
      {/* {chats.map((element, index) => {
        return (
          <Card key={index} sx={{ flexGrow: 1, overflow: 'hidden' }}>
            <CardActionArea>
              <Link to='/chatting' state={{
                conversation: element.conversation, displayName: element.userDisplayName, userUid: userObj.uid, chattingUid: element.conversationUid
              }}>
                <Stack spacing={2} direction="column" sx={{ flexGrow: 1, overflow: 'hidden', p: 1 }}>
                  <div>chatting {element.userDisplayName}</div>
                  <Typography noWrap>{element?.message}</Typography>
                </Stack>
              </Link>
            </CardActionArea>
          </Card>
        )
      })} */}
    </>
  );
}

export default ChattingStacks