import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import PageTitle from 'src/muiComponents/PageTitle'
import RankingLists from 'src/muiComponents/RankingLists'
import RankingSearch from 'src/muiComponents/RankingSearch'
import Lists from 'src/muiComponents/Lists'
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import { useSelector, useDispatch } from 'react-redux'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import { User } from 'firebase/auth';

interface Props {
  userObj: User
}
function Ranking({ userObj }: Props) {
  const [userSearch, setUserSearch] = useState('')
  // const [rank, setRank] = useState([])
  // const [ranker, setRanker] = useState([])
  // const [loadedImage, setLoadedImage] = useState([])
  // const [loadedImageIndex, setLoadedImageIndex] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })
  
  return (
    <>
      <PageTitle title='유저 랭킹' />
      {/* <div className='px-5 flex flex-col'>
        <TextField label='유저 이름' onChange={onChangeUserSearch}/>
      </div> */}
      <RankingSearch changeUserSearch={(newValue: string) => setUserSearch(newValue)}/>
      {/* {userSearch ?
        <Lists elements={rank} multiple={true} userSearch={userSearch} ranking={true} handleUser={null}/>
      :
        <div>
          <Lists elements={ranker} multiple={false} userSearch={null} ranking={true} handleUser={null}/>
          <Lists elements={rank} multiple={true} userSearch={null} ranking={true} handleUser={null}/>
        </div>
      } */}
      <RankingLists userObj={userObj} userSearch={userSearch}/>
    </>  
  )
}

export default Ranking
