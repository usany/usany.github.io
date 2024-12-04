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

function SignInDialogs({ move, handleClose, changeNewAccount }) {
    return (
      <div>
        <Drawer>
          <DrawerTrigger>
            <Button sx={{width: '100%'}} variant='outlined' onClick={changeNewAccount}>회원가입</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerTitle>
              환영합니다
            </DrawerTitle>
            <div>1분이면 계정을 만들 수 있어요</div>
            <div>지루하지 않게 노래도 준비했어요</div>
            <iframe src="https://open.spotify.com/embed/playlist/5C9ADjArybPy54GTZgXtZO?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
            <SignUpForm handleClose={handleClose} />
          </DrawerContent>
        </Drawer>
        {/* <Dialog fullWidth={true} open={move} onClose={handleClose}>
          <DialogContent>
            <div>환영합니다</div>
            <div>1분이면 계정을 만들 수 있어요</div>
            <div>지루하지 않게 노래도 준비했어요</div>
            <iframe src="https://open.spotify.com/embed/playlist/5C9ADjArybPy54GTZgXtZO?utm_source=generator"       width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"/>
            <SignUpForm handleClose={handleClose} />
          </DialogContent>
        </Dialog> */}
      </div>
    )
}

export default SignInDialogs
