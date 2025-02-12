import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import staticMail from 'src/assets/signMail.svg'
import AuthDialogs from './AuthDialogs';

const AuthForm = ({ signIn }) => {
  const [account, setAccount] = useState({email: '', password: ''})
  const [error, setError] = useState('')
  const onSubmitSignIn = async (event) => {
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
  const onSubmitSignUp = async (event) => {
    event.preventDefault()
    try {
      let data: object;
      data = await createUserWithEmailAndPassword(auth, account.email, account.password)
      await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
        uid: data.user.uid,
        displayName: data.user.email,
        points: 0,
        profileColor: '#2196f3',
        profileImage: null,
        profileImageUrl: null,
        followerNum: 0,
        followingNum: 0,
        followers: [],
        followings: [],
        messagingToken: null,
      })
      await updateProfile(data.user, {
        displayName: data.user.email
      }).catch((error) => {
        console.log('error')
      })
      const storageRef = ref(storage, data.user.uid);
      uploadString(storageRef, 'null', 'raw').then((snapshot) => {
          console.log('Uploaded a blob or file!');
      });
    } catch (error) {
      if (error.message === 'Firebase: Error (auth/invalid-credential).') {
        const errorMessage = '로그인 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      } else if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
        const errorMessage = '회원가입 실패: 이미 가입된 계정입니다'
        setError(errorMessage)
      } else if (error.message === 'Firebase: Error (auth/invalid-email).') {
        const errorMessage = '회원가입 실패: 계정을 확인해 주세요'
        setError(errorMessage)
      } else {
        console.log(error.message)
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
    <div className='flex justify-center'>
      <div className='flex flex-col border border-solid w-1/2 rounded-lg pt-5'>
        <form id={signIn ? 'auth' : 'signUp'} className='pt-3' onSubmit={signIn ? onSubmitSignIn : onSubmitSignUp}>
          <div className='flex justify-center px-3'>
            <TextField label="이메일" value={account.email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required autoFocus/>
          </div>
          <div className='flex justify-center px-3'>
            <TextField label="비밀번호" value={account.password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
          </div>
          <div className='flex flex-col justify-center p-3'>
            <Button variant='outlined' startIcon={<img src={staticMail} className='w-[20px]'/>} form={signIn ? 'auth' : 'signUp'} type='submit'>{signIn ? '로그인' : '회원가입'}</Button>
            <span>{error}</span>
          </div>
        </form>
        <AuthDialogs />
      </div>
    </div>
  )
}

export default AuthForm