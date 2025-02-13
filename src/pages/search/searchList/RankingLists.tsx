import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Skeleton from '@mui/material/Skeleton';
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import RankingListsTitle from 'src/pages/search/searchList/searchListViews/searchListViewsTitle/RankingListsTitle'
import RankingSearch from 'src/pages/search/searchBar/RankingSearch'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'
import { getStorage, ref, uploadBytes, uploadString, uploadBytesResumable, getDownloadURL,  } from "firebase/storage";
import { User } from 'firebase/auth';

interface Props {
  userObj: User
  userSearch: string
}
function RankingLists({ userObj, userSearch }: Props) {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])
  const [loadedImage, setLoadedImage] = useState([])
  // const [userSearch, setUserSearch] = useState('')

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
      newArray.map((document, index) => {
        if (document.uid === userObj.uid) {
          newArray[index].rank = index+1
          setRanker([newArray[index]])
          // setLoadedImageIndex(index)
        }
      })
    })
  }, [])
  
  return (
    <>
      {userSearch ?
        <div>
          <Lists elements={rank} multiple={true} userSearch={userSearch} ranking={true} handleUser={null}/>
        </div>
      :
        <div>
          <Lists elements={ranker} multiple={false} userSearch={null} ranking={true} handleUser={null}/>
          <Lists elements={rank} multiple={true} userSearch={null} ranking={true} handleUser={null}/>
        </div>
      }
    </>
  )
}

export default RankingLists
