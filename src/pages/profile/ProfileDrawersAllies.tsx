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

const ProfileDrawersAllies = ({ followers, alliesCollection }) => {
  const [elements, setElements] = useState([])

  const usersCollection = async () => {
    const elementsCollection = []
    const collectionRef = collection(dbservice, 'members')
    const docs = await getDocs(query(collectionRef, orderBy('points', 'desc')))
    docs.forEach((element) => {
      if (alliesCollection?.indexOf(element.data().uid) !== -1) {
        elementsCollection.push(element.data())
        setElements(elementsCollection)
      }
    })
  }
  useEffect(() => {
    if (alliesCollection) {
      usersCollection()
    }
  }, [alliesCollection])
  
  const alliesList = elements?.map((element, index) => {
    return (
      <div key={index}>
        <div className='flex justify-between w-screen px-5'>
        <Avatar alt={element.displayName} sx={{ bgcolor: element.profileColor || '#2196f3' }} src="./src" />
        <div className='overflow-hidden'>
          {element.displayName}
        </div>
        <IconButton aria-label="comment">
          <Link to='/profile'
            state = {{
              element: element,
            }}
            onClick={() => {
              setElements([])
            }}
          >
            <DrawerClose>
              <CommentIcon onClick={() => {
                setElements([])
              }}/>
            </DrawerClose>
          </Link>
        </IconButton>
        </div>
        <Divider variant='inset' />
      </div>
    )
  })

  return (
    <div className='p-5'>
      {alliesList.length === 0 ? 
        <div className='flex justify-center'>
          <div className='border border-dashed p-5'>
            {followers ? '팔로워가': '팔로잉이'} 없습니다
          </div>
        </div>
        :
        <div>{alliesList}</div>
      }
    </div>
  );
}

export default ProfileDrawersAllies