import { useEffect, useState } from 'react';
// import Dialog from '@mui/material/Dialog';
// import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { collection, deleteDoc, doc, getDocs, query } from 'firebase/firestore';
import { dbservice } from 'src/baseApi/serverbase';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import Divider from '@mui/material/Divider';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useSelectors } from 'src/hooks/useSelectors';
import Lists from 'src/pages/search/searchList/searchListViews/Lists';
import DrawersBar from '../core/DrawersBar';

const reportList = {
  ko: '신고하기 내역',
  en: 'Report list'
}
const ContactDrawers = ({ userObj }) => {
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
    <>
      <Drawer>
        <DrawerTrigger>
          <Button variant='outlined' form='auth'>{reportList[index]}</Button>
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <div className='flex justify-center pt-5'>
              {reportList[index]}
            </div>
            <div className='p-5'>
              {sendMessages.length !== 0 ? sendMessages.map((value, index) => {
                return (
                  <div>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={index.toString()}>
                        <AccordionTrigger>{value.messageTitle}</AccordionTrigger>
                        <AccordionContent>
                          <div>{value.message}</div>
                          {value?.violationUser ?
                            <div>
                              <div className='pt-5'>{languages === 'ko' ? '신고 등록 유저' : 'Report registered user'}</div>
                              <Lists elements={[value.violationUser]} multiple={true} userSearch={true} ranking={false} handleUser={(value) => console.log(value)} />
                            </div>
                            :
                            <Divider variant="inset" />
                          }
                          <div className='flex pt-3 justify-center'>
                            <Button variant='outlined' onClick={() => deleteMessage(value)}>{languages === 'ko' ? '지우기' : 'Delete'}</Button>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                )
              })
                :
                <div>{languages === 'ko' ? '신고하기 내역이 없습니다.' : 'No report'}</div>
              }
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
      {/* <Dialog fullWidth={true} open={move} onClose={handleClose}>
            <DialogContent>
              <div>
                신고하기 내역
              </div>
              <div>
                {sendMessages?.map((element, index) => {
                    return (
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id={index}
                                >
                                    {element.messageTitle}
                                </AccordionSummary>
                                <AccordionDetails>
                                    {element.message}
                                </AccordionDetails>
                                <AccordionActions>
                                    <Button variant='outlined' onClick={() => deleteMessage(element)}>지우기</Button>
                                </AccordionActions>
                            </Accordion>
                        </div>
                    )
                })}
              </div>
              <Button variant='outlined' onClick={handleClose}>
                  닫기
              </Button>
            </DialogContent>
        </Dialog> */}
    </>
  )
}

export default ContactDrawers
