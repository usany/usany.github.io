import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";
import Lists from 'src/pages/search/searchList/searchListViews/Lists';
import useCardsBackground from '../../hooks/useCardsBackground';
import DrawersBar from "../core/DrawersBar";

interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawers({ violationUser, changeViolationUser }: Props) {
  const [rank, setRank] = useState([])
  const [loadedImage, setLoadedImage] = useState([])
  const [userSearch, setUserSearch] = useState('')
  const languages = useSelectors((state) => state.languages.value)
  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    setUserSearch(value)
  }

  useEffect(() => {
    const searchingMembersList = async () => {
      // const list = []
      const collectionQuery = query(
        collection(dbservice, "members"),
        orderBy("points", "desc"),
        // limit(scrollNumber),
        // startAfter(continuing ? continuing : "")
      );
      const docs = await getDocs(collectionQuery);
      const newArray = docs.docs.map((document, index) => {
        // console.log(rank.indexOf(document));
        getDownloadURL(ref(storage, `${document.data()?.uid}`))
          .then((url) => {
            setLoadedImage([...loadedImage, { url: url, index: index }]);
          })
          .catch((error) => {
            console.log(error);
          });
        // if (index + 1 === docs.docs.length) {
        //   setContinuing(document);
        // }
        return {
          ...document.data(),
        };
        // if (rank.indexOf(document) === -1) {
        // }
      });
      setRank(newArray);
      // if (ranker.length === 0) {
      //   const docRef = doc(dbservice, `members/${userObj.uid}`)
      //   const myDocSnap = await getDoc(docRef)
      //   const myDocSnapData = myDocSnap.data()
      //   console.log(myDocSnapData)
      //   newArray.map((document, index) => {
      //     if (document.uid === userObj.uid) {
      //       console.log(document?.ranking)
      //       newArray[index].rank = index + 1;
      //     }
      //   });
      //   setRanker([myDocSnapData]);
      // }
      // setIsLoading(false);
    };
    searchingMembersList()
    // onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
    //   const newArray = snapshot.docs.map((document, index) => {
    //     getDownloadURL(ref(storage, `${document.data()?.uid}`))
    //     .then((url) => {
    //       // console.log(url)
    //       setLoadedImage([...loadedImage, {url: url, index: index}])
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
    //     return ({
    //       ...document.data(),
    //     })
    //   });
    //   setRank(newArray)
    // })
  }, [])
  const { color } = useCardsBackground()

  return (
    <>
      <Drawer>
        <DrawerTrigger className='w-screen' onClick={() => setUserSearch('')}>
          {violationUser ?
            <Card sx={{
              width: '100%',
              bgcolor: color
            }}>
              <div className='flex'>
                <div className='flex flex-col justify-center'>{languages === 'ko' ? '신고 유저:' : 'Reporting User'}</div>
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
            <Button sx={{ width: '100%' }} variant='outlined' form='auth'>{languages === 'ko' ? '신고 등록 유저' : 'Register reporting user'}</Button>
          }
        </DrawerTrigger>
        <DrawerContent className="flex flex-col justify-center px-5 bg-light-2 dark:bg-dark-2 max-h-[60%]">
          <ScrollArea className="overflow-y-scroll">
            <DrawersBar />
            <div className={`flex flex-col p-5 ${!userSearch && 'h-[60vh]'}`} >
              <TextField label={languages === 'ko' ? '유저 이름' : 'User name'} onChange={onChangeUserSearch} />
              {userSearch &&
                <div className='flex flex-col'>
                  <DrawerClose>
                    <Lists elements={rank} multiple={true} userSearch={userSearch} ranking={false} handleUser={(newValue) => changeViolationUser(newValue)} />
                  </DrawerClose>
                </div>
              }
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer >
      {violationUser && <Button sx={{ width: '25%' }} variant='outlined' onClick={() => changeViolationUser(null)}>{languages === 'ko' ? '신고 등록 취소' : 'Cancel reporting'}</Button>
      }
    </>
  )
}

export default ContactFormDrawers
