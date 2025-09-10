import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  updateDoc,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors, useTexts } from 'src/hooks'
import ListsView from './searchListViews/ListsView'
import { useDispatch } from 'react-redux'
import { changeProfile } from 'src/stateSlices/profileSlice'

function SearchList({multiple}) {
  const [rank, setRank] = useState([])
  const [continuing, setContinuing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const scrollNumber = 20
  const { loading } = useTexts()
  const userSearch = searchParams.get('search')
  const profile = useSelectors((state) => state.profile.value)
  if (searchParams.get('search') && !multiple) return null
  if (!multiple) return (
    <ListsView
      elements={[profile]}
      userSearch={null}
      multiple={false}
      handleUser={null}
    />
  )

  const dispatch = useDispatch()
  const [newRanking, setNewRanking] = useState(0)
  useEffect(() => {
    const membersList = async () => {
      const collectionQuery = query(
        collection(dbservice, 'members'),
        orderBy('points', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const docs = await getDocs(collectionQuery)

      let point
      let samePointIndex
      const newArray = docs.docs.map((document, index) => {
        if (document.data().points !== point) {
          point = document.data().points
          samePointIndex = index
        }
        console.log(point)
        console.log(samePointIndex)
        if (document.uid === profile?.uid) {
          const user = doc(dbservice, `members/${profile?.uid}`)
          const newRank = samePointIndex ? samePointIndex + 1 : index + 1
          if (profile?.ranking !== newRank && multiple) {
            updateDoc(user, { ranking: newRank })
            // setNewRanking(newRank)
            dispatch(changeProfile({...profile, ranking: newRank}))
          }
        }
        if (userSearch) {
          for (let number = 0; number < userSearch.length; number++) {
            if (document.data().displayName[number] !== userSearch[number]) {
              // userNameConfirm = false
              return null
            }
          }
        }

        if (rank.indexOf(document) === -1) {
          if (index + 1 === docs.docs.length) {
            setContinuing(document)
          }
          return {
            ...document.data(), ranking: samePointIndex+1
          }
        }
        return null
      })
      setRank([...rank, ...newArray])
      // if (ranker.length === 0) {
      //   const docRef = doc(dbservice, `members/${profile?.uid}`)
      //   const myDocSnap = await getDoc(docRef)
      //   const myDocSnapData = myDocSnap.data()
      //   newArray.map((document, index) => {
      //     if (document.uid === profile?.uid) {
      //       newArray[index].rank = index + 1
      //     }
      //   })
      //   setRanker([myDocSnapData])
      // }
      setIsLoading(false)
    }
    const searchingMembersList = async () => {
      const collectionQuery = query(
        collection(dbservice, 'members'),
        orderBy('points', 'desc'),
        // limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = docs.docs.map((document, index) => {
        console.log(rank.indexOf(document))
        if (rank.indexOf(document) === -1) {
          if (index + 1 === docs.docs.length) {
            setContinuing(document)
          }
          return {
            ...document.data(),
          }
        }
        return null
      })
      setRank([...rank, ...newArray])
      setIsLoading(false)
    }
    if (isLoading || rank.length === 0) {
      membersList()
    }
    if (userSearch) {
      searchingMembersList()
      console.log(userSearch)
    }
  }, [isLoading, userSearch])
  const handleScroll = () => {
    if (
      document.documentElement.offsetHeight -
        (window.innerHeight + Math.round(document.documentElement.scrollTop)) >
        250 ||
      isLoading
    ) {
      console.log(document.documentElement.offsetHeight)
      return
    } else {
      console.log('scroll')
      setIsLoading(true)
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])
  return (
    <>
      <ListsView
        elements={rank}
        multiple={true}
        userSearch={userSearch}
        handleUser={null}
      />
      {userSearch && isLoading && (
        <div className="flex justify-center text-2xl bg-light-2 dark:bg-dark-2 rounded">
          {loading}
        </div>
      )}
    </>
  )
}

export default SearchList
