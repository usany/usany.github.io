import {
  DrawerClose
} from "@/components/ui/drawer";
import TextField from '@mui/material/TextField';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";
import Lists from 'src/pages/search/searchList/searchListViews/Lists';
import useCardsBackground from '../../hooks/useCardsBackground';

interface Props {
  violationUser: {} | null
  changeViolationUser: (newValue) => void
}

function ContactFormDrawersContent({ violationUser, changeViolationUser }: Props) {
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
  )
}

export default ContactFormDrawersContent
