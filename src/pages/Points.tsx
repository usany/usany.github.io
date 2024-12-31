import { useState, useEffect } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import PageTitle from 'src/muiComponents/PageTitle'
import Button from '@mui/material/Button';
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import Skeleton from '@mui/material/Skeleton';

function Points({user, cards}) {
  const [messages, setMessages] = useState([])
  // const {state} = useLocation()
  // const navigate = useNavigate()
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
    <Skeleton />
    // <div className='flex flex-col pb-20'>
    // </div>  
  )
}

export default Points
