import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { User } from "firebase/auth";
import { addDoc, collection } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { dbservice } from 'src/baseApi/serverbase';
import { useSelectors } from 'src/hooks/useSelectors';
import ContactDrawers from 'src/pages/contact/ContactDrawers';
import ContactFormDrawers from 'src/pages/contact/ContactFormDrawers';

const reportTitle = {
  ko: '신고하기 제목',
  en: 'Report Title'
}
const reportContent = {
  ko: '신고하기 내용',
  en: 'Report Content'
}
interface Props {
  userObj: User
  user: {} | null
}

function ContactForm({ userObj, user }: Props) {
  const [messageTitle, setMessageTitle] = useState('')
  const [message, setMessage] = useState('')
  const [violationUser, setViolationUser] = useState(null)
  const [initialViolationUser, setInitialViolationUser] = useState(true)
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  useEffect(() => {
    if (user && initialViolationUser) {
      setViolationUser(user)
      setInitialViolationUser(false)
    }
  }, [user])

  const onSubmit = async () => {
    try {
      await addDoc(collection(dbservice, 'violations'), {
        userUid: userObj.uid,
        userName: userObj.displayName,
        messageTitle: messageTitle,
        message: message,
        violationUser: violationUser
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessage('')
      setViolationUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessage = (event) => {
    const {
      target: { value }
    } = event
    setMessage(value)
  }
  const onChangeMessageTitle = (event) => {
    const {
      target: { value }
    } = event
    setMessageTitle(value)
  }

  return (
    <>
      <form id='auth'>
        <div className='flex justify-center pt-5 px-5'>
          <TextField label={reportTitle[index]} multiline value={messageTitle} onChange={onChangeMessageTitle} variant="outlined" fullWidth />
        </div>
        <div className='flex justify-center pt-5 px-5'>
          <TextField label={reportContent[index]} multiline rows={5} value={message} onChange={onChangeMessage} variant="outlined" fullWidth />
        </div>
        <div className='flex pt-3 px-5 gap-1'>
          <ContactFormDrawers violationUser={violationUser} changeViolationUser={(newValue) => setViolationUser(newValue)} />
        </div>
        <div className='flex justify-center pt-2.5'>
          <ContactDrawers userObj={userObj} />
          {(messageTitle && message) ?
            <Button variant='outlined' form='auth' onClick={onSubmit}>{languages === 'ko' ? '전송' : 'send'}</Button>
            :
            <Button variant='outlined' form='auth' disabled>{languages === 'ko' ? '전송' : 'send'}</Button>
          }
        </div>
      </form>
    </>
  )
}

export default ContactForm
