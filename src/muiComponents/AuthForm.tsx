import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

interface Props {
    title: string
}

const AuthForm = () => {
  const [account, setAccount] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  // async function signInWithEmail(email, password) {
  //   const { data, error } = await supabase.auth.signInWithPassword({
  //     email: email,
  //     password: password,
  //   })
  //   console.log(data)
  // }  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      // let data: object;
      // if (newAccount.account) {
      //   data = await createUserWithEmailAndPassword(auth, email, password)
      //   await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
      //     uid: data.user.uid,
      //     displayName: data.user.uid,
      //     points: 0,
      //     profileColor: '#2196f3',
      //     profileImage: null,
      //     followerNum: 0,
      //     followingNum: 0,
      //     followers: [],
      //     followings: [],
      //     messagingToken: null
      //   })
      //   await updateProfile(data.user, {
      //     displayName: data.user.uid
      //   }).catch((error) => {
      //     console.log('error')
      //   })
      // } else {
      // }
      await signInWithEmailAndPassword(auth, account.email, account.password)
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        const errorMessage = '로그인 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      }
    }
    // setValue(2)
    // signInWithEmail(email, password)
  }

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event
    if (name === 'email') {
      setAccount({email: value, password: account.password})
    } else if (name === 'password') {
      setAccount({...account, password: value})
    }
  }
  return (
    <form id='auth' className='pt-3' onSubmit={onSubmit}>
      <div className='flex justify-center px-3'>
        <TextField label="이메일" value={account.email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required autoFocus/>
      </div>
      <div className='flex justify-center px-3'>
        <TextField label="비밀번호" value={account.password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
      </div>
      <div className='flex flex-col justify-center pt-3 px-3'>
        <Button variant='outlined' form='auth' type='submit'>로그인</Button>
      </div>
      <span className='px-3'>{error}</span>
    </form>
  )
}

export default AuthForm