import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import PageTitle from 'src/muiComponents/PageTitle'
import RankingSearch from 'src/muiComponents/RankingSearch'
import Lists from 'src/muiComponents/Lists'
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import { User } from 'firebase/auth';

interface Props {
  multiple: boolean
}
function RankingListsTitle({ multiple }: Props) {
  
  return (
    <div className='flex justify-between w-screen pt-5'>
      <div className='flex flex-col justify-center px-5'>
        {multiple ? '유저':'내'} 랭킹
      </div>
      <div className='flex flex-col overflow-hidden'>
        <div>{multiple ? '유저':'내'} 이름</div>
        <div>포인트</div>
      </div>
      <div className='flex flex-col justify-center px-5'>
        프로필
      </div>
    </div>
  )
}

export default RankingListsTitle
