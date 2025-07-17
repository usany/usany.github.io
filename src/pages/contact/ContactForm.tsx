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
  user: {
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null
}

function ContactForm({ userObj, user }: Props) {
  // const [message, setMessage] = useState({
  //   'title': '',
  //   'content': ''
  // })
  const [messageTitle, setMessageTitle] = useState('')
  const [messageContent, setMessageContent] = useState('')
  const [violationUser, setViolationUser] = useState<{
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null>(null)
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
        userUid: userObj?.uid || '익명',
        userName: userObj?.displayName || '익명',
        messageTitle: messageTitle,
        message: messageContent,
        violationUser: violationUser
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessageContent('')
      setViolationUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  // const onChangeMessage = (event: { target: { name: string, value: string } }) => {
  //   const {
  //     target: { name, value }
  //   } = event
  //   setMessage({ ...message, [name]: value })
  // }
  const onChangeMessageContent = (event: { target: { value: string } }) => {
    const {
      target: { value }
    } = event
    setMessageContent(value)
  }
  const onChangeMessageTitle = (event: { target: { value: string } }) => {
    const {
      target: { value }
    } = event
    setMessageTitle(value)
  }

  return (
    <form id='auth'>
      <div className='flex justify-center pt-5 px-5'>
        <TextField name='title' label={reportTitle[index]} multiline value={messageTitle} onChange={onChangeMessageTitle} variant="outlined" fullWidth />
      </div>
      <div className='flex justify-center pt-5 px-5'>
        <TextField name='content' label={reportContent[index]} multiline rows={5} value={messageContent} onChange={onChangeMessageContent} variant="outlined" fullWidth />
      </div>
      {userObj &&
        <div className='flex pt-3 px-5 gap-1'>
          <ContactFormDrawers violationUser={violationUser} changeViolationUser={(newValue) => setViolationUser(newValue)} />
        </div>
      }
      <div className='flex justify-center pt-2.5'>
        {userObj && <ContactDrawers userObj={userObj} />}
        {(messageTitle && messageContent) ?
          <Button variant='outlined' form='auth' onClick={onSubmit}>{languages === 'ko' ? '전송' : 'send'}</Button>
          :
          <Button variant='outlined' form='auth' disabled>{languages === 'ko' ? '전송' : 'send'}</Button>
        }
      </div>
    </form>
  )
}

export default ContactForm
