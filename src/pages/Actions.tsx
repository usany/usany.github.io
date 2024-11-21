import { useState, useEffect, useMemo } from 'react'
import Message from 'src/pages/Message'
import Button from '@mui/material/Button';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';

const Actions = ({ userObj }: {
  userObj: {uid: string, displayName: string},
}) => {
  const {state} = useLocation()
  const navigate = useNavigate()
  const [messagesList, setMessagesList] = useState([])
  useEffect(() => {
    const getMessage = async () => {
      const messagesRef = query(collection(dbservice, 'num'))
      const querySnap = await getDocs(messagesRef)
      const messagesArray = []
      querySnap.forEach((docSnap) => {
        const messageId = docSnap.id
        const messageObj = docSnap.data()
        const message = {id: messageId, ...messageObj}
        messagesArray.push(message)
      })
      setMessagesList(messagesArray)
      // const messagesList = state.cards.done.map(async (element) => {
      //   const docRef = query(collection(dbservice, `num`))
      //   const docSnap = await getDoc(docRef)
      //   const messageId = docSnap.id
      //   const message = docSnap.data() 
      //   messagesArray.push({messageId, message})
      //   return {messageId, message}
      // })
      // console.log(messagesArray[0])
      // setMessagesList(messagesList)
    }
    getMessage()
  }, [])
  console.log(messagesList)
  return (
    <div>
      <div className='flex text-2xl p-5'>
          {state.actions === 'completedLend' &&
            <div>
              {state.user.displayName}의 빌려주기 목록 
            </div>
          }
          {state.actions === 'completedBorrow' &&
            <div>
              {state.user.displayName}의 빌리기 목록 
            </div>
          }
      </div>
      {state.actions === 'completedLend' &&
        <div className='flex justify-center flex-wrap'>
          {messagesList.map((element) => {
            if (element.text.choose === 1) {
              return <Message key={element.id} msgObj={element} isOwner={element.creatorId === userObj.uid} userObj={userObj} />
            }
          })}
          {/* {state.lendRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} />)}
          {state.lendMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} />)} */}
        </div>
      }
      {state.actions === 'completedBorrow' &&
        <div className='flex justify-center flex-wrap'>
          {messagesList.map((element) => {
            if (element.text.choose === 2) {
              return <Message key={element.id} msgObj={element} isOwner={element.creatorId === userObj.uid} userObj={userObj} />
            }
          })}
          {/* {messagesList.map((element) => <Message key={element.messageId} msgObj={element.message} isOwner={element.message.creatorId === userObj.uid} userObj={userObj} />)}
          {state.borrowRegisteredMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={true} userObj={userObj} />)}
          {state.borrowMessage.map((msg) => <Message key={msg.id} msgObj={msg} isOwner={false} userObj={userObj} />)} */}
        </div>
      }
      <div className='flex justify-center p-10'>
        <Button variant='outlined' onClick={() => navigate(-1)}>확인</Button>
      </div>
    </div>
  )
}

export default Actions