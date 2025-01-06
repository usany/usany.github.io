import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { User } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContactDrawers from 'src/muiComponents/ContactDrawers';
import ContactFormDrawers from 'src/muiComponents/ContactFormDrawers'

interface Props {
  userObj: User
  user: {} | null
}

function ContactForm({ userObj, user }: Props) {
  const [messageTitle, setMessageTitle] = useState('')
  const [message, setMessage] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)
  const [violationUser, setViolationUser] = useState(null)
  const [initialViolationUser, setInitialViolationUser] = useState(true)
  useEffect(() => {
    if (user && initialViolationUser) {
      setViolationUser(user)
      setInitialViolationUser(false)
    }
  }, [user])

  useEffect(() => {
    if (messageTitle && message) {
      setFormFilledOut(true)
    } else {
      setFormFilledOut(false)
    }
  }, [messageTitle, message])

  const onSubmit = async () => {
    try {
      await addDoc(collection(dbservice, 'violations'), {
        userUid: userObj.uid,
        userName: userObj.displayName,
        messageTitle: messageTitle,
        message: message,
        violationUser: violationUser
      })
      const myDocRef = doc(dbservice, `violations/${userObj.uid}`)
      const myDocSnap = await getDoc(myDocRef)
      const myViolations = myDocSnap.data()?.violations || []
      let messageId
      if (myViolations.length) {
        messageId = myViolations[-1].messageId+1
      } else {
        messageId = 1
      }
      myViolations.push({
        messageId: messageId,
        userUid: userObj.uid,
        userName: userObj.displayName,
        messageTitle: messageTitle,
        message: message,
        violationUser: violationUser
      })
      await updateDoc(doc(dbservice, `violations/${userObj.uid}`), {
        violations: myViolations
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessage('')
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

  return (  
    <>
      <form id='auth'>
        <div className='flex justify-center pt-5 px-5'>
          <TextField label='신고하기 제목' multiline value={messageTitle} onChange={onChangeMessageTitle} variant="outlined" fullWidth />
        </div>
        <div className='flex justify-center pt-5 px-5'>
          <TextField label='신고하기 내용' multiline rows={5} value={message} onChange={onChangeMessage} variant="outlined" fullWidth />
        </div>
        <div className='flex pt-3 px-5 gap-1'>
          <ContactFormDrawers violationUser={violationUser} changeViolationUser={(newValue) => setViolationUser(newValue)}/>
        </div>
        <div className='flex justify-center pt-2.5'>
          <ContactDrawers userObj={userObj} />
          {formFilledOut ?
            <Button variant='outlined' form='auth' onClick={onSubmit}>전송</Button>
          :
            <Button variant='outlined' form='auth' disabled>전송</Button>
          }
        </div>
      </form>
    </>
  )
}

export default ContactForm
