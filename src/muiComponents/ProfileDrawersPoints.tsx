import { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';

const ProfileDrawersPoints = ({ user, cards }) => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const bringMessages = async () => {
      const messagesArray = []
      const messageRef = query(collection(dbservice, 'num'), orderBy("creatorClock", "desc"),)
      const messageSnap = await getDocs(messageRef)
      messageSnap.forEach((doc) => {
        const cardId = doc.id
        if ((cards?.done || []).indexOf(cardId) !== -1) {
          const card = doc.data()
          messagesArray.push(card)
          setMessages(messagesArray)
        }
      })
    }
    if (cards) {
      bringMessages()
    }
  }, [cards])
  // console.log(cards)
  const pointsList = messages.map((element, index) => {
    return (
      <div key={index}>
        <div className='flex flex-col justify-center w-screen'>
          {user.uid === element.creatorId && 
            <div className='flex justify-center'>
              {element.connectedName}에게 {element.text.choose === 1 ? '빌림' : '빌려줌'}
            </div>
          }
          {user.uid === element.connectedId && 
            <div className='flex justify-center'>
              {element.displayName}에게 {element.text.choose === 1 ? '빌려줌' : '빌림'}
            </div>
          }
          <div className='flex justify-center'>
            {element.text.count} {element.text.counter} {element.text.counting}
          </div>
          <div className='flex justify-center'>
            {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
          </div>
          <div className='flex justify-center'>
            {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
          </div>
          {user.uid === element.creatorId && 
            <div className='flex justify-center'>
              포인트 {element.text.choose === 1 ? '-' : '+'}{element.point}
            </div>
          }
          {user.uid === element.connectedId && 
            <div className='flex justify-center'>
              포인트 {element.text.choose === 1 ? '+' : '-'}{element.point}
            </div>
          }
        </div>
        <Divider variant="inset" />
      </div>
    )
  })

  return (
    <div className='p-5'>
      {pointsList.length === 0 ? 
        <div className='flex justify-center'>
          <div className='border border-dashed p-5'>
            적립 내역이 없습니다
          </div>
        </div>
        :
        <div>{pointsList}</div>
      }
    </div>
  );
}

export default ProfileDrawersPoints