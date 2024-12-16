import { useState, useEffect, useLayoutEffect, Suspense } from 'react'
// import Avatar from '@mui/material/Avatar';
// import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { User } from 'firebase/auth';
import ChattingStacks from 'src/muiComponents/ChattingStacks'
import { useQuery } from '@tanstack/react-query'

interface Props {
  userObj: User
  piazzaSwitch: string
}
const MessageStacks = ({ userObj, piazzaSwitch }: Props) => {
  const [piazzaMessage, setPiazzaMessage] = useState<{username: string, message: string} | null>(null)
  const [chattings, setChattings] = useState({})
  const piazza = async () => {
    const piazzaRef = collection(dbservice, 'chats_group')
    const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber'))
    const piazzaMessages = await getDocs(piazzaCollection)
    // piazzaMessages.forEach((doc) => {
    //   if (!piazzaMessage) {
    //     setPiazzaMessage({username: doc.data().userName, message: doc.data().message})
    //   }
    // })
    return piazzaMessages
  }
  
  const messages = useQuery({queryKey: ['messages'], queryFn: piazza, suspense: true})
  // console.log(messages)
  useEffect(() => {
    if (piazzaSwitch === 'true') {
      messages.data?.forEach((doc) => {
        if (!piazzaMessage) {
          setPiazzaMessage({username: doc.data().userName, message: doc.data().message})
        }
      })
    }
  })
  useEffect(() => {
    if (!webSocket) return;
    function sMessageCallback(message) {
      const { msg, userUid, id, target, messageClock, conversation } = message;
      console.log(msg)
      setPiazzaMessage(
        {
          message: msg,
          username: id,
        }
      );
    }
    webSocket.on("sMessagePiazza", sMessageCallback);
    return () => {
      webSocket.off("sMessagePiazza", sMessageCallback);
    };
  }, []);

  return (
    <>
      {piazzaSwitch === 'true' && <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CardActionArea>
          <Link to='/piazza'>
            <div className='p-3'>
              <div>piazza {piazzaMessage?.username}</div>
              <Typography noWrap>{piazzaMessage?.message}</Typography>
            </div>
          </Link>
        </CardActionArea>
      </Card>}
      {/* {piazzaSwitch && <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CardActionArea>
          <Link to='/piazza'>
            <div className='p-3'>
              <div>piazza {piazzaMessage?.username}</div>
              <Typography noWrap>{piazzaMessage?.message}</Typography>
            </div>
          </Link>
        </CardActionArea>
      </Card>} */}
      <ChattingStacks userObj={userObj} chattings={chattings} handleChattings={(newValue) => setChattings(newValue)}/>
    </>
  );
}

export default MessageStacks