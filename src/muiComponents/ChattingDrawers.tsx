import { useState, useEffect, useRef, useLayoutEffect } from 'react'
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, QuerySnapshot, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { useSelector, useDispatch } from 'react-redux'
import { User } from 'firebase/auth';
// import { changeNewMessage, changeNewMessageTrue, changeNewMessageFalse } from 'src/stateSlices/newMessageSlice'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import Chip from '@mui/material/Chip';
import Chats from 'src/muiComponents/Chats'
import useLongPress from 'src/hooks/useLongPress';
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

interface Props {
  userObj: User
  chattings: {}
  handleChattings: ({}) => void
}

const ChattingDrawers = ({ conversation, displayName }: Props) => {
  console.log(conversation)
  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <div id={conversation} />
        </DrawerTrigger>
        <DrawerContent className='bg-light-3 dark:bg-dark-3'>
          <div>{conversation}</div>
          <div>{displayName}</div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default ChattingDrawers