import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { dbservice } from 'src/baseApi/serverbase'
import { useSelectors } from 'src/hooks/useSelectors'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'

function RankingLists() {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])
  const [continuing, setContinuing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const profile = useSelectors((state) => state.profile.value)
  const userSearch = searchParams.get('search')
  const scrollNumber = 20
  useEffect(() => {
    const membersList = async () => {
      const collectionQuery = query(
        collection(dbservice, 'members'),
        orderBy('points', 'desc'),
        limit(scrollNumber),
        startAfter(continuing ? continuing : ''),
      )
      const docs = await getDocs(collectionQuery)
      const newArray = docs.docs.map((document, index) => {
        if (rank.indexOf(document) === -1) {
          if (index + 1 === docs.docs.length) {
            setContinuing(document)
          }
          return {
            ...document.data(),
          }
        }
      })
      setRank([...rank, ...newArray])
      if (ranker.length === 0) {
        const docRef = doc(dbservice, `members/${profile?.uid}`)
        const myDocSnap = await getDoc(docRef)
        const myDocSnapData = myDocSnap.data()
        newArray.map((document, index) => {
          if (document.uid === profile?.uid) {
            newArray[index].rank = index + 1
          }
        })
        setRanker([myDocSnapData])
      }
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
    <div className="flex truncate justify-center">
      {userSearch ? (
        <div className="w-[1000px]">
          <Lists
            elements={rank}
            multiple={true}
            userSearch={userSearch}
            ranking={true}
            handleUser={null}
          />
        </div>
      ) : (
        <div className="w-[1000px]">
          <Lists
            elements={ranker}
            multiple={false}
            userSearch={null}
            ranking={true}
            handleUser={null}
          />
          <Lists
            elements={rank}
            multiple={true}
            userSearch={null}
            ranking={true}
            handleUser={null}
          />
          {isLoading && (
            <div className="flex justify-center text-2xl bg-light-2 dark:bg-dark-2 rounded">
              로딩
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default RankingLists
