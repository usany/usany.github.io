import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
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
import Lists from 'src/pages/search/searchList/searchListViews/Lists'
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Card from '@mui/material/Card';

interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawers({ violationUser, changeViolationUser }: Props) {
  const [rank, setRank] = useState([])
  const [loadedImage, setLoadedImage] = useState([])
  const [userSearch, setUserSearch] = useState('')

  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    setUserSearch(value)
  }

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
      const newArray = snapshot.docs.map((document, index) => {
        getDownloadURL(ref(storage, `${document.data()?.uid}`))
        .then((url) => {
          // console.log(url)
          setLoadedImage([...loadedImage, {url: url, index: index}])
        })
        .catch((error) => {
          console.log(error)
        });
        return ({
          ...document.data(),
        })
      });
      setRank(newArray)
    })
  }, [])

  return (  
    <>
      <Drawer>
        <DrawerTrigger className='w-screen' onClick={() => setUserSearch('')}>
          {violationUser ? 
            <Card sx={{width: '100%'}}>
              <div className='flex'>
                <div className='flex flex-col justify-center'>신고 유저:</div>
                <div className='px-5'>
                  <Avatar className={`bg-${(violationUser?.profileColor || []).indexOf('#') === -1 ? violationUser?.profileColor : 'profile-blue'}`}>
                    <AvatarImage src={violationUser?.profileImageUrl} />
                    <AvatarFallback className='text-xl border-none'>{violationUser?.displayName[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className='flex flex-col justify-center'>{violationUser.displayName}</div>
              </div>
            </Card>
          :
            <Button sx={{width: '100%'}} variant='outlined' form='auth'>신고 유저 등록</Button>
          }
        </DrawerTrigger>
        <DrawerContent className='h-1/2 bg-light-3 dark:bg-dark-3'>             
          <div className='px-5 flex flex-col'>
            <TextField label='유저 이름' onChange={onChangeUserSearch}/>
            {userSearch && 
              <DrawerClose>
                <Lists elements={rank} multiple={true} userSearch={userSearch} ranking={false} handleUser={(newValue) => changeViolationUser(newValue)}/>
              </DrawerClose>
            }
          </div>
        </DrawerContent>
      </Drawer>
      {violationUser && <Button sx={{width: '25%'}} variant='outlined' onClick={() => changeViolationUser(null)}>신고 등록 취소</Button>}
    </>
  )
}

export default ContactFormDrawers
