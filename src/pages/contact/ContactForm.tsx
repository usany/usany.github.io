import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { addDoc, collection } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors, useTexts } from 'src/hooks'
import ContactFormDrawers from 'src/pages/contact/ContactFormDrawers'
import ContactDrawersTrigger from './ContactDrawersTrigger'
import ContactDrawersTitle from './ContactDrawersTitle'
import ContactDrawersContent from './ContactDrawersContent'
import Popups from '../core/Popups'
import { useLocation } from 'react-router-dom'
import ContactAddress from './ContactAddress'

function ContactForm() {
  const { state } = useLocation()
  const user = state?.user
  const [message, setMessage] = useState({title: '', content: ''})
  const [violationUser, setViolationUser] = useState<{
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null>(null)
  const [initialViolationUser, setInitialViolationUser] = useState(true)
  const profile = useSelectors((state) => state.profile.value)
  const {sending, receiving, supervisor, send, reportTitle, reportContent, anonymousUser} = useTexts()

  useEffect(() => {
    if (user && initialViolationUser) {
      setViolationUser(user)
      setInitialViolationUser(false)
    }
  }, [user])

  const onSubmit = async () => {
    try {
      if (message.title && message.content) {
        await addDoc(collection(dbservice, 'violations'), {
          userUid: profile?.uid || '비로그인',
          userName: profile?.displayName || '비로그인',
          messageTitle: message.title,
          message: message.content,
          violationUser: violationUser,
        })
        alert('등록되었습니다')
        setMessage({
          title: '', content: ''
        })
        setViolationUser(null)
      } else {
        alert('내용을 작성해주세요')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessage = (event: { target: { value: string, name: string } }) => {
    const {
      target: { value, name },
    } = event
    setMessage({
      ...message, [name]: value
    })
  }
  const onChangeMessageTitle = (event: { target: { value: string } }) => {
    const {
      target: { value },
    } = event
    setMessage({
      ...message, title: value
    })
  }

  return (
    <form id="auth">
      <ContactAddress action={sending} label={profile ? profile?.displayName: anonymousUser} />
      <ContactAddress action={receiving} label={supervisor} />
      <div className="flex justify-center pt-5 px-5">
        <TextField
          name="title"
          label={reportTitle}
          multiline
          value={message.title}
          onChange={onChangeMessage}
          variant="outlined"
          fullWidth
        />
      </div>
      <div className="flex justify-center pt-5 px-5">
        <TextField
          name="content"
          label={reportContent}
          multiline
          rows={5}
          value={message.content}
          onChange={onChangeMessage}
          variant="outlined"
          fullWidth
        />
      </div>
      <ContactFormDrawers
        violationUser={violationUser}
        changeViolationUser={(newValue) => setViolationUser(newValue)}
      />
      {/* {profile?.certificated && (
        <div className="flex pt-3 px-5 gap-1">
          <ContactFormDrawers
            violationUser={violationUser}
            changeViolationUser={(newValue) => setViolationUser(newValue)}
          />
        </div>
      )} */}
      <div className="flex justify-center pt-2.5">
        {profile?.certificated && (
          <Popups
            trigger={<ContactDrawersTrigger />}
            title={<ContactDrawersTitle />}
            content={<ContactDrawersContent />}
          />
        )}
        <Button variant="outlined" form="auth" onClick={onSubmit}>
          {send}
        </Button>
      </div>
    </form>
  )
}

export default ContactForm
