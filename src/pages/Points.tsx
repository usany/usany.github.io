import { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { blue } from '@mui/material/colors';
import PageTitle from 'src/muiComponents/PageTitle'
import Button from '@mui/material/Button';
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'

function Points({user, cards}) {
  const [messages, setMessages] = useState([])
  // const {state} = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const bringMessages = async () => {
      const messagesArray = []
      const messageRef = query(collection(dbservice, 'num'), orderBy("creatorClock", "desc"),)
      const messageSnap = await getDocs(messageRef)
      messageSnap.forEach((doc) => {
        const cardId = doc.id
        // if (state.cards.done.indexOf(cardId) !== -1) {
        //   const card = doc.data()
        //   messagesArray.push(card)
        //   setMessages(messagesArray)
        // }
        if (cards.done.indexOf(cardId) !== -1) {
          const card = doc.data()
          messagesArray.push(card)
          setMessages(messagesArray)
        }
      })
    }
    bringMessages()
  }, [])
  
  return (
    <div className='flex flex-col pb-20'>
      {/* <PageTitle title={`${state.user.displayName}의 포인트 적립 영수증`}/>
      <div className='flex justify-center'>
        포인트 합계: {state.cards.point}
      </div> */}
      <PageTitle title={`${user.displayName}의 포인트 적립 영수증`}/>
      <div className='flex justify-center'>
        포인트 합계: {cards.point}
      </div>
      <div className='pt-5 px-5'>
        <List 
          sx={{bgcolor: 'background.paper' }}
        >
            {messages.map((element, index) => {
              return (
                <div key={index}>
                  <ListItem>
                    <div className='flex flex-col justify-center w-screen'>
                    <div className='flex justify-center'>
                      {element.connectedName}에게 {element.text.choose === 1 ? '빌림' : '빌려줌'}
                    </div>
                    <div className='flex justify-center'>
                      {element.text.count} {element.text.counter} {element.text.counting}
                    </div>
                    <div className='flex justify-center'>
                      {element.text.clock.year}년 {element.text.clock.month}월 {element.text.clock.day}일 {element.text.clock.hour}시 {element.text.clock.minute}분부터 
                    </div>
                    <div className='flex justify-center'>
                      {element.text.clocker.year}년 {element.text.clocker.month}월 {element.text.clocker.day}일 {element.text.clocker.hour}시 {element.text.clocker.minute}분까지
                    </div>
                    <div className='flex justify-center'>
                      포인트 {element.text.choose === 1 ? '-' : '+'}{element.point}
                    </div>
                    </div>
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </div>
              )
            })}
        </List>
      </div>
      <div className='flex justify-center'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div>
    </div>  
  )
}

export default Points
