import { useEffect, useState } from 'react'
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectors } from 'src/hooks'

const reportList = {
  ko: '신고하기 내역',
  en: 'Report list',
}
const ContactDrawersTrigger = () => {
  const [sendMessages, setSendMessages] = useState([])
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)

  const index = languages === 'ko' || languages === 'en' ? languages : 'ko'

  const collectionQuery = query(collection(dbservice, 'violations'))
  useEffect(() => {
    const docs = async () => {
      const messagesArray = []
      const messages = await getDocs(collectionQuery)
      messages.forEach((value) => {
        if (value.data().userUid === profile?.uid) {
          const messageObj = value.data()
          const message = { id: value.id, ...messageObj }
          messagesArray.push(message)
        }
        setSendMessages(messagesArray)
      })
    }
    docs()
  }, [])
  return (
    <Button variant="outlined" form="auth">
      {reportList[index]}
    </Button>
  )
}

export default ContactDrawersTrigger
