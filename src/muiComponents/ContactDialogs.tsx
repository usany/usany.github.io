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

const ContactDialogs = ({ move, handleClose, userObj, change, setChange }) => {
    const [sendMessages, setSendMessages] = useState(null)
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

    return (
        <Dialog fullWidth={true} open={move} onClose={handleClose}>
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
        </Dialog>
    )
}

export default ContactDialogs
