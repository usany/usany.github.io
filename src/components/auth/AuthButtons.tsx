import { useState, useMemo, useEffect } from 'react'
import { auth, onSocialClick, dbservice, onSocialClickMicrosoft, ui } from 'src/baseApi/serverbase'
import Button from '@mui/material/Button';
import AuthDialogs from 'src/components/auth/AuthDialogs';
import { GithubAuthProvider, OAuthProvider } from 'firebase/auth';
import firebaseui from 'firebaseui';
import {APIProvider} from '@vis.gl/react-google-maps';
const AuthButtons = () => {
  useEffect(() => {
    ui.start('#firebaseui-auth-container', {
      signInOptions: [
        new OAuthProvider('microsoft.com').providerId,
        GithubAuthProvider.PROVIDER_ID
      ],
      signInFlow: 'popup'
    })
  })
  return (
    <div className='flex flex-col w-screen items-center justify-center px-20'>
        <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>
        <div id='firebaseui-auth-container' className='bg-light-3 w-full'></div>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClickMicrosoft}>마이크로소프트로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' name='h' onClick={onSocialClick}>애플로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClick}>페이스북으로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' onClick={onSocialClick}>트위터로 로그인</Button>
      <AuthDialogs />
    </div>
  )
}

export default AuthButtons