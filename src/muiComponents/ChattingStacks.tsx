import { useState, useEffect, useLayoutEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxWidth: 400,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

function ChattingStacks({ userObj, newMessage, setNewMessage, newMessages, setNewMessages, setChats }) {
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
      // setNewMessages(false)
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
            // const check = collections.indexOf(element)
            const check = conversations.map((elements) => elements.conversation).indexOf(element)
            if (check === -1) {
              // const chatting = conversations.map((elements) => elements.conversation)
              // setCollections(chatting)
              // setCollections([...collections, newMessage.conversation])
              setConversations([...conversations, newMessage])
            }
          }
        })
      })
      // console.log(myCollections)
      // setConversations(myCollections)
    }
    if (myConversations.length !== 0) {
      myChattings()
    }
  })
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, messageClockNumber, conversation, conversationUid, conversationName } = message;
      // console.log(msg)
      const location = conversations.map((element) => element.conversation).indexOf(conversation)
      const replaceObj = {conversation: conversation, username: id, message: msg, conversationUid: userUid, userDisplayName: id, messageClockNumber: messageClockNumber}
      // {conversation: element, username: documentObj.userName, message: documentObj.message, 
      //   conversationUid: conversationUid,
      //   userDisplayName: userDisplayName
      // }
      // console.log(replaceObj)
      // console.log(conversations)
      // console.log(conversations.splice(location, 1, replaceObj))
      // const newConversations = conversations.splice(location, 1, replaceObj)
      // console.log(conversations)
      // newConversations.sort((elementOne, elementTwo) => {
      //   if (elementOne.messageClockNumber < elementTwo.messageClockNumber) {
      //     return -1
      //   } else {
      //     return 1
      //   }
      // })
      // console.log(newConversations)
      let conversationsCollection = [...conversations]
      // console.log(conversationsCollection === conversations)
      if (location === -1) {
        conversationsCollection = [replaceObj, ...conversationsCollection]
        // setConversations(conversations)
      } else {
        conversationsCollection.splice(location, 1, replaceObj)
        // setConversations(conversations)
      }
      setConversations(conversationsCollection)
      // setNewChatting(newChatting+1)
      console.log(newMessages)
      // setPiazzaMessage(
      //   {
      //     message: msg,
      //     username: id,
      //   }
      // );
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
      // {conversation: element, username: documentObj.userName, message: documentObj.message, 
      //   conversationUid: conversationUid,
      //   userDisplayName: userDisplayName
      // }
      console.log(replaceObj)
      console.log(conversations)
      // console.log(conversations.splice(location, 1, replaceObj))
      // const newConversations = conversations.splice(location, 1, replaceObj)
      // newConversations.sort((elementOne, elementTwo) => {
      //   if (elementOne.messageClockNumber < elementTwo.messageClockNumber) {
      //     return -1
      //   } else {
      //     return 1
      //   }
      // })
      // console.log(newConversations)
      let conversationsCollection = [...conversations]
      if (location === -1) {
        console.log('location')
        conversationsCollection = [replaceObj, ...conversationsCollection]
        // setConversations(conversations)
      } else {
        console.log('locations')
        conversationsCollection.splice(location, 1, replaceObj)
        // setConversations(conversations)
      }
      setConversations(conversationsCollection)
      // setNewMessages(newMessages+1)
      // setPiazzaMessage(
      //   {
      //     message: msg,
      //     username: id,
      //   }
      // );
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
              {/* <Stack spacing={2} direction="row" sx={{ flexGrow: 1, overflow: 'hidden', p: 1, alignItems: 'center' }}>
                <Typography noWrap>{message}</Typography>
                <div className='flex flex-col'>
                <div>userName</div>
                <Typography noWrap>{message}</Typography>
                </div>
                <Avatar>W</Avatar>
                <Typography noWrap>{message}</Typography>
                </Stack> */}
            </CardActionArea>
          </Card>
        )
      })}
      {/* <Item sx={{ flexGrow: 1, overflow: 'hidden', my: 1, mx: 'auto', p: 2 }}>
        <Stack spacing={2} direction="row" sx={{ flexGrow: 1, overflow: 'hidden', my: 1, mx: 'auto', p: 2, alignItems: 'center' }}>
          <Stack>
            <Avatar>W</Avatar>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap>{message}</Typography>
          </Stack>
        </Stack>
      </Item> */}
    </>
  );
}

export default ChattingStacks