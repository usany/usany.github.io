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

// const reportTitle = {
//   ko: '신고하기 제목',
//   en: 'Report Title',
// }
// const reportContent = {
//   ko: '신고하기 내용',
//   en: 'Report Content',
// }

function ContactForm() {
  const { state } = useLocation()
  const user = state?.user
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
  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'
  const profile = useSelectors((state) => state.profile.value)
  const {send, reportTitle, reportContent} = useTexts()
  useEffect(() => {
    if (user && initialViolationUser) {
      setViolationUser(user)
      setInitialViolationUser(false)
    }
  }, [user])

  const onSubmit = async () => {
    try {
      await addDoc(collection(dbservice, 'violations'), {
        userUid: profile?.uid || '비로그인',
        userName: profile?.displayName || '비로그인',
        messageTitle: messageTitle,
        message: messageContent,
        violationUser: violationUser,
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessageContent('')
      setViolationUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessageContent = (event: { target: { value: string } }) => {
    const {
      target: { value },
    } = event
    setMessageContent(value)
  }
  const onChangeMessageTitle = (event: { target: { value: string } }) => {
    const {
      target: { value },
    } = event
    setMessageTitle(value)
  }

  return (
    <form id="auth">
      <div className="flex justify-center pt-5 px-5">
        <TextField
          name="title"
          label={reportTitle}
          multiline
          value={messageTitle}
          onChange={onChangeMessageTitle}
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
          value={messageContent}
          onChange={onChangeMessageContent}
          variant="outlined"
          fullWidth
        />
      </div>
      {profile?.certificated && (
        <div className="flex pt-3 px-5 gap-1">
          <ContactFormDrawers
            violationUser={violationUser}
            changeViolationUser={(newValue) => setViolationUser(newValue)}
          />
        </div>
      )}
      <div className="flex justify-center pt-2.5">
        {profile?.certificated && (
          <Popups
            trigger={<ContactDrawersTrigger />}
            title={<ContactDrawersTitle />}
            content={<ContactDrawersContent />}
          />
        )}

        {messageTitle && messageContent ? (
          <Button variant="outlined" form="auth" onClick={onSubmit}>
            {send}
          </Button>
        ) : (
          <Button variant="outlined" form="auth" disabled>
            {send}
          </Button>
        )}
      </div>
    </form>
  )
}

export default ContactForm
