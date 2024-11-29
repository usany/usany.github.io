import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import { useBottomNavigationStore, useAvatarImageStore } from 'src/store'
// import { getStorage, ref, getDownloadURL } from "firebase/storage";
import Skeleton from '@mui/material/Skeleton';
import PageTitle from 'src/muiComponents/PageTitle'
import Lists from 'src/muiComponents/Lists'
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";

function Ranking({ userObj }) {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])
  const [userSearch, setUserSearch] = useState('')
  const [loadedImage, setLoadedImage] = useState([])
  const [loadedImageIndex, setLoadedImageIndex] = useState(null)
  const onChangeUserSearch = (event) => {
    const { target: { value } } = event
    setUserSearch(value)
  }
  const handleBottomNavigation = useBottomNavigationStore((state) => state.handleBottomNavigation)
  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document,index) => {

          getDownloadURL(ref(storage, `${document.data()?.uid}`))
          .then((url) => {
            console.log(url)
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
        newArray.map((document, index) => {
          if (document.uid === userObj.uid) {
            newArray[index].rank = index+1
            setRanker([newArray[index]])
            setLoadedImageIndex(index)
          }
        })
    })
  }, [])

  useEffect(() => {
    handleBottomNavigation(5)
  })

  return (
    <div className='flex flex-col'>
      <PageTitle title='유저 랭킹' />
      <div className='px-5 flex flex-col'>
        <TextField label='유저 이름' onChange={onChangeUserSearch}/>
      </div>
      {userSearch ?
        <Lists elements={rank} multiple={true} userSearch={userSearch} loadedImage={loadedImage} loadedImageIndex={loadedImageIndex}/>
      :
        <div>
          <Lists elements={ranker} multiple={false} userSearch={null} loadedImage={loadedImage} loadedImageIndex={loadedImageIndex}/>
          <Lists elements={rank} multiple={true} userSearch={null} loadedImage={loadedImage} loadedImageIndex={loadedImageIndex}/>
        </div>
      }
    </div>  
  )
}

export default Ranking
