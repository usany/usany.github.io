import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SignUpForm from 'src/muiComponents/SignUpForm';
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useSelector, useDispatch } from 'react-redux'
import AuthForm from 'src/muiComponents/AuthForm';

function AuthDialogs() {
  const theme = useSelector(state => state.theme)
  
  return (
    <>
      <Drawer>
        <DrawerTrigger className='flex justify-center w-full'>
          <Button sx={{width: '100%'}} variant='outlined'>회원가입</Button>
        </DrawerTrigger>
        <DrawerContent className='bg-light-3 dark:bg-dark-3'>
          <DrawerTitle className='flex justify-center'>
            환영합니다
          </DrawerTitle>
          <div className='p-3'>
            <div>1분이면 계정을 만들 수 있어요</div>
            <div>지루하지 않게 노래도 준비했어요</div>
          </div>
          <div className='flex justify-center pt-3'>
            {theme === 'light' ? 
              <iframe src="https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator" width="90%" height="200" allow="autoplay; clipboard-write; fullscreen; picture-in-picture" loading="lazy" />
              :
              <iframe src="https://open.spotify.com/embed/playlist/41clCj2piQBL3BSEFQN9J3?utm_source=generator&theme=0" width="90%" height="200" allow="autoplay; clipboard-write; fullscreen; picture-in-picture" loading="lazy" />
            }
          </div>
          <AuthForm signIn={false} />
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AuthDialogs
