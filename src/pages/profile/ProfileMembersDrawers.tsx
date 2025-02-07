import { useState, useEffect, useReducer } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, deleteDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { getAuth, deleteUser } from "firebase/auth";
import Button from '@mui/material/Button';
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
import { ScrollArea } from "@/components/ui/scroll-area"
import TextField from '@mui/material/TextField';

const ProfileMembersDrawers = ({
  userObj,
}) => {
  const [confirmEmail, setConfirmEmail] = useState(false)
  const navigate = useNavigate()

  const onChange = (event) => {
    const { target: { value } } = event
    if (value === userObj.email) {
      setConfirmEmail(true)
    } else {
      setConfirmEmail(false)
    }
  }
  const delist = async () => {
    await deleteDoc(doc(dbservice, `members/${userObj.uid}`));
    deleteUser(user).then(() => {
      console.log(user)
      // User deleted.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
    navigate('/')
  }
  return (
    <Drawer>
      <DrawerTrigger>
        <div id='member'/>
      </DrawerTrigger>
      <DrawerContent className='bg-light-2 dark:bg-dark-2 max-h-[50%] h-full overflow-y-scroll'>
        <ScrollArea>
          <DrawerHeader>
            <div>진행 중인 빌리기, 빌려주기가 없어야 회원 탈퇴를 할 수 있습니다.</div>
            <div>정말로 회원 탈퇴를 하시려면 이메일을 입력해 주세요</div>
          </DrawerHeader>
          <div className='flex flex-col justify-center p-5 gap-5'>
            <TextField label='이메일' onChange={onChange}/>
            {confirmEmail ? 
              <Button variant='outlined' onClick={delist}>회원 탈퇴</Button>
              :
              <Button variant='outlined' disabled>회원 탈퇴</Button>
            }
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileMembersDrawers