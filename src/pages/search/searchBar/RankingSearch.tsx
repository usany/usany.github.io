import TextField from '@mui/material/TextField';
import { useSelectors } from 'src/hooks/useSelectors';
// import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
// import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
// import Skeleton from '@mui/material/Skeleton';
// import PageTitle from 'src/components/PageTitle'
// import Lists from 'src/components/Lists'
// import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
// import { useSelector, useDispatch } from 'react-redux'
// import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
// import { User } from 'firebase/auth';

interface Props {
  changeUserSearch: (newValue: string) => void
}
function RankingSearch({ changeUserSearch }: Props) {
  const languages = useSelectors((state) => state.languages.value)
  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    changeUserSearch(value)
  }

  return (
    <div className='px-5 flex flex-col'>
      <TextField label={languages === 'ko' ? '유저 이름' : 'User name'} onChange={onChangeUserSearch} />
    </div>
  )
}

export default RankingSearch
