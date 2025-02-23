import { useState, useMemo, useEffect } from 'react'
// import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
// import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { doc, setDoc } from 'firebase/firestore';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialogs from 'src/components/Dialogs';
import PageTitle from 'src/pages/core/pageTitle/PageTitle';
import AuthButtons from 'src/pages/main/auth/AuthButtons';
import AuthForm from 'src/pages/main/auth/AuthForm';
import SignInDialogs from 'src/components/SignInDialogs';
import Motions from 'src/pages/main/auth/Motions';
import {supabase} from 'src/baseApi/base';

function Auth() {
  const motions = useMemo(() => <Motions />, [])
  return (  
    <div>
      <PageTitle title={'로그인'} />
      <div className='flex justify-center p-5'>반갑습니다. 캠퍼스 우산 공유 서비스 쿠우산입니다.</div>
      <AuthForm signIn={true} />
      <AuthButtons />
      <div className='flex justify-center pt-5 px-5'>날씨 플레이리스트도 준비되어 있어요.</div>
      {motions}
    </div>
  )
}

export default Auth
