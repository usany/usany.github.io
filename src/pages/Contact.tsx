import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import ContactDialogs from 'src/muiComponents/ContactDialogs';
import PageTitle from 'src/muiComponents/PageTitle';
import ContactAddress from 'src/muiComponents/ContactAddress';
import ContactForm from 'src/muiComponents/ContactForm';

function Contact({ userObj }:
  {
    userObj: {uid: string, displayName: string}
  }
) {
  const [messageTitle, setMessageTitle] = useState('')
  const [message, setMessage] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)
  const [dialogMove, setDialogMove] = useState(false)
  const [change, setChange] = useState(false)
  useEffect(() => {
    if (messageTitle && message) {
      setFormFilledOut(true)
    } else {
      setFormFilledOut(false)
    }
  }, [messageTitle, message])

  const onSubmit = async () => {
    try {
      const newMessage = await addDoc(collection(dbservice, 'violations'), {
        userUid: userObj.uid,
        userName: userObj.displayName,
        messageTitle: messageTitle,
        message: message
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessage('')
      setChange(true)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessage = (event) => {
    const {
      target: { name, value }
    } = event
    setMessage(value)
  }
  const onChangeMessageTitle = (event) => {
    const {
      target: { name, value }
    } = event
    setMessageTitle(value)
  }
  const handleClose = () => {
    setDialogMove(false)
  }
  return (  
    <div>
      <PageTitle title={'신고하기'}/>
      <ContactAddress action={'발신'} label={userObj.displayName}/>
      <ContactAddress action={'수신'} label={'담당자'}/>
      <ContactForm />
    </div>
  )
}

export default Contact
