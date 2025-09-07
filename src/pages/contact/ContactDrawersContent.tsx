import { useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore'
import { dbservice } from 'src/baseApi/serverbase'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Divider from '@mui/material/Divider'
import { useSelectors, useTexts } from 'src/hooks'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

const ContactDrawersContent = () => {
  const [sendMessages, setSendMessages] = useState([])
  const languages = useSelectors((state) => state.languages.value)
  const profile = useSelectors((state) => state.profile.value)
  const {noReport, delete} = useTexts()
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

  if (sendMessages.length === 0) return <div>{noReport}</div>
  return (
    <div className="p-5">
      {sendMessages.map((value, index) => {
          return (
            <div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value={index.toString()}>
                  <AccordionTrigger>{value.messageTitle}</AccordionTrigger>
                  <AccordionContent>
                    <div>{value.message}</div>
                    {value?.violationUser ? (
                      <div>
                        <div className="pt-5">
                          {languages === 'ko'
                            ? '신고 등록 유저'
                            : 'Report registered user'}
                        </div>
                        <Lists
                          elements={[value.violationUser]}
                          multiple={true}
                          userSearch={true}
                          ranking={false}
                          handleUser={(value) => console.log(value)}
                        />
                      </div>
                    ) : (
                      <Divider variant="inset" />
                    )}
                    <div className="flex pt-3 justify-center">
                      <Button
                        variant="outlined"
                        onClick={() => deleteMessage(value)}
                      >
                        {delete}
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )
        })}
    </div>
  )
}

export default ContactDrawersContent
