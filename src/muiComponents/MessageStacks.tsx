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
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { User } from 'firebase/auth';
import ChattingStacks from 'src/muiComponents/ChattingStacks'
import { useQuery } from '@tanstack/react-query'
import { useSelector, useDispatch } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

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
  const newMessage = useSelector(state => state.newMessage.value)
  // const dispatch = useDispatch()

  const messages = useQuery({queryKey: ['messages'], queryFn: piazza, suspense: true})
  // console.log(messages)
  useEffect(() => {
    if (piazzaSwitch === 'true') {
      messages.data?.forEach((doc) => {
        if (!piazzaMessage) {
          setPiazzaMessage({username: doc.data().userName, messageClock: doc.data().messageClock, messageClockNumber: doc.data().messageClockNumber, message: doc.data().message})
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
          messageClock: messageClock,
          username: id,
        }
      );
    }
    webSocket.on("sMessagePiazza", sMessageCallback);
    return () => {
      webSocket.off("sMessagePiazza", sMessageCallback);
    };
  }, []);
  console.log(piazzaMessage)
  return (
    <>
      {piazzaSwitch === 'true' && <Card sx={{ flexGrow: 1, overflow: 'hidden' }}>
        <CardActionArea>
          <Link to='/piazza'>
            <div className='flex p-3'>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                {/* <AvatarFallback className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11">CN</AvatarFallback> */}
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col w-screen'>
                <div className='flex justify-between'>
                  <div className='px-3'>단체 대화</div> 
                  {/* <div className='px-3'>{piazzaMessage?.username}</div> */}
                  <div>{piazzaMessage?.messageClock}</div>
                </div>
                <div className='flex justify-between px-3'>
                  {/* <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11">CN</AvatarFallback>
                      <AvatarFallback>CN</AvatarFallback>
                  </Avatar> */}
                  <div>{piazzaMessage?.message}</div>
                  {/* <Typography noWrap>{piazzaMessage?.message}</Typography> */}
                  {/* <div>{piazzaMessage?.messageClock}</div> */}
                  {/* <div className='px-3'>
                    <div>단체 대화 {piazzaMessage?.username}</div>
                  </div> */}
                </div>
              </div>
            </div>
          </Link>
        </CardActionArea>
      </Card>}
      <ChattingStacks userObj={userObj} chattings={chattings} handleChattings={(newValue) => setChattings(newValue)}/>
    </>
  );
}

export default MessageStacks