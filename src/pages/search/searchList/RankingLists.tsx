import { useState, useEffect, useLayoutEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc, limit, startAfter } from 'firebase/firestore';
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
  const [continuing, setContinuing] = useState(null)
  const [scroll, setScroll] = useState(false)
  // const [userSearch, setUserSearch] = useState('')

  useEffect(() => {
    const membersList = async() => {
      const collectionQuery = query(collection(dbservice, 'members'), orderBy('points', 'desc'), limit(20), startAfter(continuing? continuing : ''))
      const docs = await getDocs(collectionQuery)
      // const paused = docs.docs[docs.docs.length-1]
      // setContinuing(paused)
      const newArray = docs.docs.map((document, index) => {
        getDownloadURL(ref(storage, `${document.data()?.uid}`))
        .then((url) => {
          setLoadedImage([...loadedImage, {url: url, index: index}])
        })
        .catch((error) => {
          console.log(error)
        });
        if (index+1 === 10) {
          setContinuing(document)
        }
        return ({
          ...document.data(),
        })
      });
      setRank([...rank, ...newArray])
      newArray.map((document, index) => {
        if (document.uid === userObj.uid) {
          newArray[index].rank = index+1
          setRanker([newArray[index]])
        }
      })
    }
    membersList()
    // onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc'), limit(10), startAfter(continuing: continuing : '')), (snapshot) => {
    //   const newArray = snapshot.docs.map((document, index) => {
    //     getDownloadURL(ref(storage, `${document.data()?.uid}`))
    //     .then((url) => {
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
    //   newArray.map((document, index) => {
    //     if (document.uid === userObj.uid) {
    //       newArray[index].rank = index+1
    //       setRanker([newArray[index]])
    //     }
    //     if (index+1 === 5) {
    //       setContinuing(snapshot)
    //     }
    //   })
    // })
    // if (continuing) {
    // } else {
      
    // }
  }, [scroll])
  
  const scrolls = document.addEventListener('scrollend', () => {
    setScroll(!scroll)
    // setContinuing()
    console.log('samples')
    console.log(continuing)
  })
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
