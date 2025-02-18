import { useState, useEffect, useLayoutEffect, Suspense } from 'react'
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import { CardActionArea, CardActions } from '@mui/material';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit } from 'firebase/firestore';
import { Link } from 'react-router-dom'
import { webSocket, onClick } from 'src/webSocket.tsx'
import { User } from 'firebase/auth';
import ChattingStacks from 'src/components/chatting/ChattingStacks'
import Chats from 'src/components/chatting/Chats'
import { useQuery } from '@tanstack/react-query'
// import { useSelector, useDispatch } from 'react-redux'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import Badge from '@mui/material/Badge';
// import Chip from '@mui/material/Chip';
import { useSelector, useDispatch } from 'react-redux'
import { AnimatedList } from 'src/src/components/ui/animated-list';
import { CardActionArea, CardActions, ClickAwayListener } from '@mui/material';
import { createApi, fetchBaseQuery, fakeBaseQuery,  } from '@reduxjs/toolkit/query/react'

export const piazza = createApi({
  reducerPath: 'piazza',
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    getPiazza: build.query({
      async queryFn(arg) {
        try {
          const piazzaRef = collection(dbservice, 'chats_group')
          const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
          const piazzaMessages = await getDocs(piazzaCollection)
          // console.log(piazzaMessages)
          // piazzaMessages.forEach((element) => console.log(element.data()))
          // console.log(arg)
          return { data: piazzaMessages }
        } catch (error) {
          return { error: error }
        }
      }
      // query: (arg) => {
      //   return arg
      // }
      // const piazzaRef = collection(dbservice, 'chats_group')
      // const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
      // console.log(arg)
      // return piazzaCollection
      // try {
      //   const piazzaMessages = await getDocs(piazzaCollection)
      // } catch (error) {
      //   return { error: error }
      // }
      // async queryFn() {
      //   try {
      //     const piazzaRef = collection(dbservice, 'chats_group')
      //     const piazzaCollection = query(piazzaRef, orderBy('messageClockNumber', 'desc'), limit(1))
      //     const piazzaMessages = await getDocs(piazzaCollection)
      //     return { data: piazzaMessages }
      //   } catch (e) {
      //     return { error: e }
      //   }
      // },
    }),
  }),
})  

export const { useGetPiazzaQuery } = piazza