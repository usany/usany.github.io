import { SearchCheck } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectors } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import RankingSearch from 'src/pages/search/searchBar/RankingSearch'
import RankingLists from 'src/pages/search/searchList/RankingLists'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'

function Ranking() {
  const languages = useSelectors((state) => state.languages.value)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeBottomNavigation(5))
  })

  return (
    <>
      <PageTitle
        icon={<SearchCheck />}
        title={languages === 'ko' ? '유저 랭킹' : 'User Ranking'}
      />
      <RankingSearch />
      <RankingLists />
    </>
  )
}

export default Ranking
