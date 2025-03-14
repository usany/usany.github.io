import { useState, useEffect, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
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
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import ProfileDrawersPoints from 'src/pages/profile/ProfileDrawersPoints'
import ProfileDrawersAllies from 'src/pages/profile/ProfileDrawersAllies'

const ProfileDrawers = ({ user, cards, followers, alliesCollection, selection }) => {


  return (
    <Drawer>
      <DrawerTrigger>
        {selection === 'points' &&
          <div className='p-5'>
            <div>포인트</div>
            <div className='flex justify-center'>{cards.point}</div>
          </div>
        }
        {selection === 'allies' &&
          <div className='p-5'>
            <div>
              {followers ? '팔로워' : '팔로잉'}
            </div>
            <div className='flex justify-center'>
              {alliesCollection.length}명
            </div>
          </div>
        }
      </DrawerTrigger>
      <DrawerContent className='max-h-[50%] bg-light-2 dark:bg-dark-2'>
        <ScrollArea className='overflow-y-scroll'>
          <div>
            <DrawerHeader>
              {selection === 'points' &&
                <DrawerTitle>{`${user.displayName}의 포인트 적립 영수증`}</DrawerTitle>
              }
              {selection === 'allies' &&
                <DrawerTitle>{user.displayName}의 {followers ? '팔로워' : '팔로잉'}</DrawerTitle>
              }
            </DrawerHeader>
            {selection === 'points' && <ProfileDrawersPoints user={user} cards={cards}/>}
            {selection === 'allies' && <ProfileDrawersAllies followers={followers} alliesCollection={alliesCollection}/>}
          </div>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}

export default ProfileDrawers
