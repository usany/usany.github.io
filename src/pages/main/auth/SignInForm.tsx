import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";

const AuthSignIn = ({ signIn }) => {
  const [account, setAccount] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, account.email, account.password)
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        const errorMessage = '로그인 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      }
    }
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
    <div>
      {signIn ? 
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
      :
        <form id='signUp' onSubmit={onSubmitSignUp}>
          <div className='flex justify-center px-3'>
            <TextField label="이메일" value={account.email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required />
          </div>
          <div className='flex justify-center px-3'>
            <TextField label="비밀번호" value={account.password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
          </div>
          <div className='flex flex-col justify-center p-3'>
            <span className='flex justify-center'>{error}</span>
            <Button variant='outlined' form='signUp' type='submit'>회원가입</Button>
          </div>
        </form>
      }
    </div>
  )
}

export default AuthSignIn