import { useState, useMemo, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialogs from 'src/muiComponents/Dialogs';
import SignInDialogs from 'src/muiComponents/SignInDialogs';
import Motions from 'src/muiComponents/Motions';
import {supabase} from 'src/baseApi/base';

function Auth({ setValue }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [newAccount, setNewAccount] = useState(false)
  async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log(data)
  }  
  const onSubmit = async (event) => {
    event.preventDefault()
    try {
      let data: object;
      if (newAccount.account) {
        data = await createUserWithEmailAndPassword(auth, email, password)
        
        await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
          uid: data.user.uid,
          displayName: data.user.uid,
          points: 0,
          profileColor: '#2196f3',
          profileImage: null,
          followerNum: 0,
          followingNum: 0,
          followers: [],
          followings: [],
          messagingToken: null
        })
        await updateProfile(data.user, {
          displayName: data.user.uid
        }).catch((error) => {
          console.log('error')
        })
        setNewAccount({
          ...newAccount,
          round: setNewAccount.round+1
        })
      } else {
        data = await signInWithEmailAndPassword(auth, email, password)
      }
      // console.log(data)
      setNewAccount({
        ...newAccount,
        account: false
      })
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
    setValue(2)
    signInWithEmail(email, password)
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

  // const onRound = (round) => {
  //   if (round === 0) {
  //     setNewAccount({
  //       ...newAccount,
  //       round: newAccount.round+1
  //     })
  //   } else if (round === 1) {
  //     setNewAccount({
  //       ...newAccount,
  //       round: newAccount.round-1
  //     })
  //   }
  // }
  const toggleAccount = () => setNewAccount(!newAccount)
  const motions = useMemo(() => <Motions />, [])
  return (  
    <div className='p-5'>
      <div className='flex justify-start text-2xl'>
        로그인
      </div>
      <form id='auth' className='pt-5' onSubmit={onSubmit}>
        <div className='flex justify-center'>
          <TextField label="이메일" value={email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth required autoFocus/>
        </div>
        <div className='flex justify-center'>
          <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth required />
        </div>
        <div className='flex flex-col justify-center pt-2.5'>
          {/* <Button variant='outlined' form='auth' type='submit'>{newAccount.account ? '회원가입' : '로그인'}</Button> */}
          <Button variant='outlined' form='auth' type='submit'>로그인</Button>
          <span>{error}</span>
        </div>
      </form>
      {/* {!newAccount.account ? 
      :
      <form id='auth' className='pt-5' onSubmit={onSubmit}>
        <div className='flex justify-center'>
          <TextField label="이메일" value={email} onChange={onChange} variant="outlined" name='email' type='email' fullWidth autoFocus/>
        </div>
        <div className='flex justify-center'>
          <TextField label="비밀번호" value={password} onChange={onChange} variant="outlined" name='password' type='password' fullWidth />
        </div>
        <div className='flex flex-col justify-center pt-2.5'>
          <Button variant='outlined' form='auth' type='submit'>로그인</Button>
          <span>{error}</span>
        </div>
      </form>
      } */}
      <div className='flex justify-center pt-2.5'>
      <Button variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>
      <Button variant='outlined' name='h' onClick={onSocialClick}>깃허브로 로그인</Button>
        {/* {newAccount.account && <Button variant='outlined' name='g' onClick={onSocialClick}>구글로 회원가입</Button>}
        {!newAccount.account && <Button variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>}
        {newAccount.account && <Button variant='outlined' name='h' onClick={onSocialClick}>깃허브로 회원가입</Button>}
        {!newAccount.account && <Button variant='outlined' name='h' onClick={onSocialClick}>깃허브로 로그인</Button>} */}
        {/* <Button variant='outlined' onClick={toggleAccount}>{newAccount.account ? '로그인' : '회원가입'}</Button> */}
        <Button variant='outlined' onClick={toggleAccount}>회원가입</Button>
      </div>
      <div className='p-10'>
        <SignInDialogs move={newAccount} handleClose={toggleAccount}/>
      </div>
      {motions}
    </div>
  )
}

export default Auth
