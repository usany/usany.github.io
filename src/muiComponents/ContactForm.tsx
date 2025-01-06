import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { User } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ContactDrawers from 'src/muiComponents/ContactDrawers';
import ContactMemberDrawers from 'src/muiComponents/ContactMemberDrawers';
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
import Lists from 'src/muiComponents/Lists'
import ContactFormDrawers from 'src/muiComponents/ContactFormDrawers'
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

interface Props {
  userObj: User
}

function ContactForm({ userObj, user }: Props) {
  const [messageTitle, setMessageTitle] = useState('')
  const [message, setMessage] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)
  const [violationUser, setViolationUser] = useState(null)
  const [initialViolationUser, setInitialViolationUser] = useState(true)
  useEffect(() => {
    if (user && initialViolationUser) {
      setViolationUser(user)
      setInitialViolationUser(false)
    }
  }, [user])

  useEffect(() => {
    if (messageTitle && message) {
      setFormFilledOut(true)
    } else {
      setFormFilledOut(false)
    }
  }, [messageTitle, message])

  const onSubmit = async () => {
    try {
      await addDoc(collection(dbservice, 'violations'), {
        userUid: userObj.uid,
        userName: userObj.displayName,
        messageTitle: messageTitle,
        message: message,
        violationUser: violationUser
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessage('')
    } catch (error) {
      console.log(error)
    }
  }

  const onChangeMessage = (event) => {
    const {
      target: { name, value }
    } = event
    setMessage(value)
  }
  const onChangeMessageTitle = (event) => {
    const {
      target: { name, value }
    } = event
    setMessageTitle(value)
  }

  return (  
    <>
      <form id='auth'>
        <div className='flex justify-center pt-5 px-5'>
          <TextField label='신고하기 제목' multiline value={messageTitle} onChange={onChangeMessageTitle} variant="outlined" fullWidth />
        </div>
        <div className='flex justify-center pt-5 px-5'>
          <TextField label='신고하기 내용' multiline rows={5} value={message} onChange={onChangeMessage} variant="outlined" fullWidth />
        </div>
        {/* {user && <div>{user.displayName}</div>} */}
        <div className='flex pt-3 px-5 gap-1'>
          <ContactFormDrawers violationUser={violationUser} changeViolationUser={(newValue) => setViolationUser(newValue)}/>
          {/* <Drawer>
            <DrawerTrigger className='w-screen' onClick={() => setUserSearch('')}>
              {violationUser ? 
                <Card sx={{width: '100%'}}>
                  <div className='flex'>
                    <div className='flex flex-col justify-center'>신고 유저:</div>
                    <div className='px-5'>
                      <Avatar className={`bg-${(violationUser?.profileColor || []).indexOf('#') === -1 ? violationUser?.profileColor : 'profile-blue'}`}>
                        <AvatarImage src={violationUser?.profileImageUrl} />
                        <AvatarFallback className='text-xl border-none'>{violationUser?.displayName[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className='flex flex-col justify-center'>{violationUser.displayName}</div>
                  </div>
                </Card>
              :
                <Button sx={{width: '100%'}} variant='outlined' form='auth'>신고 유저 등록</Button>
              }
            </DrawerTrigger>
            <DrawerContent className='h-1/2 bg-light-3 dark:bg-dark-3'>             
              <div className='px-5 flex flex-col'>
                <TextField label='유저 이름' onChange={onChangeUserSearch}/>
                {userSearch && 
                  <DrawerClose>
                    <Lists elements={rank} multiple={true} userSearch={userSearch} ranking={false} handleUser={(newValue) => setViolationUser(newValue)}/>
                  </DrawerClose>
                }
              </div>
            </DrawerContent>
          </Drawer>
          {violationUser && <Button sx={{width: '25%'}} variant='outlined' onClick={() => setViolationUser(null)}>신고 등록 취소</Button>} */}
        </div>
        <div className='flex justify-center pt-2.5'>
          <ContactDrawers userObj={userObj} />
          {formFilledOut ?
            <Button variant='outlined' form='auth' onClick={onSubmit}>전송</Button>
          :
            <Button variant='outlined' form='auth' disabled>전송</Button>
          }
        </div>
      </form>
    </>
  )
}

export default ContactForm
