import { useState, useEffect } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { doc, getDoc, getDocs, setDoc, collection, where, query, deleteDoc } from 'firebase/firestore';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
  } from "@/components/ui/drawer"
 
const ContactDialogs = ({ move, handleClose, userObj, change, setChange }) => {
    const [sendMessages, setSendMessages] = useState([])
    const [dialogMove, setDialogMove] = useState(false)
    const [goal, setGoal] = useState(350)
 
    function onClick(adjustment: number) {
      setGoal(Math.max(200, Math.min(400, goal + adjustment)))
    }
  
    const collectionQuery = query(collection(dbservice, 'violations'))
    const deleteMessage = (element) => {
        console.log(element)
        const deleting = doc(dbservice, `violations/${element.id}`)
        deleteDoc(deleting)
        setChange(true)
        alert('지웠습니다')
        handleClose()
    }
    useEffect(() => {
        const docs = async () => {
            const messagesArray = []
            const messages = await getDocs(collectionQuery)
            messages.forEach((element) => {
                if (element.data().userUid === userObj.uid) {
                    const elementMessageTitle = element.data().messageTitle
                    const elementMessage = element.data().message
                    const elementId = element.id
                    const message = {
                        id: elementId,
                        messageTitle: elementMessageTitle,
                        message: elementMessage
                    }
                    messagesArray.push(message)
                }
                setSendMessages(messagesArray)
            })
        }
        if (!sendMessages || change) {
            docs()
            setChange(false)
        }
    })
    // console.log(sendMessages)
    return (
        <div>
            <Drawer>
                <DrawerTrigger>
                    <Button variant='outlined' form='auth' onClick={() => setDialogMove(true)}>신고하기 내역</Button>
                </DrawerTrigger>
                <DrawerContent className='bg-light-3 dark:bg-dark-3'>
                  <div className='flex justify-center'>
                    <div className="bg-light-2 dark:bg-dark-2 h-2 w-[100px] rounded-full bg-muted">
                        &emsp;
                    </div>
                  </div>
                  <div className='flex justify-center pt-5'>
                    신고하기 내역
                  </div>
                  <div className='p-5'>
                    {sendMessages.length !== 0 ? sendMessages.map((element, index) => {
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
                    })
                    :
                    <div>신고하기 내역이 없습니다.</div>
                  }                
                  </div>
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
        </div>
    )
}

export default ContactDialogs
