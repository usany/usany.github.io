import { useState, useEffect, useLayoutEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'

const MessageStacks = () => {
  const [piazzaMessage, setPiazzaMessage] = useState(null)
  const [newMessage, setNewMessage] = useState(true)
  useEffect(() => {
    const piazza = async () => {
      const piazzaRef = collection(dbservice, 'chats_group')
      const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber'))
      const piazzaMessages = await getDocs(piazzaCollection)
      piazzaMessages.forEach((doc) => {
        if (!piazzaMessage) {
          setPiazzaMessage({username: doc.data().userName, message: doc.data().message})
        }
      })
    }
    piazza()
  })
  useEffect(() => {
    if (newMessage) {
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
      <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CardActionArea>
          <Link to='/piazza'>
          <Stack spacing={2} direction="column" sx={{ flexGrow: 1, overflow: 'hidden', p: 1 }}>
            <div>piazza {piazzaMessage?.username}</div>
            <Typography noWrap>{piazzaMessage?.message}</Typography>
          </Stack>
          </Link>
        </CardActionArea>
      </Card>
    </>
  );
}

export default MessageStacks