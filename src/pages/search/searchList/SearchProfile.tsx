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
import { useSelectors, useTexts } from 'src/hooks'
import Lists from 'src/pages/search/searchList/searchListViews/Lists'
import RankingListsTitle from './searchListViews/searchListViewsTitle/RankingListsTitle'

function SearchProfile() {
  const [rank, setRank] = useState([])
  const [ranker, setRanker] = useState([])
  const [continuing, setContinuing] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  const profile = useSelectors((state) => state.profile.value)
  const userSearch = searchParams.get('search')
  const scrollNumber = 20
  const {loading} = useTexts()

  if (searchParams.get('search')) return null
  return (
    <div className="flex truncate justify-center">
      <div className="w-[1000px]">
        <Lists
          elements={[profile]}
          multiple={false}
          userSearch={null}
          ranking={true}
          handleUser={null}
        />
      </div>
    </div>
  )
}

export default SearchProfile
