import { useState, useEffect } from 'react'
import Message from 'src/pages/Message'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import { formGroupClasses } from '@mui/material';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import {supabase} from 'src/baseApi/base';
import ContactDialogs from 'src/muiComponents/ContactDialogs';
// import styled from 'styled-components'

// const NavBtn = styled.button`
//   border: dashed;
// `
// const SignBtn = styled.div`
//   display: flex;
//   justify-content: center;
// `
function Contact({ displayName, setDisplayName, isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter, setCounter, setBottomNavigation }) {
  const [messageTitle, setMessageTitle] = useState('')
  const [message, setMessage] = useState('')
  const [formFilledOut, setFormFilledOut] = useState(false)
  const [dialogMove, setDialogMove] = useState(false)
  const [change, setChange] = useState(false)
  // const [password, setPassword] = useState('')
  // const [newAccount, setNewAccount] = useState(false)
  // const [error, setError] = useState('')

  useEffect(() => {
    if (messageTitle && message) {
      setFormFilledOut(true)
    } else {
      setFormFilledOut(false)
    }
  }, [messageTitle, message])

  const onSubmit = async () => {
    try {
      const newMessage = await addDoc(collection(dbservice, 'violations'), {
        userUid: userObj.uid,
        userName: displayName,
        messageTitle: messageTitle,
        message: message
      })
      alert('등록되었습니다')
      setMessageTitle('')
      setMessage('')
      setChange(true)
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
  const handleClose = () => {
    setDialogMove(false)
  }
  return (  
    <div>
      <div className='flex text-2xl p-5'>
        신고하기
      </div>
      <div>
        <span>
          발신:&emsp;
        </span>
        <Chip label={displayName}/>
      </div>
      <div>
        <span>  
          수신:&emsp;
        </span>
        <Chip label='담당자'/>
      </div>
      <form id='auth'>
        <div className='flex justify-center pt-5'>
          <TextField label='신고하기 제목' multiline value={messageTitle} onChange={onChangeMessageTitle} variant="outlined" fullWidth />
        </div>
        <div className='flex justify-center pt-5'>
          <TextField label='신고하기 내용' multiline rows={5} value={message} onChange={onChangeMessage} variant="outlined" fullWidth />
        </div>
        {/* <div className='flex justify-center'>
          <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth />
        </div> */}
        <div className='flex justify-center pt-2.5'>
          {/* <Button variant='outlined' form='auth' type='submit'>{newAccount.account ? '회원가입' : '로그인'}</Button> */}
          <Button variant='outlined' form='auth' onClick={() => setDialogMove(true)}>신고하기 내역</Button>
          <ContactDialogs move={dialogMove} handleClose={handleClose} userObj={userObj} change={change} setChange={setChange}/>
          {formFilledOut ?
            <Button variant='outlined' form='auth' onClick={() => onSubmit()}>전송</Button>
          :
            <Button variant='outlined' form='auth' disabled>전송</Button>
          }
          {/* <span>{error}</span> */}
        </div>
      </form>
    </div>
  )
}

export default Contact
