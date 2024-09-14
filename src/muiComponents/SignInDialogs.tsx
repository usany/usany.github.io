import { useState } from 'react'
import { Link } from 'react-router-dom'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import {supabase} from 'src/baseApi/base';

function SignInDialogs({move, handleClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
  async function signUpNewUser(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      // options: {
      //   emailRedirectTo: 'https://example.com/welcome',
      // },
    })
  }  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data: object;
      data = await createUserWithEmailAndPassword(auth, email, password)
      
      await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
        uid: data.user.uid,
          displayName: data.user.uid,
          points: 0,
          profileColor: '#2196f3',
          profileImage: null,
          followerNum: 0,
          followingNum: 0,
      })
      await updateProfile(data.user, {
        displayName: data.user.uid
      }).catch((error) => {
        console.log('error')
      })
      // if (newAccount.account) {
      //   data = await createUserWithEmailAndPassword(auth, email, password)
      //   await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
      //     uid: data.user.uid,
      //     displayName: data.user.uid,
      //     points: 0,
      //     round: newAccount.round
      //   })
      //   await updateProfile(data.user, {
      //     displayName: data.user.uid
      //   }).catch((error) => {
      //     console.log('error')
      //   })
      // } else {
      //   data = await signInWithEmailAndPassword(auth, email, password)
      // }
      console.log(data)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
    signUpNewUser(email, password)
    handleClose()
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

    return (
        <Dialog fullWidth={true} open={move} onClose={handleClose}>
            <DialogContent>
              환영합니다
              <form id='signIn' className='pt-5' onSubmit={onSubmit}>
                  <div className='flex justify-center'>
                      <TextField label="이메일" value={email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required autoFocus/>
                  </div>
                  <div className='flex justify-center'>
                      <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
                  </div>
                  <div className='flex flex-col justify-center pt-2.5'>
                      <Button variant='outlined' form='signIn' type='submit'>회원가입</Button>
                      <span>{error}</span>
                  </div>
              </form>
              <Button variant='outlined' onClick={handleClose}>
                  닫기
              </Button>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialogs
