import { useState, useMemo, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialogs from 'src/muiComponents/Dialogs';
import PageTitle from 'src/muiComponents/PageTitle';
import AuthButtons from 'src/muiComponents/AuthButtons';
import SignInForm from 'src/muiComponents/SignInForm';
import SignInDialogs from 'src/muiComponents/SignInDialogs';
import Motions from 'src/muiComponents/Motions';
import {supabase} from 'src/baseApi/base';

function Auth() {
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [error, setError] = useState('')
  const [newAccount, setNewAccount] = useState(false)
  async function signInWithEmail(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log(data)
  }  
  // const onSubmit = async (event) => {
  //   event.preventDefault()
  //   try {
  //     let data: object;
  //     if (newAccount.account) {
  //       data = await createUserWithEmailAndPassword(auth, email, password)
  //       await setDoc(doc(dbservice, 'members', `${data.user.uid}`), {
  //         uid: data.user.uid,
  //         displayName: data.user.uid,
  //         points: 0,
  //         profileColor: '#2196f3',
  //         profileImage: null,
  //         followerNum: 0,
  //         followingNum: 0,
  //         followers: [],
  //         followings: [],
  //         messagingToken: null
  //       })
  //       await updateProfile(data.user, {
  //         displayName: data.user.uid
  //       }).catch((error) => {
  //         console.log('error')
  //       })
  //     } else {
  //       data = await signInWithEmailAndPassword(auth, email, password)
  //     }
  //   } catch (error) {
  //     if (error.message === 'Firebase: Error (auth/invalid-credential).') {
  //       const errorMessage = '로그인 실패: 계정을 확인해 주세요'
  //       setError(errorMessage)
  //     }
  //   }
  //   signInWithEmail(email, password)
  // }

  // const onChange = (event) => {
  //   const {
  //     target: { name, value }
  //   } = event
  //   if (name === 'email') {
  //     setEmail(value)
  //   } else if (name === 'password') {
  //     setPassword(value)
  //   }
  // }

  // const toggleAccount = () => setNewAccount(!newAccount)
  const motions = useMemo(() => <Motions />, [])
  return (  
    <div>
      <PageTitle title={'로그인'} />
      <div className='px-5'>반갑습니다. 캠퍼스 우산 공유 서비스 쿠우산입니다.</div>
      <SignInForm />
      <AuthButtons changeNewAccount={() => setNewAccount(true)}/>
      <SignInDialogs move={newAccount} handleClose={() => setNewAccount(false)}/>
      <div className='pt-5 px-5'>날씨 플레이리스트도 준비되어 있어요.</div>
      {motions}
    </div>
  )
}

export default Auth
