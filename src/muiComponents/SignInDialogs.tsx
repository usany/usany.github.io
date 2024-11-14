import { useState } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SignUpForm from 'src/muiComponents/SignUpForm';
import { auth, onSocialClick, dbservice } from 'src/baseApi/serverbase'
import { updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from 'firebase/firestore';

function SignInDialogs({ move, handleClose }) {
    return (
        <Dialog fullWidth={true} open={move} onClose={handleClose}>
          <DialogContent>
            <div>환영합니다</div>
            <div>1분이면 계정을 만들 수 있어요</div>
            <div>지루하지 않게 날씨 노래도 틀어드릴게요</div>
            <SignUpForm handleClose={handleClose} />
          </DialogContent>
        </Dialog>
    )
}

export default SignInDialogs
