import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, getDocs, setDoc, collection, where, query, deleteDoc } from 'firebase/firestore';
import {supabase} from 'src/baseApi/base';
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ContactDialogs({ move, handleClose, userObj, change, setChange }) {
    const [sendMessages, setSendMessages] = useState(null)
    const [messageNumber, setMessageNumber] = useState(0)
    // const collectionRef = collection(dbservice, 'violations')
    // const collectionQuery = query(collection(dbservice, 'violations'), where('userUid', '==', userObj.id))
    const collectionQuery = query(collection(dbservice, 'violations'))
    const deleteMessage = (element) => {
        console.log(element)
        const deleting = doc(dbservice, `violations/${element.id}`)
        // const data = doc(dbservice, `violations/${messageId}`)
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
                    // console.log(element)
                    return (
                        <div>
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    // aria-controls="panel1-content"
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
                            {/* <div className='flex justify-center pt-5'>
                                <TextField label='신고하기 제목' multiline value={element.messageTitle} variant="outlined" onClick={() => setMessageNumber(index+1)} fullWidth />
                            </div>
                            {messageNumber === index+1 &&
                                <div className='flex justify-center pt-5'>
                                    <TextField label='신고하기 내용' multiline rows={5} value={element.message} variant="outlined" fullWidth />
                                </div>
                            } */}
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
