import { useEffect, useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { dbservice } from 'src/baseApi/serverbase';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelectors } from 'src/hooks/useSelectors';

const reportList = {
  ko: '신고하기 내역',
  en: 'Report list'
}
const ContactDrawersTitle = ({ userObj }) => {
  const [sendMessages, setSendMessages] = useState([])
  const [deletedMessage, setDeletedMessage] = useState()
  const languages = useSelectors((state) => state.languages.value)
  const index = (languages === 'ko' || languages === 'en') ? languages : 'ko'

  const collectionQuery = query(collection(dbservice, 'violations'))
  const deleteMessage = (value) => {
    const deletedId = value.id
    const deleting = doc(dbservice, `violations/${deletedId}`)
    deleteDoc(deleting)
    const deletedSendMessages = []
    sendMessages.map((element, index) => {
      if (element.id !== deletedId) {
        deletedSendMessages.push(element)
      }
      if (index + 1 === sendMessages.length) {
        setSendMessages(deletedSendMessages)
      }
    })
    alert('지웠습니다')
  }
  useEffect(() => {
    const docs = async () => {
      const messagesArray = []
      const messages = await getDocs(collectionQuery)
      messages.forEach((value) => {
        if (value.data().userUid === userObj.uid) {
          const messageObj = value.data()
          const message = { id: value.id, ...messageObj }
          messagesArray.push(message)
        }
        setSendMessages(messagesArray)
      })
    }
    docs()
  }, [])
  console.log(sendMessages)
  return (
    <div className='flex justify-center pt-5'>
      {reportList[index]}
    </div>
  )
}

export default ContactDrawersTitle
