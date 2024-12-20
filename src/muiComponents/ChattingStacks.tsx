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
import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'

interface Props {
  userObj: User
  chattings: {}
  handleChattings: ({}) => void
}

const ChattingStacks = ({ userObj, chattings, handleChattings }: Props) => {
  // const [chattings, setChattings] = useState({})
  const newMessage = useSelector(state => state.newMessage.value)
  // const dispatch = useDispatch()

  useEffect(() => {
    const myChatting = async () => {
      const myDocRef = doc(dbservice, `members/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myConversation = myDocSnap.data()?.chattings || {}
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
      const newChattings = {...chattings, [conversation]: replaceObj}
      // setChattings(newChattings)
      handleChattings(newChattings)
    }
    webSocket.on(`sNewMessage`, sNewMessageCallback);
    return () => {
      webSocket.off(`sNewMessage`, sNewMessageCallback);
    };
  });

  const sortedMyConversationUid = Object.keys(chattings).sort((elementOne, elementTwo) => {return chattings[elementTwo].messageClockNumber-chattings[elementOne].messageClockNumber})
  console.log(sortedMyConversationUid)
  
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
                  <div className='p-3'>
                    <div>chatting {userObj.uid === chattings[element].userOne ? chattings[element].userTwoDisplayName : chattings[element].userOneDisplayName}</div>
                    <div>{chattings[element].messageClock}</div>
                    <div>{chattings[element].messageClockNumber}</div>
                    <Typography noWrap>{chattings[element]?.message}</Typography>
                  </div>
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