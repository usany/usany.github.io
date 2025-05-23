import TextField from '@mui/material/TextField';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";
import Lists from 'src/pages/search/searchList/searchListViews/Lists';

interface Props {
  violationUser: {
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null
  changeViolationUser: (newValue: {
    profileImage: boolean
    profileImageUrl: string
    defaultProfile: string
    displayName: string
  } | null) => void
}

function ContactFormDrawersContent({ changeViolationUser }: Props) {
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
      const collectionQuery = query(
        collection(dbservice, "members"),
        orderBy("points", "desc"),
      );
      const docs = await getDocs(collectionQuery);
      const newArray = docs.docs.map((document, index) => {
        getDownloadURL(ref(storage, `${document.data()?.uid}`))
          .then((url) => {
            setLoadedImage([...loadedImage, { url: url, index: index }]);
          })
          .catch((error) => {
            console.log(error);
          });
        return {
          ...document.data(),
        };
      });
      setRank(newArray);
    };
    searchingMembersList()
  }, [])

  return (
    <div className={`flex flex-col p-5 ${!userSearch && 'h-[60vh]'}`} >
      <TextField label={languages === 'ko' ? '유저 이름' : 'User name'} onChange={onChangeUserSearch} />
      {userSearch &&
        <div className='flex justify-center'>
          <Lists userObj={null} elements={rank} multiple={true} userSearch={userSearch} ranking={false} handleUser={(newValue) => changeViolationUser(newValue)} />
        </div>
      }
    </div>
  )
}

export default ContactFormDrawersContent
