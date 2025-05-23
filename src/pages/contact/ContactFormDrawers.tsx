import Button from '@mui/material/Button';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from 'react';
import { dbservice, storage } from 'src/baseApi/serverbase';
import { useSelectors } from "src/hooks/useSelectors";
import Popups from "../core/Popups";
import ContactFormDrawersContent from "./ContactFormDrawersContent";
import ContactFormDrawersTitle from "./ContactFormDrawersTitle";
import ContactFormDrawersTrigger from "./ContactFormDrawersTrigger";

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
    <div className='flex flex-col w-full'>
      <Popups trigger={<ContactFormDrawersTrigger violationUser={violationUser} />} title={<ContactFormDrawersTitle />} content={<ContactFormDrawersContent changeViolationUser={changeViolationUser} />} />
      {violationUser && <Button sx={{ width: '25%' }} variant='outlined' onClick={() => changeViolationUser(null)}>{languages === 'ko' ? '신고 등록 취소' : 'Cancel reporting'}</Button>
      }
    </div>
  )
}

export default ContactFormDrawers
