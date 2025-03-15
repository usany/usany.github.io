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

const ProfileDrawers = ({ user, cards, followers, alliesCollection, selection }) => {
  const [messages, setMessages] = useState([])
  const [elements, setElements] = useState([])
  useEffect(() => {
    const bringMessages = async () => {
      const messagesArray = []
      const messageRef = query(collection(dbservice, 'num'), orderBy("creatorClock", "desc"),)
      const messageSnap = await getDocs(messageRef)
      messageSnap.forEach((doc) => {
        const cardId = doc.id
        if (cards?.done.indexOf(cardId) !== -1) {
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
  console.log(alliesCollection)
  useEffect(() => {
    if (alliesCollection) {
      usersCollection()
    }
  }, [alliesCollection])
  const usersCollection = async () => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (alliesCollection?.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
        setElements(elementsCollection)
      }
    })
  }

  return (
    <Drawer>
      <DrawerTrigger>
        {selection === 'points' && 
          <div className='p-5'>
            <div>포인트</div>
            <div className='flex justify-center'>{cards.point}</div>
          </div>
        }
        {selection === 'allies' && 
          <div className='p-5'>
            <div>
              {followers ? '팔로워' : '팔로잉'}
            </div>
            <div className='flex justify-center'>
              {alliesCollection.length}명 
            </div>
          </div>
        }
      </DrawerTrigger>
      <DrawerContent className='bg-light-2 dark:bg-dark-2 max-h-[50%]'>
        <ScrollArea>
          <div>
            <DrawerHeader>
              {selection === 'points' &&
                <DrawerTitle>{`${user.displayName}의 포인트 적립 영수증`}</DrawerTitle>
              }
              {selection === 'allies' &&
                <DrawerTitle>{user.displayName}의 {followers ? '팔로워' : '팔로잉'}</DrawerTitle>
              }
            </DrawerHeader>
            {selection === 'points' && messages.map((element, index) => {
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
            })}
            {selection === 'allies' && 
              elements?.map((element, index) => {
                return (
                  <div key={index}>
                    <div className='flex justify-between w-screen px-5'>
                    <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src="./src" />
                    <div className='overflow-hidden'>
                      {element.displayName}
                    </div>
                    <IconButton aria-label="comment">
                      <Link to='/profile'
                        state = {{
                          element: element,
                        }}
                        onClick={() => {
                          setElements([])
                        }}
                      >
                        <DrawerClose>
                          <CommentIcon onClick={() => {
                            setElements([])
                          }}/>
                        </DrawerClose>
                      </Link>
                    </IconButton>
                    </div>
                    <Divider variant='inset' />
                  </div>
                )
              })
            }
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileDrawers