import { SearchCheck } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelectors, useTexts } from 'src/hooks'
import PageTitle from 'src/pages/core/pageTitle/PageTitle'
import SearchBar from 'src/pages/search/searchBar/SearchBar'
import SearchList from 'src/pages/search/searchList/SearchList'
import { changeBottomNavigation } from 'src/stateSlices/bottomNavigationSlice'
import RankingListsTitle from './searchList/searchListViews/searchListViewsTitle/RankingListsTitle'

function Search() {
  const {userSearch} = useTexts()

  return (
    <>
      <PageTitle
        icon={<SearchCheck />}
        title={userSearch}
      />
      <SearchBar />
      <RankingListsTitle multiple={false} />
      <SearchList />
      <RankingListsTitle multiple={true} />
    </>
  )
}

export default Search
