import { useState, useEffect, useLayoutEffect } from 'react'
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'

const ChattingStacks = ({ userObj, newMessage, setNewMessage, newMessages, setNewMessages, setChats }) => {
  const [chattingMessage, setChattingMessage] = useState(false)
  const [myConversations, setMyConversations] = useState([])
  const [conversations, setConversations] = useState([])
  
  useEffect(() => {
    const myChatting = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data()?.conversation || []
      setMyConversations(myConversation)
    }
    setChattingMessage(true)
    if (!chattingMessage || newMessage) {
      myChatting()
      setNewMessage(false)
    }
  }, [newMessage])
  useEffect(() => {
    const myChattings = () => {
      myConversations.map(async (element, index) => {
        const chattingRef = collection(dbservice, `chats_${element}`)
        const chattingCollection = query(chattingRef, orderBy('messageClockNumber'))
        const chattingMessages = await getDocs(chattingCollection)
        chattingMessages.forEach(async (document) => {
          const documentObj = document.data()
          let userDocRef
          let conversationUid
          if (userObj.uid === documentObj.userOne) {
            userDocRef = doc(dbservice, `members/${documentObj.userTwo}`)
            conversationUid = documentObj.userTwo
          } else {
            userDocRef = doc(dbservice, `members/${documentObj.userOne}`)
            conversationUid = documentObj.userOne
          }
          const userDocSnap = await getDoc(userDocRef)
          const userDisplayName = userDocSnap.data()?.displayName
          const newMessage = {conversation: element, username: documentObj.userName, message: documentObj.message, 
            conversationUid: conversationUid,
            userDisplayName: userDisplayName
          }
          if (conversations.length < myConversations.length) {
            const check = conversations.map((elements) => elements.conversation).indexOf(element)
            if (check === -1) {
              setConversations([...conversations, newMessage])
            }
          }
        })
      })
    }
    if (myConversations.length !== 0) {
      myChattings()
    }
  })
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName } = message;
      const location = conversations.map((element) => element.conversation).indexOf(conversation)
      const replaceObj = {conversation: conversation, username: id, message: msg, conversationUid: userUid, userDisplayName: id, messageClockNumber: messageClockNumber}
      let conversationsCollection = [...conversations]
      if (location === -1) {
        conversationsCollection = [replaceObj, ...conversationsCollection]
      } else {
        conversationsCollection.splice(location, 1, replaceObj)
      }
      setConversations(conversationsCollection)
      console.log(newMessages)
    }
    conversations.map((element) => {
      webSocket.on(`sMessage${element.conversation}`, sMessageCallback);
      return () => {
        webSocket.off(`sMessage${element.conversation}`, sMessageCallback);
      };
    })
  }, [conversations]);
  useEffect(() => {
    if (!webSocket) return;
    function sNewMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName } = message;
      const location = conversations.map((element) => element.conversation).indexOf(conversation)
      const replaceObj = {conversation: conversation, username: id, message: msg, conversationUid: userUid, userDisplayName: id, messageClockNumber: messageClockNumber}
      let conversationsCollection = [...conversations]
      if (location === -1) {
        console.log('location')
        conversationsCollection = [replaceObj, ...conversationsCollection]
      } else {
        console.log('locations')
        conversationsCollection.splice(location, 1, replaceObj)
      }
      setConversations(conversationsCollection)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback);
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback);
    };
  });
  useEffect(() => {
    if (conversations) {
      setChats(true)
    }
  })

  return (
    <>
      {conversations.map((element, index) => {
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
      })}
    </>
  );
}

export default ChattingStacks