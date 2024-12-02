import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SignInDialogs from 'src/muiComponents/SignInDialogs';

interface Props {
  changeNewAccount: () => void
}

const AuthButtons = ({ changeNewAccount }: Props) => {
  return (
    <div className='flex flex-col justify-center px-20'>
      <div>
        <Button sx={{width: '50%'}} variant='outlined' name='g' onClick={onSocialClick}>구글로 로그인</Button>
        <Button sx={{width: '50%'}} variant='outlined' name='h' onClick={onSocialClick}>깃허브로 로그인</Button>
      </div>
      <Button sx={{width: '100%'}} variant='outlined' onClick={changeNewAccount}>회원가입</Button>
    </div>
  )
}

export default AuthButtons